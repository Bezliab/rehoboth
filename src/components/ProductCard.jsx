// File: src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.css';

const fmt = (p) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency', currency: 'NGN', maximumFractionDigits: 0,
  }).format(p);

export default function ProductCard({ product }) {
  const { addItem, openCart } = useCart();
  const [adding, setAdding]   = useState(false);
  const [imgError, setImgError] = useState(false);

  // Graceful field fallbacks for both curated & auto-generated products
  const displayName = product.name || product.categoryDisplay || product.category || 'Fabric';
  const displayCat  = product.categoryDisplay || product.category || '';
  const imgSrc      = imgError
    ? 'https://placehold.co/400x320/1a1a1a/ccc?text=Image+Unavailable'
    : product.image;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addItem({ ...product, name: displayName });
    setTimeout(() => {
      setAdding(false);
      openCart();
    }, 600);
  };

  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      {/* Image */}
      <div className={`${styles.imageWrap} fabric-shimmer`}>
        <img
          src={imgSrc}
          alt={product.alt || displayName}
          className={styles.image}
          loading="lazy"
          onError={() => setImgError(true)}
        />
        {product.tag && (
          <span className={styles.tag}>{product.tag}</span>
        )}
        {!product.inStock && (
          <div className={styles.outOfStock}>
            <span>Out of Stock</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className={styles.overlay}>
          <button
            className={`${styles.addBtn} ${adding ? styles.addBtnAdding : ''}`}
            onClick={handleAdd}
            disabled={!product.inStock || adding}
          >
            {adding ? (
              <>
                <span className="material-symbols-outlined">check</span>
                Added!
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">add_shopping_cart</span>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.category}>{displayCat}</div>
        <h3 className={styles.name}>{displayName}</h3>
        <div className={styles.priceRow}>
          <span className={styles.price}>{fmt(product.price)}</span>
          <span className={styles.unit}>/ {product.priceUnit}</span>
        </div>
      </div>
    </Link>
  );
}
