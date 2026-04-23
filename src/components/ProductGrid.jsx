// src/components/ProductGrid.jsx
import React from 'react';
import styles from './ProductGrid.module.css';

/**
 * Generic responsive grid wrapper.
 * @param {React.ReactNode} children
 * @param {string}          emptyMessage - shown when no children
 * @param {string}          className    - optional extra class
 */
export default function ProductGrid({ children, emptyMessage = 'No products found.', className = '' }) {
  const items = React.Children.toArray(children);

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <span className="material-symbols-outlined" style={{ fontSize: 48, opacity: 0.2 }}>
          search_off
        </span>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`${styles.grid} ${className}`}>
      {children}
    </div>
  );
}
