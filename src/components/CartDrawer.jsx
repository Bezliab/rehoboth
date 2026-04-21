// File: src/components/CartDrawer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './CartDrawer.module.css';

const formatPrice = (p) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(p);

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQty, totalPrice, totalItems } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`} aria-label="Shopping Cart">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span className="material-symbols-outlined">shopping_bag</span>
            <h2>Your Bag</h2>
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </div>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Items */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, opacity: 0.3 }}>shopping_bag</span>
              <p>Your bag is empty.</p>
              <p className={styles.emptySubtext}>Discover our premium fabrics.</p>
              <button className={styles.shopBtn} onClick={closeCart}>
                <Link to="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>Explore the Collection</Link>
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemImg}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={styles.itemInfo}>
                  <span className={styles.itemCategory}>{item.category}</span>
                  <h4 className={styles.itemName}>{item.name}</h4>
                  <div className={styles.itemPriceRow}>
                    <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
                    <span className={styles.itemUnit}>/ {item.priceUnit}</span>
                  </div>
                  <div className={styles.itemActions}>
                    {/* Quantity */}
                    <div className={styles.qty}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >−</button>
                      <span className={styles.qtyNum}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >+</button>
                    </div>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <span className={styles.subtotalAmt}>{formatPrice(totalPrice)}</span>
            </div>
            <p className={styles.shipping}>Shipping & taxes calculated at checkout</p>
            <button className={styles.checkoutBtn}>
              Proceed to Checkout
              <span className="material-symbols-outlined">east</span>
            </button>
            <button className={styles.continueBtn} onClick={closeCart}>
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
