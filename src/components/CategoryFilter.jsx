// src/components/CategoryFilter.jsx
import React from "react";
import { dynamicCategories } from "../data/fabricUtils";
import styles from "./CategoryFilter.module.css";

/**
 * Reusable CategoryFilter component
 * @param {string} activeCategory - Currently selected category key ('All' or category key)
 * @param {function} onCategoryChange - Callback when category changes (receives category key)
 * @param {string} variant - 'sidebar' | 'pills' | 'dropdown' (default: 'pills')
 * @param {boolean} showCounts - Show item counts (default: true)
 * @param {number} allCount - Count to show on "All" button (default: sum of all categories)
 */
export default function CategoryFilter({
  activeCategory = "All",
  onCategoryChange = () => {},
  variant = "pills",
  showCounts = true,
  allCount = 0,
}) {
  const totalCount =
    allCount || dynamicCategories.reduce((sum, cat) => sum + cat.count, 0);

  if (variant === "dropdown") {
    return (
      <select
        value={activeCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className={styles.dropdown}
      >
        <option value="All">All Categories ({totalCount})</option>
        {dynamicCategories.map((cat) => (
          <option key={cat.key} value={cat.key}>
            {cat.name} {showCounts ? `(${cat.count})` : ""}
          </option>
        ))}
      </select>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className={styles.sidebarContainer}>
        <h3 className={styles.title}>Category</h3>
        <div className={styles.list}>
          <button
            className={`${styles.item} ${activeCategory === "All" ? styles.itemActive : ""}`}
            onClick={() => onCategoryChange("All")}
          >
            <span>All Fabrics</span>
            {showCounts && <span className={styles.count}>{totalCount}</span>}
          </button>
          {dynamicCategories.map((cat) => (
            <button
              key={cat.key}
              className={`${styles.item} ${activeCategory === cat.key ? styles.itemActive : ""}`}
              onClick={() => onCategoryChange(cat.key)}
            >
              <span>{cat.name}</span>
              {showCounts && <span className={styles.count}>{cat.count}</span>}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Default: pills variant
  return (
    <div className={styles.wrap} role="group" aria-label="Filter by category">
      <button
        className={`${styles.pill} ${activeCategory === "All" ? styles.active : ""}`}
        onClick={() => onCategoryChange("All")}
      >
        All
        {showCounts && <span className={styles.count}>{totalCount}</span>}
      </button>

      {dynamicCategories.map((cat) => (
        <button
          key={cat.key}
          className={`${styles.pill} ${activeCategory === cat.key ? styles.active : ""}`}
          onClick={() => onCategoryChange(cat.key)}
        >
          {cat.name}
          {showCounts && <span className={styles.count}>{cat.count}</span>}
        </button>
      ))}
    </div>
  );
}
