import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Globe, Share2, MessageCircle, CheckCircle } from 'lucide-react';
import './Contact.css';

const FAQ_ITEMS = [
  { q: 'What is your minimum order quantity?', a: 'We accept orders for single pieces with no minimum. Bulk discounts apply for orders of 10 or more trophies.' },
  { q: 'How long does engraving take?', a: 'Standard engraving takes 3-5 business days. Rush orders can be completed in 24-48 hours for an additional charge.' },
  { q: 'Do you deliver across India?', a: 'Yes, we deliver pan-India through our trusted courier partners. Free delivery on orders above ₹5,000.' },
  { q: 'Can I customize the trophy design completely?', a: 'Absolutely! Our design team can create fully custom trophies from scratch based on your specifications.' },
  { q: 'What is your return/replacement policy?', a: 'We offer 100% replacement guarantee if the trophy is damaged during delivery or has manufacturing defects.' },
];

const CONTACT_INFO = [
  { icon: <MapPin size={20} />, title: 'Address', lines: ['123 Victory Lane, Success City', 'Maharashtra - 400001, India'] },
  { icon: <Phone size={20} />, title: 'Phone', lines: ['+91 98765 43210', '+91 87654 32109'] },
  { icon: <Mail size={20} />, title: 'Email', lines: ['info@trophyshop.com', 'orders@trophyshop.com'] },
  { icon: <Clock size={20} />, title: 'Working Hours', lines: ['Mon – Sat: 10:00 AM – 7:00 PM', 'Sunday: Closed'] },
];

const ContactInfoItem = ({ item, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="contact-info-item"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <div className="contact-info-icon">{item.icon}</div>
      <div>
        <h4 className="contact-info-title">{item.title}</h4>
        {item.lines.map((line, i) => (
          <p key={i} className="contact-info-line">{line}</p>
        ))}
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="page-wrapper contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-glow" />
        <motion.div
          className="contact-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-subtitle">We'd Love to Hear from You</div>
          <h1 className="section-title gold-text">GET IN TOUCH</h1>
          <div className="gold-divider" style={{ margin: '16px auto' }} />
          <p style={{ color: 'var(--white-muted)' }}>
            Have a question or ready to order? Our team is here to help.
          </p>
        </motion.div>
      </section>

      <div className="container">
        <div className="contact-layout">
          {/* Left - Info */}
          <div className="contact-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="contact-info-panel"
            >
              <h2 className="contact-panel-title">Contact Information</h2>
              <div className="gold-divider" style={{ marginBottom: 32 }} />

              <div className="contact-info-list">
                {CONTACT_INFO.map((item, i) => (
                  <ContactInfoItem key={item.title} item={item} index={i} />
                ))}
              </div>

              <div className="contact-social">
                <h4 className="contact-social-title">Follow Us</h4>
                <div className="social-links">
                  {[
                    { icon: <Globe size={18} />, label: 'Website' },
                    { icon: <Share2 size={18} />, label: 'Social Media' },
                    { icon: <MessageCircle size={18} />, label: 'WhatsApp Support' },
                  ].map(s => (
                    <a key={s.label} href="#" className="social-link" aria-label={s.label}>
                      {s.icon}
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right - Form */}
          <div className="contact-right">
            <motion.div
              className="contact-form-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="contact-panel-title">Send a Message</h2>
              <div className="gold-divider" style={{ marginBottom: 32 }} />

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    className="success-message"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <CheckCircle size={20} />
                    Message sent! We'll get back to you within 24 hours.
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="contact-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="contact-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Enter your phone"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="contact-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <input
                      type="text"
                      required
                      placeholder="How can we help?"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="contact-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your order or inquiry..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="contact-input contact-textarea"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={16} />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* FAQ */}
        <section className="faq-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-subtitle">Got Questions?</div>
            <h2 className="section-title gold-text">Frequently Asked Questions</h2>
            <div className="gold-divider" style={{ margin: '16px auto' }} />
          </motion.div>

          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                className={`faq-item ${faqOpen === i ? 'open' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  className="faq-question"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <motion.span
                    className="faq-toggle"
                    animate={{ rotate: faqOpen === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
