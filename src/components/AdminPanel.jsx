import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Users, ShoppingBag, TrendingUp, CheckCircle, Clock, Truck } from 'lucide-react';

const mockOrders = [
  { id: '#TS-2401', customer: 'Rajesh Kumar', product: 'Champion Cup x2', amount: '₹4,998', status: 'delivered' },
  { id: '#TS-2402', customer: 'Priya Mehta', product: 'Elite Trophy x5', amount: '₹16,495', status: 'processing' },
  { id: '#TS-2403', customer: 'Amit Sharma', product: 'Victory Star x3', amount: '₹5,697', status: 'pending' },
  { id: '#TS-2404', customer: 'Sunita Patel', product: 'Scholar Award x10', amount: '₹15,990', status: 'delivered' },
  { id: '#TS-2405', customer: 'Vikram Singh', product: 'Golden Triumph x1', amount: '₹2,799', status: 'processing' },
];

const statusIcon = {
  delivered: <CheckCircle size={12} />,
  processing: <Truck size={12} />,
  pending: <Clock size={12} />,
};

const AdminPanel = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="admin-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="admin-overlay"
            onClick={onClose}
          />
          <motion.div
            className="admin-modal"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <h2>Admin Dashboard</h2>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                  Trophy Shop Management Portal
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: '1px solid rgba(201,168,76,0.3)',
                  color: 'var(--gold-primary)',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="admin-grid">
              {/* Stats */}
              <div className="admin-stat-row">
                {[
                  { icon: <ShoppingBag size={20} />, value: '₹2.4L', label: 'Monthly Revenue' },
                  { icon: <Package size={20} />, value: '127', label: 'Active Orders' },
                  { icon: <Users size={20} />, value: '1,248', label: 'Total Customers' },
                  { icon: <TrendingUp size={20} />, value: '+34%', label: 'Growth Rate' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="admin-stat"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div style={{ color: 'var(--gold-primary)', marginBottom: 8 }}>{stat.icon}</div>
                    <div className="admin-stat-value">{stat.value}</div>
                    <div className="admin-stat-label">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Orders Table */}
              <motion.div
                className="admin-orders"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="admin-orders-header">Recent Orders</div>
                {mockOrders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    className="admin-order-row"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.07 }}
                  >
                    <span style={{ color: 'var(--gold-primary)', fontFamily: 'var(--font-display)', fontSize: '0.8rem', minWidth: 90 }}>{order.id}</span>
                    <span style={{ flex: 1, color: 'var(--white-muted)', fontSize: '0.85rem' }}>{order.customer}</span>
                    <span style={{ flex: 1, color: 'var(--text-dim)', fontSize: '0.8rem' }}>{order.product}</span>
                    <span style={{ minWidth: 80, textAlign: 'right', color: 'var(--white-soft)', fontWeight: 600, fontSize: '0.85rem' }}>{order.amount}</span>
                    <span style={{ marginLeft: 16, minWidth: 100, display: 'flex', justifyContent: 'flex-end' }}>
                      <span className={`admin-order-status status-${order.status}`} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {statusIcon[order.status]}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
              >
                {['Add Product', 'View Inventory', 'Customer List', 'Reports'].map((action) => (
                  <button
                    key={action}
                    className="btn-outline"
                    style={{ padding: '10px 20px', fontSize: '0.75rem' }}
                  >
                    {action}
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminPanel;
