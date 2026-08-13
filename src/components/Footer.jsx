import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Globe, Share2, MessageCircle, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Gold line top */}
      <div className="footer-gold-line" />

      {/* Main content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-icon">🏆</span>
                <div>
                  <div className="footer-logo-text">TROPHY SHOP</div>
                  <div className="footer-logo-sub">Premium Awards Since 2009</div>
                </div>
              </div>
              <p className="footer-desc">
                Crafting excellence in every trophy. From sports victories to corporate milestones, 
                we create awards that inspire pride and honor achievement.
              </p>
              <div className="footer-socials">
                {[
                  { icon: <Globe size={18} />, label: 'Website', href: '#' },
                  { icon: <Share2 size={18} />, label: 'Share', href: '#' },
                  { icon: <MessageCircle size={18} />, label: 'Chat', href: '#' },
                ].map(s => (
                  <a key={s.label} href={s.href} className="social-btn" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4 className="footer-heading">Quick Links</h4>
              <div className="footer-divider" />
              {[
                { to: '/', label: 'Home' },
                { to: '/categories', label: 'Categories' },
                { to: '/customization', label: 'Customization' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact Us' },
              ].map(link => (
                <NavLink key={link.to} to={link.to} className="footer-link">
                  <ArrowRight size={12} />
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Categories */}
            <div className="footer-col">
              <h4 className="footer-heading">Our Products</h4>
              <div className="footer-divider" />
              {[
                'Sports Trophies',
                'Academic Awards',
                'Corporate Awards',
                'Custom Trophies',
                'Medals & Plaques',
                'Special Awards',
              ].map(cat => (
                <NavLink key={cat} to="/categories" className="footer-link">
                  <ArrowRight size={12} />
                  {cat}
                </NavLink>
              ))}
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4 className="footer-heading">Get In Touch</h4>
              <div className="footer-divider" />
              <div className="footer-contact-item">
                <MapPin size={16} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
                <span>123 Victory Lane, Success City, Maharashtra - 400001</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
                <span>+91 98765 43210</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
                <span>info@trophyshop.com</span>
              </div>
              <div className="footer-hours">
                <div className="footer-hours-title">Working Hours</div>
                <div>Mon – Sat: 10:00 AM – 7:00 PM</div>
                <div style={{ color: 'var(--text-dim)' }}>Sunday: Closed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <span>© 2024 Trophy Shop. All rights reserved.</span>
            <div className="footer-bottom-badges">
              <span className="footer-badge">🏅 Premium Quality</span>
              <span className="footer-badge">⚡ Fast Delivery</span>
              <span className="footer-badge">✨ Custom Designs</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
