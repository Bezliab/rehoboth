// File: src/pages/ShopPage.jsx
import React, { useState, useMemo } from 'react';
import { allProducts, dynamicCategories } from '../data/fabricUtils';
import { useCart } from '../context/CartContext';
import styles from './ShopPage.module.css';

const PAGE_SIZE = 20;

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc',   label: 'Category: A–Z' },
];

const fmt = (n) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency', currency: 'NGN', maximumFractionDigits: 0,
  }).format(n);

/* ── Inline ShopProductCard ──────────────────────────────── */
function ShopProductCard({ product }) {
  const [qty, setQty]         = useState(1);
  const [imgError, setImgError] = useState(false);
  const total = product.price * qty;

  return (
    <div className={styles.card}>
      {/* Image */}
      <div className={styles.cardImgWrap}>
        <img
          src={imgError
            ? 'https://placehold.co/400x320/1a1a1a/ccc?text=Image+Unavailable'
            : product.image}
          alt={product.alt}
          className={styles.cardImg}
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <span className={styles.cardCategory}>{product.categoryDisplay}</span>
      </div>

      {/* Body */}
      <div className={styles.cardBody}>
        <p className={styles.cardAlt}>{product.alt}</p>

        <div className={styles.cardPriceRow}>
          <span className={styles.cardPrice}>{fmt(product.price)}</span>
          <span className={styles.cardUnit}>/ {product.priceUnit}</span>
        </div>

        {/* Quantity selector */}
        <div className={styles.qtyRow}>
          <button
            className={styles.qtyBtn}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className={styles.qtyVal}>{qty}</span>
          <button
            className={styles.qtyBtn}
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Total */}
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total:</span>
          <strong className={styles.totalPrice}>{fmt(total)}</strong>
        </div>

        <button className={styles.addBtn}>
          <span className="material-symbols-outlined">add_shopping_cart</span>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ── ShopPage ────────────────────────────────────────────── */
export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy]                 = useState('featured');
  const [search, setSearch]                 = useState('');
  const [page, setPage]                     = useState(1);

  const filtered = useMemo(() => {
    let list = [...allProducts];

    if (activeCategory !== 'All')
      list = list.filter((p) => p.category === activeCategory);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.categoryDisplay.toLowerCase().includes(q) ||
          p.alt.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':  return list.sort((a, b) => a.price - b.price);
      case 'price-desc': return list.sort((a, b) => b.price - a.price);
      case 'name-asc':   return list.sort((a, b) => a.categoryDisplay.localeCompare(b.categoryDisplay));
      default:           return list;
    }
  }, [activeCategory, sortBy, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const displayed  = filtered.slice(0, page * PAGE_SIZE);
  const remaining  = filtered.length - displayed.length;

  const handleCategory = (key) => {
    setActiveCategory(key);
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const clearAll = () => {
    setActiveCategory('All');
    setSortBy('featured');
    setSearch('');
    setPage(1);
  };

  return (
    <div className={styles.page}>
      {/* ── Page Header ── */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <span className={styles.eyebrow}>Rehoboth Fabrics</span>
          <h1 className={styles.pageTitle}>Our Fabric Collection</h1>
          <p className={styles.pageSubtitle}>
            Explore our premium selection of {allProducts.length.toLocaleString()} fabrics
            across {dynamicCategories.length} categories.
          </p>
        </div>
      </div>

      <div className={styles.layout}>
        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          {/* Search */}
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Search</h3>
            <div className={styles.searchWrap}>
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Search fabrics…"
                value={search}
                onChange={handleSearch}
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* Category */}
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Category</h3>
            <div className={styles.filterList}>
              <button
                className={`${styles.filterItem} ${activeCategory === 'All' ? styles.filterItemActive : ''}`}
                onClick={() => handleCategory('All')}
              >
                <span>All Fabrics</span>
                <span className={styles.filterCount}>{allProducts.length}</span>
              </button>
              {dynamicCategories.map((cat) => (
                <button
                  key={cat.key}
                  className={`${styles.filterItem} ${activeCategory === cat.key ? styles.filterItemActive : ''}`}
                  onClick={() => handleCategory(cat.key)}
                >
                  <span>{cat.name}</span>
                  <span className={styles.filterCount}>{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          <button className={styles.clearBtn} onClick={clearAll}>
            Clear All Filters
          </button>
        </aside>

        {/* ── Main ── */}
        <div className={styles.main}>
          {/* Toolbar */}
          <div className={styles.toolbar}>
            <p className={styles.resultCount}>
              <strong>{filtered.length.toLocaleString()}</strong>{' '}
              fabric{filtered.length !== 1 ? 's' : ''} found
            </p>
            <div className={styles.sortWrap}>
              <span className={styles.sortLabel}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile category pills */}
          <div className={styles.categoryPills}>
            <button
              className={`${styles.pill} ${activeCategory === 'All' ? styles.pillActive : ''}`}
              onClick={() => handleCategory('All')}
            >
              All
            </button>
            {dynamicCategories.map((cat) => (
              <button
                key={cat.key}
                className={`${styles.pill} ${activeCategory === cat.key ? styles.pillActive : ''}`}
                onClick={() => handleCategory(cat.key)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid or Empty */}
          {filtered.length > 0 ? (
            <>
              <div className={styles.grid}>
                {displayed.map((p) => (
                  <ShopProductCard key={p.id} product={p} />
                ))}
              </div>

              {/* Load More */}
              {page < totalPages && (
                <div className={styles.loadMoreWrap}>
                  <p className={styles.loadMoreInfo}>
                    Showing {displayed.length.toLocaleString()} of{' '}
                    {filtered.length.toLocaleString()} fabrics
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
            </>
          ) : (
            <div className={styles.empty}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, opacity: 0.25 }}>
                search_off
              </span>
              <p>No fabrics match your filters.</p>
              <button className={styles.resetBtn} onClick={clearAll}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
