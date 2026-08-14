import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Star, Award, Truck, Shield, ChevronDown, Play } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products, categories, testimonials, statsData } from '../data/products';
import './Home.css';

/* ── Fullscreen hardware-accelerated trophy background player ── */
const TOTAL_FRAMES = 300;

const TrophyFullscreenBackground = () => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const lastTimeRef = useRef(null);

  // Preload frame images into memory array with pre-decoding
  useEffect(() => {
    let mounted = true;
    const images = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${padded}.jpg`;
      if ('decode' in img) {
        img.decode().catch(() => {});
      }
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      mounted = false;
    };
  }, []);

  // Ultra-smooth render loop with High-DPI resolution and LERP damping
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    let animationFrameId;
    let autoRotateProgress = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = Math.min(timestamp - lastTimeRef.current, 50);
      lastTimeRef.current = timestamp;

      const displayWidth = canvas.width;
      const displayHeight = canvas.height;

      // Scroll progress mapping
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // Delta-time based smooth idle rotation
      autoRotateProgress += deltaTime * 0.014;

      // Calculate target float frame
      const targetFrame = (scrollProgress * TOTAL_FRAMES * 2 + autoRotateProgress) % TOTAL_FRAMES;

      // Smooth LERP (linear interpolation) for liquid-smooth 60 FPS motion
      let diff = targetFrame - currentFrameRef.current;
      if (diff > TOTAL_FRAMES / 2) diff -= TOTAL_FRAMES;
      if (diff < -TOTAL_FRAMES / 2) diff += TOTAL_FRAMES;

      currentFrameRef.current += diff * 0.12; // Damping easing factor
      if (currentFrameRef.current < 0) currentFrameRef.current += TOTAL_FRAMES;
      if (currentFrameRef.current >= TOTAL_FRAMES) currentFrameRef.current -= TOTAL_FRAMES;

      const frameIdx = Math.floor(currentFrameRef.current) % TOTAL_FRAMES;
      const img = imagesRef.current[frameIdx];

      if (img && img.complete && img.naturalWidth > 0) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // High-DPI aspect-ratio cover scaling
        const scale = Math.max(displayWidth / img.naturalWidth, displayHeight / img.naturalHeight);
        const x = (displayWidth - img.naturalWidth * scale) / 2;
        const y = (displayHeight - img.naturalHeight * scale) / 2;

        ctx.fillStyle = '#0A0800';
        ctx.fillRect(0, 0, displayWidth, displayHeight);

        ctx.drawImage(
          img,
          0,
          0,
          img.naturalWidth,
          img.naturalHeight,
          x,
          y,
          img.naturalWidth * scale,
          img.naturalHeight * scale
        );
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hero-fullscreen-bg">
      <canvas ref={canvasRef} className="trophy-fullscreen-canvas" />
      <div className="hero-overlay-dark" />
      <div className="hero-overlay-radial" />
      <div className="hero-overlay-gold-glow" />
    </div>
  );
};

/* ── Product Card (list-style, no grid card) ── */
const ProductRow = ({ product, index }) => {
  const { addToCart } = useCart();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="product-row"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <div className="product-row-number">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="product-row-emoji">{product.emoji}</div>
      <div className="product-row-info">
        <div className="product-row-top">
          {product.tag && <span className="product-tag">{product.tag}</span>}
          <span className="product-material">{product.material}</span>
        </div>
        <h3 className="product-row-name">{product.name}</h3>
        <p className="product-row-desc">{product.description}</p>
        <div className="product-row-stars">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={13} fill={i < product.rating ? '#C9A84C' : 'none'} color={i < product.rating ? '#C9A84C' : '#333'} />
          ))}
          <span>({product.reviews})</span>
        </div>
      </div>
      <div className="product-row-right">
        <div className="product-row-prices">
          {product.originalPrice && <span className="product-original">₹{product.originalPrice.toLocaleString()}</span>}
          <span className="product-price">₹{product.price.toLocaleString()}</span>
        </div>
        <button className="btn-primary product-cart-btn" onClick={() => addToCart(product)}>
          Add to Cart <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
};

/* ── Testimonial Ticker ── */
const TestimonialTicker = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="testimonial-ticker">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="testimonial-item"
        >
          <div className="testimonial-stars">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={14} fill="#C9A84C" color="#C9A84C" />
            ))}
          </div>
          <blockquote className="testimonial-text">"{testimonials[active].text}"</blockquote>
          <div className="testimonial-author">
            <div className="testimonial-avatar">{testimonials[active].avatar}</div>
            <div>
              <div className="testimonial-name">{testimonials[active].name}</div>
              <div className="testimonial-role">{testimonials[active].role}</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="testimonial-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`testimonial-dot ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
};

/* ── Main Home Page ── */
const Home = () => {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <div className="home-page">
      {/* ── HERO ── */}
      <section className="hero-section" ref={heroRef}>
        {/* Fullscreen background trophy sequence */}
        <TrophyFullscreenBackground />

        <motion.div className="hero-content" style={{ opacity: heroOpacity, y: heroY }}>
          <div className="hero-left">
            <motion.div
              className="hero-eyebrow"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="eyebrow-line" />
              Premium Trophy Craftsmanship
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
            >
              <span className="hero-title-line">CELEBRATE</span>
              <span className="hero-title-line gold-text">ACHIEVEMENT</span>
              <span className="hero-title-line">HONOR EXCELLENCE</span>
            </motion.h1>

            <motion.p
              className="hero-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Premium Trophies for Every Victory
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              <NavLink to="/categories" className="btn-primary">
                Explore Collection <ArrowRight size={16} />
              </NavLink>
              <NavLink to="/customization" className="btn-outline">
                Custom Design
              </NavLink>
            </motion.div>

            <motion.div
              className="hero-features"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {[
                { icon: <Award size={16} />, text: 'Premium Quality' },
                { icon: <Shield size={16} />, text: 'Custom Designs' },
                { icon: <Truck size={16} />, text: 'Fast Delivery' },
                { icon: <Star size={16} />, text: 'Trusted by Champions' },
              ].map((f, i) => (
                <div key={i} className="hero-feature">
                  <span className="hero-feature-icon">{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="stats-banner">
        <div className="container">
          <div className="stats-inner">
            {statsData.map((stat, i) => (
              <motion.div
                key={i}
                className="stat-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES PREVIEW ── */}
      <section className="home-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-subtitle">Our Collection</div>
            <h2 className="section-title gold-text">Trophy Categories</h2>
            <div className="gold-divider" />
            <p className="section-desc">Explore our wide range of trophies for every occasion</p>
          </motion.div>

          <div className="categories-showcase">
            {categories.slice(0, 6).map((cat, i) => (
              <motion.div
                key={cat.id}
                className="category-showcase-item"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <NavLink to="/categories" className="category-showcase-link">
                  <div className="cat-icon-wrap" style={{ '--cat-color': cat.color }}>
                    <span className="cat-icon-emoji">{cat.icon}</span>
                    <div className="cat-icon-ring" />
                  </div>
                  <div className="cat-info">
                    <h3 className="cat-name">{cat.name}</h3>
                    <p className="cat-desc">{cat.description}</p>
                    <span className="cat-count">{cat.count} items</span>
                  </div>
                  <div className="cat-arrow">
                    <ArrowRight size={16} />
                  </div>
                </NavLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS (List style) ── */}
      <section className="home-section dark-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-subtitle">Top Picks</div>
            <h2 className="section-title gold-text">Featured Trophies</h2>
            <div className="gold-divider" />
          </motion.div>

          <div className="products-list">
            {products.slice(0, 8).map((p, i) => (
              <ProductRow key={p.id} product={p} index={i} />
            ))}
          </div>

          <motion.div
            className="see-all-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <NavLink to="/categories" className="btn-outline">
              View All Products <ArrowRight size={16} />
            </NavLink>
          </motion.div>
        </div>
      </section>

      {/* ── CUSTOMIZATION CTA ── */}
      <section className="custom-cta-section">
        <div className="custom-cta-bg">
          <div className="custom-cta-glow" />
        </div>
        <div className="container">
          <div className="custom-cta-inner">
            <motion.div
              className="custom-cta-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="section-subtitle">Make It Yours</div>
              <h2 className="section-title">
                CREATE YOUR<br />
                <span className="gold-text">OWN TROPHY</span>
              </h2>
              <div className="gold-divider" />
              <p style={{ color: 'var(--white-muted)', lineHeight: 1.8, maxWidth: 420, marginBottom: 32 }}>
                Design a trophy that reflects your achievement. Choose your design, customize text and colors, 
                preview your creation, and we'll craft and deliver it to you.
              </p>
              <div className="custom-steps">
                {['Choose Design', 'Customize It', 'Preview', 'Place Order'].map((step, i) => (
                  <div key={i} className="custom-step">
                    <div className="custom-step-num">{i + 1}</div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <NavLink to="/customization" className="btn-primary" style={{ marginTop: 36 }}>
                Start Customizing <ArrowRight size={16} />
              </NavLink>
            </motion.div>

            <motion.div
              className="custom-cta-right"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <div className="custom-trophy-display">
                <div className="custom-trophy-label">YOUR DESIGN HERE</div>
                <div style={{ fontSize: '8rem', filter: 'drop-shadow(0 0 40px rgba(201,168,76,0.6))', lineHeight: 1 }}>🏆</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="home-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-subtitle">What Champions Say</div>
            <h2 className="section-title gold-text">Customer Reviews</h2>
            <div className="gold-divider" />
          </motion.div>
          <TestimonialTicker />
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-bar-inner">
            {[
              { icon: '🏅', title: 'Premium Quality', desc: 'Finest Materials' },
              { icon: '✨', title: 'Custom Designs', desc: 'Made Just for You' },
              { icon: '⚡', title: 'Fast Delivery', desc: 'On Time, Every Time' },
              { icon: '🏆', title: 'Trusted by Champions', desc: 'For Every Achievement' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="trust-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="trust-icon">{item.icon}</span>
                <div>
                  <div className="trust-title">{item.title}</div>
                  <div className="trust-desc">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
