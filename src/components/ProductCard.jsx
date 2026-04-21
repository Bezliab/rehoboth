// File: src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const { addItem, openCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addItem(product);
    setTimeout(() => {
      setAdding(false);
      openCart();
    }, 600);
  };

  const formatPrice = (p) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(p);

  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      {/* Image Container */}
      <div className={`${styles.imageWrap} fabric-shimmer`}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
        {/* Tag */}
        {product.tag && (
          <span className={styles.tag}>{product.tag}</span>
        )}
        {/* Stock overlay */}
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
        <div className={styles.category}>{product.category}</div>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <span className={styles.unit}>/ {product.priceUnit}</span>
        </div>
      </div>
    </Link>
  );
}
