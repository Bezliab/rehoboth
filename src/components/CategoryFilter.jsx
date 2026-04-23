// src/components/CategoryFilter.jsx
import React from 'react';
import styles from './CategoryFilter.module.css';

/**
 * @param {Object[]} categories  - array of { key, name, count }
 * @param {string}   active      - active category key or 'All'
 * @param {Function} onChange    - (key: string) => void
 * @param {number}   totalCount  - count shown on "All" button
 */
export default function CategoryFilter({ categories, active, onChange, totalCount }) {
  return (
    <div className={styles.wrap} role="group" aria-label="Filter by category">
      <button
        className={`${styles.pill} ${active === 'All' ? styles.active : ''}`}
        onClick={() => onChange('All')}
      >
        All
        <span className={styles.count}>{totalCount}</span>
      </button>

      {categories.map((cat) => (
        <button
          key={cat.key}
          className={`${styles.pill} ${active === cat.key ? styles.active : ''}`}
          onClick={() => onChange(cat.key)}
        >
          {cat.name}
          <span className={styles.count}>{cat.count}</span>
        </button>
      ))}
    </div>
  );
}
