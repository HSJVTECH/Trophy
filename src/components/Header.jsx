import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Menu, X, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Header.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/categories', label: 'Categories' },
  { path: '/customization', label: 'Customization' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact' },
];

const Header = ({ onAdminClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { count, setIsOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        {/* Logo */}
        <NavLink to="/" className="header-logo">
          <div className="logo-icon">🏆</div>
          <div className="logo-text">
            <span className="logo-main">TROPHY</span>
            <span className="logo-sub">SHOP</span>
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="header-nav">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
              <span className="nav-underline" />
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <button className="icon-btn" id="search-toggle" onClick={() => setSearchOpen(s => !s)}>
            <Search size={18} />
          </button>

          <button
            className="icon-btn cart-btn"
            id="cart-toggle"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingCart size={18} />
            {count > 0 && (
              <motion.span
                className="cart-badge"
                key={count}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              >
                {count}
              </motion.span>
            )}
          </button>

          <button
            className="admin-btn"
            id="admin-panel-toggle"
            onClick={onAdminClick}
          >
            <Shield size={14} />
            Admin
          </button>

          <button
            className="icon-btn mobile-menu-btn"
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(s => !s)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="search-bar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="search-inner">
              <Search size={18} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search trophies, awards, medals..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                  <X size={16} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{ padding: '16px 24px', borderTop: '1px solid rgba(201,168,76,0.1)' }}
            >
              <button
                className="admin-btn"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => { setMobileOpen(false); onAdminClick(); }}
              >
                <Shield size={14} />
                Admin Panel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
