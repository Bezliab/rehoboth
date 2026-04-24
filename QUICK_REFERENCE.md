# Quick Reference - Using JSON Data in Components

## 1. Import Data from fabricUtils.js

```javascript
import {
  allProducts, // ✅ All 680 products
  dynamicCategories, // ✅ 17 categories
  featuredByCategory, // ✅ Featured per category
  getFeaturedMaterials, // ✅ Function for featured items
  getCategoryProducts, // ✅ Function to get category items
  CATEGORY_PRICES, // ✅ Price mapping
  displayName, // ✅ Format category names
  getMaterialByKey, // ✅ Get material data
} from "../data/fabricUtils";
```

---

## 2. Product Object Structure

Every product has:

```javascript
{
  id:              "Lace-1",                    // Unique ID: CategoryKey-ImageId
  category:        "Lace",                      // Raw category key
  categoryDisplay: "Lace",                      // Formatted category name
  image:           "https://images.unsplash...",// Image URL
  alt:             "White floral lace fabric",  // Alt text for accessibility
  description:     "Delicate openwork fabric...",// Material description
  colors:          ["white", "ivory", "black"],// Available colors
  price:           8000,                        // Price in NGN
  priceUnit:       "per yard",                  // Price unit
  inStock:         true                         // Availability
}
```

---

## 3. Common Patterns

### Display All Products with Pagination (20 per page)

```javascript
import { allProducts } from "../data/fabricUtils";
import ShopProductCard from "../components/ShopProductCard";

export default function MyPage() {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  const displayed = allProducts.slice(0, page * PAGE_SIZE);
  const hasMore = displayed.length < allProducts.length;

  return (
    <>
      <div className={styles.grid}>
        {displayed.map((p) => (
          <ShopProductCard key={p.id} product={p} />
        ))}
      </div>
      {hasMore && (
        <button onClick={() => setPage((p) => p + 1)}>Load More</button>
      )}
    </>
  );
}
```

### Get Products from Specific Category

```javascript
import { getCategoryProducts } from "../data/fabricUtils";

const laceProducts = getCategoryProducts("Lace", 40);
// Returns first 40 Lace products

const ankProducts = getCategoryProducts("Ankara", 20);
// Returns first 20 Ankara products
```

### Display Dynamic Category Buttons

```javascript
import { dynamicCategories } from "../data/fabricUtils";

{
  dynamicCategories.map((cat) => (
    <button key={cat.key} onClick={() => setCategory(cat.key)}>
      {cat.name} ({cat.count})
    </button>
  ));
}
```

### Show Featured Items (4 categories, 3 items each = 12 total)

```javascript
import { getFeaturedMaterials } from "../data/fabricUtils";

const featured = getFeaturedMaterials(4, 3);
// Returns 12 featured products

{
  featured.map((p) => <ProductCard key={p.id} product={p} />);
}
```

### Track Quantity & Calculate Total

```javascript
const [qty, setQty] = useState(1);

const total = product.price * qty;

<div>
  <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
  <span>{qty}</span>
  <button onClick={() => setQty(qty + 1)}>+</button>
</div>

<p>Total: ₦{total.toLocaleString()}</p>
```

### Filter Products by Search

```javascript
const [search, setSearch] = useState("");

const filtered = allProducts.filter(
  (p) =>
    p.categoryDisplay.toLowerCase().includes(search.toLowerCase()) ||
    p.alt.toLowerCase().includes(search.toLowerCase()),
);
```

### Format Currency (NGN)

```javascript
const fmt = (n) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(n);

<span>{fmt(8000)}</span>  // Output: ₦8,000
<span>{fmt(15000)}</span> // Output: ₦15,000
```

---

## 4. Category List (17 total)

```javascript
// All categories (in order):
[
  "Lace", // 40 images @ ₦8,000
  "Ankara", // 40 images @ ₦5,000
  "Silk", // 40 images @ ₦15,000
  "George", // 40 images @ ₦12,000
  "Aso-Ebi", // 40 images @ ₦9,000
  "Guinea_Brocade", // 40 images @ ₦5,500
  "Kampala", // 40 images @ ₦3,500
  "Cashmere", // 40 images @ ₦25,000
  "Cotton", // 40 images @ ₦2,000
  "Denim", // 40 images @ ₦4,500
  "Chiffon", // 40 images @ ₦6,800
  "Satin", // 40 images @ ₦4,000
  "Organza", // 40 images @ ₦2,800
  "Damask", // 40 images @ ₦8,500
  "Velvet", // 40 images @ ₦7,500
  "Adire", // 40 images @ ₦4,500
  "Kente", // 40 images @ ₦15,000
];
```

---

## 5. Using CategoryFilter Component

### Pills Variant (Horizontal)

