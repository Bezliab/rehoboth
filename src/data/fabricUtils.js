// src/data/fabricUtils.js
// Single source of truth — all data derived from fabricImages.json
import fabricData from "./fabricImages.json";

const { materials } = fabricData;

/* ── Pricing map (one price per category key) ──────────────── */
export const CATEGORY_PRICES = {
  Lace: 8000,
  Ankara: 5000,
  Silk: 15000,
  George: 12000,
  "Aso-Ebi": 9000,
  Guinea_Brocade: 5500,
  Kampala: 3500,
  Cashmere: 25000,
  Cotton: 2000,
  Denim: 4500,
  Chiffon: 6800,
  Satin: 4000,
  Organza: 2800,
  Damask: 8500,
  Velvet: 7500,
  Adire: 4500,
  Kente: 15000,
};

/* ── Helpers ────────────────────────────────────────────────── */
/** Guinea_Brocade → Guinea Brocade */
export const displayName = (key) => key.replace(/_/g, " ");

/** Safe price lookup with fallback */
const priceFor = (key) => CATEGORY_PRICES[key] ?? 5000;

/** Extract all category keys from materials */
export const getCategoryKeys = () => Object.keys(materials);

/** Get material by category key */
export const getMaterialByKey = (key) => materials[key];

/* ── Flat product array (one entry per image = 680 total) ───── */
export const allProducts = Object.entries(materials).flatMap(
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

/* ── Dynamic categories (from JSON keys) ────────────────────── */
export const dynamicCategories = Object.entries(materials).map(
  ([key, material]) => ({
    id: key.toLowerCase().replace(/_/g, "-"),
    key,
    name: displayName(key),
    description: material.description,
    colors: material.colors,
    count: material.images.length,
    image: material.images[0].url,
    previewImages: material.images.slice(0, 4).map((i) => i.url),
    tagline: material.description,
  }),
);

/* ── Featured products (first 3-4 images per category) ───────────── */
export const featuredByCategory = dynamicCategories.flatMap((cat) =>
  materials[cat.key].images.slice(0, 4).map((img, idx) => ({
    id: `${cat.key}-featured-${idx}`,
    name: idx === 0 ? `${cat.name} Collection` : `${cat.name} Style ${idx}`,
    category: cat.key,
    categoryDisplay: cat.name,
    image: img.url,
    alt: img.alt,
    description: cat.description,
    colors: cat.colors,
    price: priceFor(cat.key),
    priceUnit: "per yard",
    inStock: true,
    tag: idx === 0 ? "Featured" : null,
  })),
);

/* ── Featured materials for HomePage (limit 4 categories, 3 images each) ──── */
export const getFeaturedMaterials = (limit = 4, imagesPerCategory = 3) =>
  dynamicCategories.slice(0, limit).flatMap((cat) =>
    materials[cat.key].images.slice(0, imagesPerCategory).map((img) => ({
      id: `${cat.key}-${img.id}`,
      category: cat.key,
      categoryDisplay: cat.name,
      image: img.url,
      alt: img.alt,
      description: cat.description,
      colors: cat.colors,
      price: priceFor(cat.key),
      priceUnit: "per yard",
      inStock: true,
    })),
  );

/* ── Get N images for a given category key ──────────────────── */
export const getCategoryProducts = (categoryKey, limit = 40) =>
  allProducts.filter((p) => p.category === categoryKey).slice(0, limit);

/* ── Pagination helper ────────────────────────────────────────── */
export const getPaginatedProducts = (products, page = 1, pageSize = 20) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    items: products.slice(start, end),
    total: products.length,
    page,
    pageSize,
    totalPages: Math.ceil(products.length / pageSize),
    hasNextPage: end < products.length,
  };
};

/* ── Lazy load products in chunks ────────────────────────────── */
export const lazyLoadProducts = (products, pageSize = 20) => {
  const pages = [];
  for (let i = 0; i < products.length; i += pageSize) {
    pages.push(products.slice(i, i + pageSize));
  }
  return pages;
};
