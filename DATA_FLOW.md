# Data Flow Architecture

## System Overview

```
fabricImages.json (Single Source of Truth - 680 images, 17 categories)
    ↓
fabricUtils.js (Data Transformation)
    ├─ allProducts (680 products)
    ├─ dynamicCategories (17 categories)
    ├─ featuredByCategory
    ├─ CATEGORY_PRICES (Price mapping)
    └─ Helper functions
    ↓
React Components & Pages
    ├─ HomePage.jsx
    ├─ ShopPage.jsx
    ├─ AsoEbiPage.jsx
    ├─ CollectionsPage.jsx
    └─ Reusable Components
        ├─ ProductCard.jsx
        ├─ CategoryFilter.jsx
        └─ ProductGrid.jsx
    ↓
User Interface
    └─ Display products, filter, cart, checkout
```

---

## Data Transformation Pipeline

### Step 1: JSON Structure

```json
{
  "materials": {
    "Lace": {
      "description": "Delicate openwork...",
      "colors": ["white", "ivory"],
      "images": [
        { "id": 1, "url": "...", "alt": "White lace" },
        { "id": 2, "url": "...", "alt": "Ivory lace" },
        ...
      ]
    },
    "Ankara": { ... },
    ...
  }
}
```

### Step 2: fabricUtils.js Transformation

```javascript
// Input: materials object
// Process: Flatten nested structure
// Output: allProducts array (680 items)

const allProducts = Object.entries(materials).flatMap(
  ([categoryKey, material]) =>
    material.images.map((img) => ({
      id: `${categoryKey}-${img.id}`,
      category: categoryKey,
      categoryDisplay: displayName(categoryKey),
      image: img.url,
      alt: img.alt,
      description: material.description,
      colors: material.colors,
      price: priceFor(categoryKey),
      priceUnit: "per yard",
      inStock: true,
    })),
);
```

### Step 3: Categories Extraction

```javascript
// Input: materials object
// Process: Extract keys and metadata
// Output: dynamicCategories array (17 items)

const dynamicCategories = Object.entries(materials).map(([key, material]) => ({
  id: key.toLowerCase().replace(/_/g, "-"),
  key, // "Lace"
  name: displayName(key), // "Lace"
  description: material.description,
  colors: material.colors,
  count: material.images.length, // 40
  image: material.images[0].url,
  previewImages: material.images.slice(0, 4).map((i) => i.url),
  tagline: material.description,
}));
```

### Step 4: Price Mapping

```javascript
// Category → Price mapping
const CATEGORY_PRICES = {
  Lace: 8000,
  Ankara: 5000,
  Silk: 15000,
  // ... 17 categories total
};

// Applied during transformation
price: CATEGORY_PRICES[categoryKey] ?? 5000;
```

---

## Component Data Flow

### HomePage.jsx

```
fabricUtils.js
  ├─ dynamicCategories → Collections section
  ├─ getFeaturedMaterials(4, 4) → Featured fabrics grid
  └─ Aso-Ebi category data → Hero & spotlight sections
       ↓
ProductCard components
  └─ Display featured items
```

### ShopPage.jsx

```
fabricUtils.js
  ├─ allProducts (680)
  └─ dynamicCategories (17)
       ↓
User Interactions
  ├─ Category filter → Filter products by category
  ├─ Search input → Filter by name/alt text
  ├─ Sort dropdown → Sort products
  └─ Page state → Pagination (20 per page)
       ↓
Filtered + Sorted Products
  ├─ DisplayedProducts = filtered.slice(0, page * 20)
  └─ ShopProductCard for each item
       ↓
User Actions
  ├─ Quantity selector → Update qty state
  ├─ Add to Cart → Send to CartContext
  └─ Load More → Increment page state
```

### AsoEbiPage.jsx

