// File: src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/shop',       label: 'Shop' },
  { to: '/aso-ebi',    label: 'Aso-Ebi' },
  { to: '/collections',label: 'Collections' },
  { to: '/contact',    label: 'Contact' },
];

export default function Navbar() {
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [cartAnim, setCartAnim]   = useState(false);
  const prevItems = useRef(totalItems);
  const location  = useLocation();

  /* Scroll detection */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* Cart pop animation when item added */
  useEffect(() => {
    if (totalItems > prevItems.current) {
      setCartAnim(true);
      setTimeout(() => setCartAnim(false), 400);
    }
    prevItems.current = totalItems;
  }, [totalItems]);

  /* Close mobile menu on route change */
  useEffect(() => setMenuOpen(false), [location]);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <div className={styles.inner}>

        {/* ── Logo ── */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>R</span>
          <span className={styles.logoText}>Rehoboth Fabrics</span>
        </Link>

        {/* ── Desktop Links ── */}
        <ul className={styles.links}>
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.linkActive : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Actions ── */}
        <div className={styles.actions}>
          <button
            className={`${styles.cartBtn} ${cartAnim ? styles.cartPop : ''}`}
            onClick={openCart}
            aria-label="Open shopping cart"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </button>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileLinks}>
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
