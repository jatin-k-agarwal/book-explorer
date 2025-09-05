const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

const BASE_URL = 'https://books.toscrape.com/';

const bookSchema = new mongoose.Schema({
  title: String,
  price: Number,
  stock: String,
  rating: Number,
  detailUrl: String,
  thumbnailUrl: String,
});

const Book = mongoose.model('Book', bookSchema);

function ratingFromClass(className) {
  const ratings = { One: 1, Two: 2, Three: 3, Four: 4, Five: 5 };
  for (const key in ratings) {
    if (className.includes(key)) return ratings[key];
  }
  return 0;
}

async function scrapePage(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const books = [];

  $('.product_pod').each((i, el) => {
    const title = $(el).find('h3 a').attr('title');
    const priceText = $(el).find('.price_color').text();
    const price = parseFloat(priceText.replace('£', ''));
    const stock = $(el).find('.availability').text().trim();
    const ratingClass = $(el).find('.star-rating').attr('class');
    const rating = ratingFromClass(ratingClass);
    const detailUrl = new URL($(el).find('h3 a').attr('href'), url).href;
    const thumbnailUrl = new URL($(el).find('.image_container img').attr('src'), url).href;

    books.push({ title, price, stock, rating, detailUrl, thumbnailUrl });
  });

  return books;
}

async function scrapeAll() {
  await mongoose.connect('mongodb://localhost:27017/bookexplorer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let page = 1;
  let allBooks = [];

  while (true) {
    const url = `${BASE_URL}catalogue/page-${page}.html`;
    try {
      const books = await scrapePage(url);
      if (books.length === 0) break;
      allBooks = allBooks.concat(books);
      console.log(`Scraped page ${page}, found ${books.length} books.`);
      page++;
    } catch (err) {
      console.log('No more pages or error:', err.message);
      break;
    }
  }

  for (const book of allBooks) {
    await Book.findOneAndUpdate(
      { detailUrl: book.detailUrl },
      book,
      { upsert: true, new: true }
    );
  }

  console.log(`Total books saved: ${allBooks.length}`);
  mongoose.disconnect();
}

scrapeAll();
