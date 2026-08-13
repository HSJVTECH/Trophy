import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPanel = () => {
  const { items, isOpen, setIsOpen, removeFromCart, updateQty, total, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          {/* Panel */}
          <motion.div
            className="cart-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            {/* Header */}
            <div className="cart-header">
              <h3>Your Cart {count > 0 && `(${count})`}</h3>
              <button className="cart-close" onClick={() => setIsOpen(false)}>
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="cart-items">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={48} strokeWidth={1} style={{ opacity: 0.3 }} />
                  <p>Your cart is empty</p>
                  <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>Add trophies to get started</p>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      className="cart-item"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      layout
                    >
                      <div className="cart-item-img-placeholder">
                        {item.emoji || '🏆'}
                      </div>
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                        <div className="cart-item-controls">
                          <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>
                            <Minus size={12} />
                          </button>
                          <span className="qty-value">{item.qty}</span>
                          <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button className="cart-remove" onClick={() => removeFromCart(item.id)}>
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total Amount</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Proceed to Order
                </button>
                <div style={{ textAlign: 'center', marginTop: 12, fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  Free delivery on orders above ₹5,000
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartPanel;
