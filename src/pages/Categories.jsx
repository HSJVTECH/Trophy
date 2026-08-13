import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Filter, Star, SlidersHorizontal, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products, categories } from '../data/products';
import './Categories.css';

const MATERIALS = ['All', 'Metal', 'Crystal', 'Acrylic', 'Wood'];
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: '₹0 – ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 – ₹2,000', min: 1000, max: 2000 },
  { label: '₹2,000 – ₹3,500', min: 2000, max: 3500 },
  { label: '₹3,500+', min: 3500, max: Infinity },
];

const ProductItem = ({ product, index }) => {
  const { addToCart } = useCart();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="cat-product-item"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 6) * 0.07 }}
    >
      <div className="cat-product-badge-row">
        {product.tag && <span className="product-tag">{product.tag}</span>}
      </div>

      <div className="cat-product-visual">
        <div className="cat-product-emoji">{product.emoji}</div>
        <div className="cat-product-glow" />
      </div>

      <div className="cat-product-body">
        <div className="cat-product-meta">
          <span className="cat-product-material">{product.material}</span>
          <div className="cat-product-stars">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={11} fill={i < product.rating ? '#C9A84C' : 'none'} color={i < product.rating ? '#C9A84C' : '#333'} />
            ))}
            <span>({product.reviews})</span>
          </div>
        </div>

        <h3 className="cat-product-name">{product.name}</h3>
        <p className="cat-product-desc">{product.description}</p>

        <div className="cat-product-footer">
          <div className="cat-product-prices">
            {product.originalPrice && (
              <span className="cat-original">₹{product.originalPrice.toLocaleString()}</span>
            )}
            <span className="cat-price">₹{product.price.toLocaleString()}</span>
          </div>
          <button
            className="btn-primary cat-add-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Categories = () => {
  const [activeCat, setActiveCat] = useState('all');
  const [activeMaterial, setActiveMaterial] = useState('All');
  const [activePriceIdx, setActivePriceIdx] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  const filtered = products.filter(p => {
    const catMatch = activeCat === 'all' || p.category === activeCat;
    const matMatch = activeMaterial === 'All' || p.material === activeMaterial;
    const { min, max } = PRICE_RANGES[activePriceIdx];
    const priceMatch = p.price >= min && p.price <= max;
    return catMatch && matMatch && priceMatch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviews - a.reviews; // popular
  });

  const activeCategory = categories.find(c => c.id === activeCat);

  return (
    <div className="page-wrapper categories-page">
      {/* Hero Banner */}
      <section className="cat-hero">
        <div className="cat-hero-glow" />
        <motion.div
          className="cat-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-subtitle">Browse Our Collection</div>
          <h1 className="section-title gold-text">Categories</h1>
          <div className="gold-divider" style={{ margin: '16px auto' }} />
          <p style={{ color: 'var(--white-muted)', fontSize: '0.95rem' }}>
            Explore our wide range of trophies for every occasion
          </p>
        </motion.div>
      </section>

      <div className="container">
        <div className="categories-layout">
          {/* Sidebar Filter */}
          <motion.aside
            className={`cat-sidebar ${filterOpen ? 'open' : ''}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Mobile close */}
            <button className="sidebar-close" onClick={() => setFilterOpen(false)}>
              <X size={18} /> Close
            </button>

            <div className="sidebar-section">
              <h4 className="sidebar-title">Filter By</h4>
            </div>

            <div className="sidebar-section">
              <h5 className="sidebar-heading">Categories</h5>
              <button
                className={`sidebar-filter-btn ${activeCat === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCat('all')}
              >
                All Trophies
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`sidebar-filter-btn ${activeCat === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCat(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="sidebar-section">
              <h5 className="sidebar-heading">Material</h5>
              {MATERIALS.map(mat => (
                <button
                  key={mat}
                  className={`sidebar-filter-btn ${activeMaterial === mat ? 'active' : ''}`}
                  onClick={() => setActiveMaterial(mat)}
                >
                  {mat}
                </button>
              ))}
            </div>

            <div className="sidebar-section">
              <h5 className="sidebar-heading">Price Range</h5>
              {PRICE_RANGES.map((range, i) => (
                <button
                  key={range.label}
                  className={`sidebar-filter-btn ${activePriceIdx === i ? 'active' : ''}`}
                  onClick={() => setActivePriceIdx(i)}
                >
                  {range.label}
                </button>
              ))}
            </div>

            <div className="sidebar-section">
              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}
                onClick={() => {
                  setActiveCat('all');
                  setActiveMaterial('All');
                  setActivePriceIdx(0);
                  setFilterOpen(false);
                }}
              >
                Apply / Reset Filter
              </button>
            </div>
          </motion.aside>

          {/* Filter overlay (mobile) */}
          {filterOpen && (
            <div className="filter-overlay" onClick={() => setFilterOpen(false)} />
          )}

          {/* Main Content */}
          <div className="cat-main">
            {/* Top bar */}
            <div className="cat-topbar">
              <div className="cat-topbar-left">
                <h2 className="cat-heading">
                  {activeCategory ? activeCategory.name : 'All Trophies'}
                </h2>
                <span className="cat-count-badge">Showing {filtered.length} results</span>
              </div>
              <div className="cat-topbar-right">
                <button className="filter-toggle-btn" onClick={() => setFilterOpen(true)}>
                  <SlidersHorizontal size={16} />
                  Filters
                </button>
                <div className="sort-select-wrap">
                  <label>Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="popular">Popular</option>
                    <option value="rating">Rating</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category tabs (horizontal scroll) */}
            <div className="cat-tabs">
              <button
                className={`cat-tab ${activeCat === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCat('all')}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`cat-tab ${activeCat === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCat(cat.id)}
                >
                  {cat.icon} {cat.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Products */}
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  className="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div style={{ fontSize: '4rem' }}>🔍</div>
                  <h3>No trophies found</h3>
                  <p>Try adjusting your filters</p>
                </motion.div>
              ) : (
                <motion.div
                  className="cat-products-list"
                  key={`${activeCat}-${activeMaterial}-${activePriceIdx}-${sortBy}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {filtered.map((product, i) => (
                    <ProductItem key={product.id} product={product} index={i} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
