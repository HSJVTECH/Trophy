import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Palette, Type, Layers, Eye, Package, Check, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Customization.css';

const STYLES = [
  { id: 'classic', name: 'Classic Cup', emoji: '🏆', price: 1999 },
  { id: 'star', name: 'Star Trophy', emoji: '⭐', price: 2299 },
  { id: 'shield', name: 'Shield Award', emoji: '🛡️', price: 1799 },
  { id: 'column', name: 'Column Trophy', emoji: '🏛️', price: 2599 },
  { id: 'medal', name: 'Medal Design', emoji: '🥇', price: 999 },
  { id: 'plaque', name: 'Plaque Award', emoji: '📋', price: 1499 },
];

const MATERIALS_LIST = ['Metal', 'Crystal', 'Acrylic', 'Wood', 'Resin'];
const COLORS = ['#C9A84C', '#C0C0C0', '#CD7F32', '#FFFFFF', '#1A1A2E', '#2C3E50'];
const FINISH_OPTIONS = ['Matte', 'Glossy', 'Brushed', 'Antique'];

const PROCESS_STEPS = [
  { icon: <Palette size={22} />, title: 'Choose Design', desc: 'Select your favorite trophy style from our premium collection' },
  { icon: <Type size={22} />, title: 'Customize It', desc: 'Add text, choose colors, pick your preferred material and finish' },
  { icon: <Eye size={22} />, title: 'Preview', desc: 'See how your trophy will look before placing the order' },
  { icon: <Package size={22} />, title: 'Place Order', desc: 'We craft and deliver your custom trophy right to your door' },
];

