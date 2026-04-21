// File: src/pages/ProductPage.jsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import styles from './ProductPage.module.css';

const formatPrice = (p) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(p);

export default function ProductPage() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const { addItem, openCart } = useCart();

  const product = products.find(p => p.id === Number(id));
  const [qty, setQty]         = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [adding, setAdding]   = useState(false);
  const [tab, setTab]         = useState('description');

  if (!product) {
    return (
      <div className={styles.notFound}>
        <p>Product not found.</p>
        <Link to="/shop">← Back to Shop</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const images  = product.images?.length ? product.images : [product.image];

  const handleAdd = () => {
    setAdding(true);
    addItem(product, qty);
    setTimeout(() => {
      setAdding(false);
      openCart();
    }, 600);
  };

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link to="/">Home</Link>
          <span className="material-symbols-outlined">chevron_right</span>
          <Link to="/shop">Shop</Link>
          <span className="material-symbols-outlined">chevron_right</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* Product Layout */}
      <div className={styles.productLayout}>
        {/* Images */}
        <div className={styles.imagesCol}>
          <div className={`${styles.mainImage} fabric-shimmer`}>
            <img src={images[activeImg]} alt={product.name} className={styles.mainImg} />
            {product.tag && <span className={styles.imgTag}>{product.tag}</span>}
          </div>
          {images.length > 1 && (
            <div className={styles.thumbs}>
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`View ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className={styles.infoCol}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.productName}>{product.name}</h1>

          <div className={styles.priceRow}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            <span className={styles.priceUnit}>/ {product.priceUnit}</span>
          </div>

          {/* Stock badge */}
          <div className={`${styles.stockBadge} ${product.inStock ? styles.inStock : styles.outOfStock}`}>
            <span className="material-symbols-outlined">
              {product.inStock ? 'check_circle' : 'cancel'}
            </span>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </div>

          <p className={styles.description}>{product.description}</p>
          <p className={styles.details}>{product.details}</p>

          {/* Quantity + CTA */}
          {product.inStock && (
            <div className={styles.purchaseRow}>
              <div className={styles.qtyControl}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  aria-label="Decrease"
                >−</button>
                <span className={styles.qtyNum}>{qty}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQty(q => q + 1)}
                  aria-label="Increase"
                >+</button>
              </div>
              <button
                className={`${styles.addToCart} ${adding ? styles.adding : ''}`}
                onClick={handleAdd}
                disabled={adding}
              >
                {adding ? (
                  <><span className="material-symbols-outlined">check</span>Added!</>
                ) : (
                  <><span className="material-symbols-outlined">add_shopping_cart</span>Add to Cart</>
                )}
              </button>
            </div>
          )}

          {/* Wishlist / Share */}
          <div className={styles.secondaryActions}>
            <button className={styles.secondaryBtn}>
              <span className="material-symbols-outlined">favorite_border</span>
              Save to Wishlist
            </button>
            <button className={styles.secondaryBtn}>
              <span className="material-symbols-outlined">share</span>
              Share
            </button>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            {['description', 'care', 'shipping'].map(t => (
              <button
                key={t}
                className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
                onClick={() => setTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className={styles.tabContent}>
            {tab === 'description' && (
              <p>{product.description} Each yard is carefully inspected for quality before dispatch.</p>
            )}
            {tab === 'care' && (
              <ul className={styles.careList}>
                <li><span className="material-symbols-outlined">dry_cleaning</span>Dry clean recommended</li>
                <li><span className="material-symbols-outlined">water_drop</span>Hand wash with cold water if needed</li>
                <li><span className="material-symbols-outlined">iron</span>Low heat iron on reverse side</li>
                <li><span className="material-symbols-outlined">light_mode</span>Avoid prolonged sun exposure</li>
              </ul>
            )}
            {tab === 'shipping' && (
              <div className={styles.shippingInfo}>
                <p><strong>Lagos:</strong> Same-day delivery available (orders before 2pm)</p>
                <p><strong>Nationwide:</strong> 2–4 business days</p>
                <p><strong>International:</strong> 7–14 business days</p>
                <p style={{ marginTop: '0.75rem', opacity: 0.7 }}>Free shipping on orders above ₦50,000</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className={styles.related}>
          <div className={styles.relatedHeader}>
            <span className={styles.eyebrow}>You May Also Like</span>
            <h2 className={styles.relatedTitle}>More {product.category} Fabrics</h2>
          </div>
          <div className={styles.relatedGrid}>
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
