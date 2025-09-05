import React from 'react';
import styles from './BookCard.module.css';

export default function BookCard({ book, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick(book)} role="button" tabIndex={0} onKeyPress={() => onClick(book)}>
      <img src={book.thumbnailUrl} alt={book.title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title} title={book.title}>{book.title}</h3>
        <p className={styles.price}>£{book.price.toFixed(2)}</p>
        <p className={styles.rating}>Rating: {book.rating} / 5</p>
        <p className={styles.stock}>{book.stock}</p>
      </div>
    </div>
  );
}
