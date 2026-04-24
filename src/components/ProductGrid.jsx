// src/components/ProductGrid.jsx
import React, { useState, useMemo } from "react";
import styles from "./ProductGrid.module.css";

/**
 * Reusable ProductGrid component with pagination support
 * @param {Array} products - array of products to display
 * @param {Function} renderItem - (product, index) => ReactNode
 * @param {number} pageSize - items per page (default: 20)
 * @param {string} emptyMessage - shown when no products
 * @param {string} className - optional extra class
 * @param {boolean} loadMore - enable load-more button (default: true)
 */
export default function ProductGrid({
  products = [],
  renderItem,
  pageSize = 20,
  emptyMessage = "No products found.",
  className = "",
  loadMore = true,
}) {
  const [page, setPage] = useState(1);

  const { displayed, totalPages, remaining } = useMemo(() => {
    const total = products.length;
    const pages = Math.ceil(total / pageSize);
    const end = page * pageSize;
    const items = products.slice(0, end);
    return {
      displayed: items,
      totalPages: pages,
      remaining: total - items.length,
    };
  }, [products, page, pageSize]);

  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 48, opacity: 0.2 }}
        >
          search_off
        </span>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  const hasNextPage = page < totalPages;

  return (
    <div className={className}>
      <div className={`${styles.grid}`}>
        {displayed.map((product, idx) =>
          renderItem ? renderItem(product, idx) : product,
        )}
      </div>

      {/* Load More Button */}
      {loadMore && hasNextPage && (
        <div className={styles.loadMoreWrap}>
          <p className={styles.loadMoreInfo}>
            Showing {displayed.length.toLocaleString()} of{" "}
            {products.length.toLocaleString()} products
          </p>
          <button
            className={styles.loadMoreBtn}
            onClick={() => setPage((p) => p + 1)}
          >
            <span className="material-symbols-outlined">expand_more</span>
            Load More ({remaining.toLocaleString()} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