```
fabricUtils.js
  ├─ dynamicCategories.find(c => c.key === 'Aso-Ebi')
  ├─ getMaterialByKey('Aso-Ebi')
  └─ Aso-Ebi images (first 12)
       ↓
Render Sections
  ├─ Hero section (Aso-Ebi image)
  ├─ Fabric gallery (12 images)
  ├─ Collections (hardcoded packages)
  ├─ Pricing table
  └─ Order form
```

### CollectionsPage.jsx

```
fabricUtils.js
  └─ dynamicCategories (17)
       ↓
Render Categories Grid
  ├─ Hero collection (first category)
  └─ Collection cards (all 17)
       ↓
Each Card Shows
  ├─ Category image
  ├─ Category name
  ├─ Description
  ├─ Count ("40 styles")
  └─ Link to /shop (filtered by category)
```

---

## State Management Flow

### Product Data State

```
fabricUtils.js (Static)
  └─ Global exports (allProducts, dynamicCategories)
       ↓
Component Level (Local State)
  ├─ activeCategory (filter selection)
  ├─ sortBy (sort order)
  ├─ search (search query)
  ├─ page (pagination)
  ├─ qty (product quantity)
  └─ imgError (image error handling)
       ↓
Computed State (useMemo)
  └─ filtered = filtered products based on filters
       ↓
Rendered Output
  └─ displayed products
```

### Cart State (CartContext)

```
CartContext
  ├─ items [] (cart items with qty)
  ├─ isOpen boolean
  ├─ addItem(product, qty) → Update cart
  ├─ removeItem(id) → Remove from cart
  ├─ updateQty(id, qty) → Change quantity
  ├─ totalItems → Sum of all quantities
  └─ totalPrice → Sum of all prices
       ↓
Available to all components via useCart()
```

---

## Data Flow by Feature

### Feature: Add to Cart

```
User clicks "Add to Cart"
  ↓
ShopProductCard component
  ├─ Get qty from state
  ├─ Call addItem(product, qty)
  ↓
CartContext
  ├─ Check if item already in cart
  ├─ If yes: update quantity
  ├─ If no: add new item
  ├─ Recalculate totalItems & totalPrice
  ↓
Cart updated
  ├─ CartDrawer refreshes
  └─ Navbar shows updated count
```

### Feature: Filter by Category

```
User clicks category button
  ↓
ShopPage component
  ├─ setActiveCategory(categoryKey)
  ├─ Reset page to 1
  ↓
useMemo recalculates filtered
  ├─ Filter allProducts by category
  ├─ Apply sort
  └─ Return filtered array
       ↓
Render ShopProductCard for each filtered item
  └─ Display updated grid
```

### Feature: Quantity Tracking

```
User clicks "+" button
  ↓
ShopProductCard component
  ├─ setQty(qty + 1)
  ↓
Calculate total
  └─ total = product.price * qty
       ↓
Re-render card with new total
```

### Feature: Pagination

```
User clicks "Load More"
  ↓
ShopPage component
  ├─ setPage(page + 1)
  ↓
useMemo recalculates displayed
  ├─ displayed = filtered.slice(0, page * PAGE_SIZE)
  ↓
Append new ShopProductCard items to grid
```

---

## Image Data Flow

### Image Loading

```
fabricImages.json
  └─ materials[category].images[index].url
       ↓
Product object
  └─ product.image = "https://..."
       ↓
<img src={product.image} loading="lazy" />
       ↓
Browser
  ├─ Downloads image on scroll into view
  ├─ If error: setImgError(true)
  ├─ Show placeholder if error
  └─ Display image if success
```

### Image Error Handling

```
<img src={product.image} onError={() => setImgError(true)} />
  ↓
If image fails to load:
  ├─ setImgError(true)
  ↓
Render fallback
  └─ <img src="https://placehold.co/400x320/.../Image+Unavailable" />
```

---

## Search & Filter Flow

### Search Query Processing

