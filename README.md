# Rehoboth Fabrics — Frontend

Premium e-commerce frontend for Rehoboth Fabrics, specialists in luxury clothing materials and Aso-Ebi.

## Tech Stack
- **React 18** + **Vite**
- **React Router DOM v6** (client-side routing)
- **CSS Modules** (scoped styles per component)
- **Google Fonts** — Noto Serif + Manrope
- **Material Symbols** (Google icon font)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## Project Structure

```
src/
├── App.jsx                      # Root + Router
├── main.jsx                     # Entry point
├── styles/
│   └── globals.css              # Design system tokens + global styles
├── context/
│   └── CartContext.jsx          # Cart state (useReducer)
├── data/
│   └── products.js              # Products, categories, Aso-Ebi data
├── components/
│   ├── Navbar.jsx / .module.css
│   ├── Footer.jsx / .module.css
│   ├── ProductCard.jsx / .module.css
│   └── CartDrawer.jsx / .module.css
└── pages/
    ├── HomePage.jsx / .module.css
    ├── ShopPage.jsx / .module.css
    ├── ProductPage.jsx / .module.css
    ├── AsoEbiPage.jsx / .module.css
    ├── CollectionsPage.jsx / .module.css
    └── ContactPage.jsx / .module.css
```

## Design System

Based on the **"Digital Loom"** design system:
- **Primary**: `#173124` (Deep Forest Green)
- **Gold Accent**: `#C9A84C`
- **Surface**: `#faf9f6` (Warm Off-White)
- **Fonts**: Noto Serif (display) + Manrope (body)

## Features
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Slide-in Cart Drawer with quantity management
- ✅ Fabric shimmer hover micro-interactions
- ✅ Smooth scroll + reveal animations
- ✅ Cart badge pop animation
- ✅ Product filtering + sorting
- ✅ Aso-Ebi order enquiry form
- ✅ Contact form
- ✅ CSS Modules (zero style conflicts)

## Build for Production

```bash
npm run build
npm run preview
```
