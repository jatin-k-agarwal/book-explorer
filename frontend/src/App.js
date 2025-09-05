import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./components/BookCard";
import BookModal from "./components/BookModal";
import styles from "./App.module.css";

function App() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    rating: "",
    inStock: "",
    priceMin: "",
    priceMax: "",
  });
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      const params = { page, limit: 20 };
      if (search) params.search = search;
      if (filters.rating) params.rating = filters.rating;
      if (filters.inStock) params.inStock = filters.inStock;
      if (filters.priceMin) params.priceMin = filters.priceMin;
      if (filters.priceMax) params.priceMax = filters.priceMax;

      try {
        const API_URL = process.env.REACT_APP_API_URL;
        const { data } = await axios.get(API_URL, { params });
        setBooks(data.books);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    }
    fetchBooks();
  }, [page, search, filters]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Book Explorer</h1>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />

        <select
          value={filters.rating}
          onChange={(e) =>
            setFilters((f) => ({ ...f, rating: e.target.value }))
          }
          className={styles.select}
        >
          <option value="">All Ratings</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          value={filters.inStock}
          onChange={(e) =>
            setFilters((f) => ({ ...f, inStock: e.target.value }))
          }
          className={styles.select}
        >
          <option value="">All Stock</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={filters.priceMin}
          onChange={(e) =>
            setFilters((f) => ({ ...f, priceMin: e.target.value }))
          }
          className={styles.input}
          min="0"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={filters.priceMax}
          onChange={(e) =>
            setFilters((f) => ({ ...f, priceMax: e.target.value }))
          }
          className={styles.input}
          min="0"
        />
      </div>

      <div className={styles.bookGrid}>
        {books.map((book) => (
          <BookCard key={book._id} book={book} onClick={setSelectedBook} />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.button}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button className={styles.button} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>

      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}

export default App;