const Customization = () => {
  const { addToCart } = useCart();
  const [step, setStep] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [engraving, setEngraving] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('Metal');
  const [selectedColor, setSelectedColor] = useState('#C9A84C');
  const [selectedFinish, setSelectedFinish] = useState('Glossy');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const heroRef = useRef(null);
  const inView = useInView(heroRef, { once: true });

  const selected = STYLES.find(s => s.id === selectedStyle);

  const handleAddToCart = () => {
    if (!selected) return;
    addToCart({
      id: `custom-${selected.id}-${Date.now()}`,
      name: `Custom ${selected.name}`,
      price: selected.price + (selectedMaterial === 'Crystal' ? 500 : selectedMaterial === 'Wood' ? 300 : 0),
      emoji: selected.emoji,
      material: selectedMaterial,
      description: `Custom engraving: "${engraving || 'Your Text'}"`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="page-wrapper custom-page">
      {/* Hero */}
      <section className="custom-hero" ref={heroRef}>
        <div className="custom-hero-glow" />
        <motion.div
          className="custom-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div className="section-subtitle">Personalized Awards</div>
          <h1 className="section-title">
            CREATE YOUR<br />
            <span className="gold-text">OWN TROPHY</span>
          </h1>
          <div className="gold-divider" style={{ margin: '16px auto' }} />
          <p style={{ color: 'var(--white-muted)', maxWidth: 500, margin: '0 auto' }}>
            Design a trophy that reflects your achievement with our interactive customization tool
          </p>
        </motion.div>
      </section>

      {/* Process Steps */}
      <section className="process-section">
        <div className="container">
          <div className="process-steps">
            {PROCESS_STEPS.map((s, i) => (
              <motion.div
                key={i}
                className={`process-step ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'done' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => i < step && setStep(i + 1)}
              >
                <div className="process-step-num">
                  {step > i + 1 ? <Check size={16} /> : i + 1}
                </div>
                <div className="process-step-icon">{s.icon}</div>
                <div className="process-step-title">{s.title}</div>
                <div className="process-step-desc">{s.desc}</div>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="process-connector">
                    <ChevronRight size={16} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="custom-layout">
          {/* Customization Form */}
          <div className="custom-form">
            {/* Step 1: Choose Style */}
            <motion.div
              className="custom-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="custom-section-header">
                <div className="custom-section-num">01</div>
                <div>
                  <h3 className="custom-section-title">Choose Trophy Style</h3>
                  <p className="custom-section-sub">Select your preferred trophy design</p>
                </div>
              </div>
              <div className="styles-list">
                {STYLES.map((style, i) => (
                  <motion.button
                    key={style.id}
                    className={`style-item ${selectedStyle === style.id ? 'active' : ''}`}
                    onClick={() => { setSelectedStyle(style.id); setStep(2); }}
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <span className="style-emoji">{style.emoji}</span>
                    <div className="style-info">
                      <span className="style-name">{style.name}</span>
                      <span className="style-price">from ₹{style.price.toLocaleString()}</span>
                    </div>
                    {selectedStyle === style.id && (
                      <div className="style-check"><Check size={14} /></div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Step 2: Engraving */}
            <motion.div
              className="custom-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="custom-section-header">
                <div className="custom-section-num">02</div>
                <div>
                  <h3 className="custom-section-title">Engraving Text</h3>
                  <p className="custom-section-sub">Add your custom text and title</p>
                </div>
              </div>
              <div className="form-fields">
                <div className="form-field">
                  <label>Main Text / Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Best Player 2024"
                    value={engraving}
                    onChange={e => setEngraving(e.target.value)}
                    maxLength={40}
                    className="custom-input"
                  />
                  <span className="field-hint">{engraving.length}/40 characters</span>
                </div>
                <div className="form-field">
                  <label>Subtitle / Event Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Annual Sports Meet 2024"
                    value={subtitle}
                    onChange={e => setSubtitle(e.target.value)}
                    maxLength={50}
                    className="custom-input"
                  />
                </div>
              </div>
            </motion.div>

            {/* Step 3: Material & Finish */}
            <motion.div
              className="custom-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="custom-section-header">
                <div className="custom-section-num">03</div>
                <div>
                  <h3 className="custom-section-title">Material & Finish</h3>
                  <p className="custom-section-sub">Choose material type and surface finish</p>
                </div>
              </div>

              <div className="options-group">
                <h4 className="options-label">Material</h4>
                <div className="options-row">
                  {MATERIALS_LIST.map(mat => (
                    <button
                      key={mat}
                      className={`option-pill ${selectedMaterial === mat ? 'active' : ''}`}
                      onClick={() => setSelectedMaterial(mat)}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="options-group">
                <h4 className="options-label">Accent Color</h4>
                <div className="color-swatches">
                  {COLORS.map(color => (
                    <button
                      key={color}
                      className={`color-swatch ${selectedColor === color ? 'active' : ''}`}
                      style={{ background: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              <div className="options-group">
                <h4 className="options-label">Surface Finish</h4>
                <div className="options-row">
                  {FINISH_OPTIONS.map(fin => (
                    <button
                      key={fin}
                      className={`option-pill ${selectedFinish === fin ? 'active' : ''}`}
                      onClick={() => setSelectedFinish(fin)}
                    >
                      {fin}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Step 4: Quantity & Order */}
            <motion.div
              className="custom-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="custom-section-header">
                <div className="custom-section-num">04</div>
                <div>
                  <h3 className="custom-section-title">Quantity & Order</h3>
                  <p className="custom-section-sub">Set quantity and add to cart</p>
                </div>
              </div>

              <div className="qty-order-row">
                <div className="qty-controls">
                  <span className="options-label">Quantity</span>
                  <div className="qty-row">
                    <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                    <span className="qty-display">{quantity}</span>
                    <button className="qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Min order: 1 piece</span>
                </div>

                <div className="order-summary">
                  {selected ? (
                    <>
                      <div className="order-price">
                        ₹{(selected.price * quantity).toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: 12 }}>
                        ₹{selected.price.toLocaleString()} × {quantity} piece{quantity > 1 ? 's' : ''}
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: 12 }}>
                      Select a style to see pricing
                    </div>
                  )}
                  <motion.button
                    className={`btn-primary ${!selected ? 'disabled' : ''}`}
                    style={{ opacity: selected ? 1 : 0.5, cursor: selected ? 'pointer' : 'not-allowed' }}
                    onClick={handleAddToCart}
                    whileHover={selected ? { scale: 1.02 } : {}}
                  >
                    {added ? <><Check size={16} /> Added!</> : <>Add to Cart <ArrowRight size={16} /></>}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Preview Panel */}
          <div className="custom-preview">
            <div className="preview-panel">
              <div className="preview-header">
                <span>Live Preview</span>
              </div>
              <div className="preview-display">
                <div className="preview-glow" />
                <motion.div
                  className="preview-trophy"
                  key={selectedStyle}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  animate={{ 
                    rotateY: [0, 15, 0, -15, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    rotateY: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
                    y: { repeat: Infinity, duration: 3, ease: 'easeInOut' }
                  }}
                >
                  {selected ? selected.emoji : '🏆'}
                </motion.div>
                <div className="preview-label" style={{ borderColor: selectedColor }}>
                  <div className="preview-text-main">{engraving || 'YOUR TEXT HERE'}</div>
                  {subtitle && <div className="preview-text-sub">{subtitle}</div>}
                </div>
              </div>

              {/* Preview specs */}
              <div className="preview-specs">
                {[
                  { label: 'Style', value: selected ? selected.name : 'Not selected' },
                  { label: 'Material', value: selectedMaterial },
                  { label: 'Finish', value: selectedFinish },
                  { label: 'Quantity', value: `${quantity} piece${quantity > 1 ? 's' : ''}` },
                ].map(spec => (
                  <div key={spec.label} className="preview-spec-row">
                    <span className="preview-spec-label">{spec.label}</span>
                    <span className="preview-spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>

              {selected && (
                <div className="preview-total">
                  <span>Total Estimate</span>
                  <span className="gold-text">₹{(selected.price * quantity).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customization;