```javascript
import CategoryFilter from "../components/CategoryFilter";

<CategoryFilter
  activeCategory={category}
  onCategoryChange={setCategory}
  variant="pills"
  showCounts={true}
  allCount={allProducts.length}
/>;
```

### Sidebar Variant (Vertical)

```javascript
<CategoryFilter
  activeCategory={category}
  onCategoryChange={setCategory}
  variant="sidebar"
  showCounts={true}
/>
```

### Dropdown Variant (Select)

```javascript
<CategoryFilter
  activeCategory={category}
  onCategoryChange={setCategory}
  variant="dropdown"
  allCount={allProducts.length}
/>
```

---

## 6. Using ProductGrid Component

```javascript
import ProductGrid from "../components/ProductGrid";
import ShopProductCard from "../components/ShopProductCard";

<ProductGrid
  products={filteredProducts}
  renderItem={(product) => <ShopProductCard product={product} />}
  pageSize={20}
  emptyMessage="No fabrics match your search"
  loadMore={true}
/>;
```

---

## 7. Get Material Info

```javascript
import { getMaterialByKey } from "../data/fabricUtils";

const laceMaterial = getMaterialByKey("Lace");
// Returns:
// {
//   description: "Delicate openwork fabric...",
//   colors: ["white", "ivory", "black", ...],
//   images: [
//     { id: 1, url: "...", alt: "..." },
//     { id: 2, url: "...", alt: "..." },
//     ...
//   ]
// }

laceMaterial.colors.join(", ");
// Output: "white, ivory, black, champagne, gold"

laceMaterial.images.slice(0, 4).map((img) => img.url);
// Get first 4 image URLs
```

---

## 8. Handling Image Errors

```javascript
const [imgError, setImgError] = useState(false);

<img
  src={
    imgError
      ? "https://placehold.co/400x320/1a1a1a/ccc?text=Image+Unavailable"
      : product.image
  }
  alt={product.alt}
  onError={() => setImgError(true)}
/>;
```

---

## 9. Cart Integration

```javascript
import { useCart } from "../context/CartContext";

const { addItem, removeItem, updateQty, items, totalPrice } = useCart();

// Add item with quantity
addItem(
  {
    ...product,
    name: product.categoryDisplay,
  },
  2,
); // Add 2 units

// Remove item
removeItem(product.id);

// Update quantity
updateQty(product.id, 5);

// Check total
console.log(totalPrice); // Total price of all items
```

---

## 10. Tips & Best Practices

✅ **Always use JSON data** - Don't hardcode images or categories
✅ **Use `lazy` loading** - Add `loading="lazy"` to all images
✅ **Format currency** - Use `fmt()` helper for NGN currency
✅ **Handle errors** - Show placeholder for broken images
✅ **Paginate large lists** - Load 20 items, more on demand
✅ **Use `useMemo`** - Memoize filtered/sorted lists
✅ **Set alt text** - Always use `product.alt` for accessibility
✅ **Track quantity** - For per-product quantity selection
✅ **Display categories** - Use `dynamicCategories` for dynamic UI
✅ **Check inventory** - Use `product.inStock` flag

---

## Common Mistakes to Avoid

❌ **Don't hardcode categories**

```javascript
// ❌ WRONG
const categories = ["Lace", "Ankara", "Silk"];

// ✅ RIGHT
const categories = dynamicCategories.map((c) => c.name);
```

❌ **Don't load all 680 products at once**

```javascript
// ❌ WRONG - Renders 680 items immediately
{
  allProducts.map((p) => <Card {...p} />);
}

// ✅ RIGHT - Pagination
{
  displayed.map((p) => <Card {...p} />);
}
```

❌ **Don't forget lazy loading**

```javascript
// ❌ WRONG
<img src={product.image} />

// ✅ RIGHT
<img src={product.image} loading="lazy" />
```

❌ **Don't hardcode prices**

```javascript
// ❌ WRONG
if (category === "Lace") price = 8000;

// ✅ RIGHT
const price = CATEGORY_PRICES[category];
```

---

## Debugging

```javascript
// Check all products
console.log(allProducts); // 680 items
console.log(allProducts.length); // 680

// Check categories
console.log(dynamicCategories); // 17 categories
console.log(dynamicCategories.map((c) => c.name));

// Check specific category products
console.log(getCategoryProducts("Lace", 5)); // First 5 Lace products

// Check prices
console.log(CATEGORY_PRICES); // All category prices

// Check featured
console.log(getFeaturedMaterials(4, 3)); // 12 featured items
```

---

## Need Help?

Refer to:

- `src/data/fabricUtils.js` - All data utilities
- `src/pages/ShopPage.jsx` - Complete example implementation
- `src/components/CategoryFilter.jsx` - Filter component usage
- `src/components/ProductGrid.jsx` - Pagination example
- `IMPLEMENTATION_SUMMARY.md` - Full documentation
