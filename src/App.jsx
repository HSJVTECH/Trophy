import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartPanel from './components/CartPanel';
import AdminPanel from './components/AdminPanel';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Customization from './pages/Customization';
import About from './pages/About';
import Contact from './pages/Contact';

/* ── Page transition wrapper ── */
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

/* ── Animated routes ── */
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/categories" element={<PageWrapper><Categories /></PageWrapper>} />
        <Route path="/customization" element={<PageWrapper><Customization /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

/* ── Loading Screen ── */
const LoadingScreen = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="loading-logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        🏆 TROPHY SHOP
      </motion.div>
      <motion.div
        className="loading-bar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          marginTop: 24,
          fontFamily: 'var(--font-display)',
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--gold-muted)',
        }}
      >
        Premium Awards Since 2009
      </motion.p>
    </motion.div>
  );
};

/* ── Main App ── */
const AppInner = () => {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <>
      <Header onAdminClick={() => setAdminOpen(true)} />
      <AnimatedRoutes />
      <Footer />
      <CartPanel />
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <CartProvider>
      <Router>
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen key="loading" onDone={() => setLoading(false)} />
          ) : (
            <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <AppInner />
            </motion.div>
          )}
        </AnimatePresence>
      </Router>
    </CartProvider>
  );
};

export default App;
