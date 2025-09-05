import React from 'react';
import styles from './BookModal.module.css';

export default function BookModal({ book, onClose }) {
  if (!book) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">&times;</button>
        <h2 id="modal-title" className={styles.title}>{book.title}</h2>
        <img src={book.thumbnailUrl} alt={book.title} className={styles.image} />
        <div className={styles.details}>
          <p><strong>Price:</strong> £{book.price.toFixed(2)}</p>
          <p><strong>Rating:</strong> {book.rating} / 5</p>
          <p><strong>Stock:</strong> {book.stock}</p>
          <a href={book.detailUrl} target="_blank" rel="noreferrer" className={styles.link}>View on source site</a>
        </div>
      </div>
    </div>
  );
}
