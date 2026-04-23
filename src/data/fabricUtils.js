// src/data/fabricUtils.js
// Single source of truth — all data derived from fabricImages.json
import fabricData from './fabricImages.json';

const { materials } = fabricData;

/* ── Pricing map (one price per category key) ──────────────── */
export const CATEGORY_PRICES = {
  Lace:           8000,
  Ankara:         5000,
  Silk:          15000,
  George:        12000,
  'Aso-Ebi':      9000,
  Guinea_Brocade: 5500,
  Kampala:        3500,
  Cashmere:      25000,
  Cotton:         2000,
  Denim:          4500,
  Chiffon:        6800,
  Satin:          4000,
  Organza:        2800,
  Damask:         8500,
  Velvet:         7500,
  Adire:          4500,
  Kente:         15000,
};

/* ── Helpers ────────────────────────────────────────────────── */
/** Guinea_Brocade → Guinea Brocade */
export const displayName = (key) => key.replace(/_/g, ' ');

/** Safe price lookup with fallback */
const priceFor = (key) => CATEGORY_PRICES[key] ?? 5000;

/* ── Flat product array (one entry per image = 680 total) ───── */
export const allProducts = Object.entries(materials).flatMap(
  ([categoryKey, material]) =>
    material.images.map((img) => ({
      id:              `${categoryKey}-${img.id}`,
      category:        categoryKey,
      categoryDisplay: displayName(categoryKey),
      image:           img.url,
      alt:             img.alt,
      description:     material.description,
      colors:          material.colors,
      price:           priceFor(categoryKey),
      priceUnit:       'per yard',
      inStock:         true,
    }))
);

/* ── Dynamic categories (from JSON keys) ────────────────────── */
export const dynamicCategories = Object.entries(materials).map(
  ([key, material]) => ({
    id:            key.toLowerCase().replace(/_/g, '-'),
    key,
    name:          displayName(key),
    description:   material.description,
    colors:        material.colors,
    count:         material.images.length,
    image:         material.images[0].url,
    previewImages: material.images.slice(0, 4).map((i) => i.url),
    tagline:       material.description,
  })
);

/* ── Featured products (first image per category) ───────────── */
export const featuredByCategory = dynamicCategories.map((cat) => ({
  id:              `${cat.key}-featured`,
  name:            `${cat.name} Collection`,
  category:        cat.key,
  categoryDisplay: cat.name,
  image:           cat.image,
  images:          cat.previewImages,
  alt:             materials[cat.key].images[0].alt,
  description:     cat.description,
  details:         `Colors: ${cat.colors.join(', ')}`,
  colors:          cat.colors,
  price:           priceFor(cat.key),
  priceUnit:       'per yard',
  inStock:         true,
  tag:             null,
}));

/* ── Get N images for a given category key ──────────────────── */
export const getCategoryProducts = (categoryKey, limit = 40) =>
  (allProducts.filter((p) => p.category === categoryKey)).slice(0, limit);