```
User types in search box
  ↓
handleSearch(e)
  ├─ setSearch(e.target.value)
  ├─ setPage(1)  // Reset to first page
  ↓
useMemo recalculates filtered
  ├─ q = search.toLowerCase()
  ├─ Filter allProducts:
  │   if (p.categoryDisplay.includes(q) || p.alt.includes(q))
  ├─ Apply current sort
  └─ Return filtered array
       ↓
Re-render grid with results
  └─ Show matching products
```

### Multi-Filter Flow

```
Filters active:
  ├─ Category: "Lace"
  ├─ Sort: "price-asc"
  └─ Search: "white"

useMemo logic:
  ├─ Start: allProducts (680)
  ├─ Filter category: 40 products
  ├─ Filter search: 8 products
  ├─ Sort by price: 8 products (sorted)
  └─ Paginate: 8 on page 1, 0 remaining
       ↓
Display 8 white Lace fabrics, sorted by price
```

---

## Performance Optimization Points

```
fabricUtils.js
  ├─ One-time transformation on app load
  └─ Static exports (no re-computation)
       ↓
useMemo in components
  ├─ Memoize filtered products
  ├─ Memoize sort operations
  └─ Dependencies: [activeCategory, sortBy, search]
       ↓
Pagination
  ├─ Render only 20 items initially
  ├─ Load more on-demand
  └─ Prevents rendering all 680 items at once
       ↓
Lazy image loading
  ├─ loading="lazy" attribute
  ├─ Images load when scrolled into view
  └─ Reduces initial page load time
       ↓
Error boundary (image fallback)
  └─ Graceful degradation if image fails
```

---

## Key Transformation Functions

### displayName(key)

```javascript
Input: "Guinea_Brocade";
Output: "Guinea Brocade"; // Replace underscores with spaces
```

### priceFor(categoryKey)

```javascript
Input: "Lace";
Output: 8000; // From CATEGORY_PRICES mapping
```

### Flatten Structure

```javascript
Input:
{
  "Lace": {
    "images": [
      { "id": 1, "url": "..." },
      { "id": 2, "url": "..." }
    ]
  }
}

Process: flatMap over materials entries

Output: [
  { "id": "Lace-1", "image": "...", ... },
  { "id": "Lace-2", "image": "...", ... }
]
```

---

## Error Handling Strategy

```
Image Loading Error
  └─ onError handler
      ├─ setImgError(true)
      ├─ Re-render with placeholder
      └─ User sees "Image Unavailable"

Missing Product Data
  └─ Fallback values in ProductCard
      ├─ displayName = product.name || product.categoryDisplay || 'Fabric'
      ├─ displayCat = product.categoryDisplay || product.category || ''
      └─ Safe fallbacks prevent crashes

Invalid Category
  └─ getCategoryProducts returns empty array
      └─ Renders "No products found" message

Cart Operations
  └─ updateQty < 1
      └─ Auto-removes item from cart
```

---

## Data Validation

```
All Products:
  ├─ Total: 680 (40 images × 17 categories)
  ├─ Each has: id, image, alt, category, price, colors
  └─ Verified on transform

All Categories:
  ├─ Total: 17
  ├─ Each has: key, name, count (40), price
  └─ Extracted from JSON keys

Prices:
  ├─ All 17 categories mapped
  ├─ Range: ₦2,000 to ₦25,000
  └─ Fallback: ₦5,000 if missing

Images:
  ├─ All from Unsplash/Pexels CDN
  ├─ Tested URLs with ?w=800&q=80 params
  └─ Fallback placeholder for errors
```

---

## Summary

The data flow is unidirectional:

```
JSON → Utilities → Components → UI → User Actions → State Updates → Re-render
```

This architecture ensures:

- ✅ Single source of truth (JSON)
- ✅ Clear data transformation
- ✅ Predictable state flow
- ✅ Easy debugging
- ✅ Performance optimization
- ✅ Error handling
