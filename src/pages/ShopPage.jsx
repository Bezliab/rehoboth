// File: src/pages/ShopPage.jsx
import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import styles from './ShopPage.module.css';

const CATEGORIES = ['All', 'Lace', 'Ankara', 'Silk', 'George'];
const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc',   label: 'Name: A–Z' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy]                 = useState('featured');
  const [inStockOnly, setInStockOnly]       = useState(false);
  const [search, setSearch]                 = useState('');

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory);
    if (inStockOnly)              list = list.filter(p => p.inStock);
    if (search.trim())            list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );

    switch (sortBy) {
      case 'price-asc':  return list.sort((a, b) => a.price - b.price);
      case 'price-desc': return list.sort((a, b) => b.price - a.price);
      case 'name-asc':   return list.sort((a, b) => a.name.localeCompare(b.name));
      default:           return list;
    }
  }, [activeCategory, sortBy, inStockOnly, search]);

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <span className={styles.eyebrow}>Rehoboth Fabrics</span>
          <h1 className={styles.pageTitle}>Our Fabric Collection</h1>
          <p className={styles.pageSubtitle}>
            Explore our premium selection of hand-curated fabrics for every occasion.
          </p>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Search</h3>
            <div className={styles.searchWrap}>
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Search fabrics…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Category</h3>
            <div className={styles.filterList}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`${styles.filterItem} ${activeCategory === cat ? styles.filterItemActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className={styles.filterCount}>
                    {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Availability</h3>
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className={styles.checkbox}
              />
              <span>In Stock Only</span>
            </label>
          </div>

          <button
            className={styles.clearBtn}
            onClick={() => { setActiveCategory('All'); setSortBy('featured'); setInStockOnly(false); setSearch(''); }}
          >
            Clear All Filters
          </button>
        </aside>

        {/* Main content */}
        <div className={styles.main}>
          {/* Toolbar */}
          <div className={styles.toolbar}>
            <p className={styles.resultCount}>
              <strong>{filtered.length}</strong> fabric{filtered.length !== 1 ? 's' : ''} found
            </p>
            <div className={styles.sortWrap}>
              <span className={styles.sortLabel}>Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category pill bar (mobile) */}
          <div className={styles.categoryPills}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.pill} ${activeCategory === cat ? styles.pillActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className={styles.empty}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, opacity: 0.25 }}>search_off</span>
              <p>No fabrics match your filters.</p>
              <button
                className={styles.resetBtn}
                onClick={() => { setActiveCategory('All'); setInStockOnly(false); setSearch(''); }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
