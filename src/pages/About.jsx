import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Heart, Users, Target, Zap, Star } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { statsData } from '../data/products';
import './About.css';

const TEAM = [
  { name: 'Arjun Kapoor', role: 'Founder & CEO', emoji: '👨‍💼', exp: '15 yrs' },
  { name: 'Priya Singh', role: 'Head of Design', emoji: '👩‍🎨', exp: '10 yrs' },
  { name: 'Ravi Kumar', role: 'Master Craftsman', emoji: '🔨', exp: '20 yrs' },
  { name: 'Ananya Mehta', role: 'Customer Relations', emoji: '🤝', exp: '8 yrs' },
];

const VALUES = [
  { icon: <Award size={24} />, title: 'Excellence', desc: 'Every trophy we craft is made with the finest materials and precision craftsmanship.' },
  { icon: <Heart size={24} />, title: 'Passion', desc: 'We pour our heart into every piece, ensuring each award tells a story of achievement.' },
  { icon: <Users size={24} />, title: 'Trust', desc: 'Over 10,000 customers trust us to celebrate their most important moments.' },
  { icon: <Target size={24} />, title: 'Precision', desc: 'Attention to every detail ensures your trophy is perfect in every way.' },
  { icon: <Zap size={24} />, title: 'Innovation', desc: 'We constantly push boundaries with new designs and materials.' },
  { icon: <Star size={24} />, title: 'Quality', desc: '100% satisfaction guarantee on every product we deliver.' },
];

const MILESTONES = [
  { year: '2009', title: 'Founded', desc: 'Trophy Shop was born with a vision to craft premium awards' },
  { year: '2012', title: 'First Major Contract', desc: 'Supplied trophies for the State Sports Championship' },
  { year: '2015', title: '1000+ Customers', desc: 'Reached our first milestone of 1,000 happy customers' },
  { year: '2018', title: 'Custom Unit Launched', desc: 'Introduced our fully custom trophy design service' },
  { year: '2021', title: 'Online Store', desc: 'Expanded nationally with our e-commerce platform' },
  { year: '2024', title: '10K+ Champions', desc: 'Now proudly serving over 10,000 customers pan-India' },
];

const ValueCard = ({ item, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="value-item"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -4 }}
    >
      <div className="value-icon">{item.icon}</div>
      <h3 className="value-title">{item.title}</h3>
      <p className="value-desc">{item.desc}</p>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="page-wrapper about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-glow" />
        <div className="container">
          <div className="about-hero-inner">
            <motion.div
              className="about-hero-text"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div className="section-subtitle">Our Story</div>
              <h1 className="section-title">
                ABOUT<br />
                <span className="gold-text">US</span>
              </h1>
              <div className="gold-divider" style={{ margin: '20px 0' }} />
              <p className="about-tagline">Passion. Precision. Perfection.</p>
              <p className="about-text">
                At Trophy Shop, we believe every achievement deserves to be celebrated. 
                With years of craftsmanship and attention to detail, we create trophies 
                that inspire pride and honor excellence.
              </p>
              <p className="about-text">
                From sports victories to corporate milestones, our trophies stand as 
                a symbol of hard work, dedication, and success.
              </p>
              <NavLink to="/contact" className="btn-primary" style={{ marginTop: 32 }}>
                Our Story →
              </NavLink>
            </motion.div>

            <motion.div
              className="about-hero-visual"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <div className="about-trophies">
                {['🏆', '🥇', '🏅'].map((emoji, i) => (
                  <motion.div
                    key={i}
                    className={`about-trophy-item about-trophy-${i + 1}`}
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3 + i * 0.5,
                      ease: 'easeInOut',
                      delay: i * 0.4,
                    }}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container">
          <div className="about-stats-row">
            {statsData.map((stat, i) => (
              <motion.div
                key={i}
                className="about-stat"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="about-stat-icon">
                  {['🏆', '😊', '📦', '✅'][i]}
                </div>
                <div className="about-stat-value">{stat.value}</div>
                <div className="about-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-subtitle">What Drives Us</div>
            <h2 className="section-title gold-text">Our Core Values</h2>
            <div className="gold-divider" style={{ margin: '16px auto' }} />
          </motion.div>

          <div className="values-list">
            {VALUES.map((value, i) => (
              <ValueCard key={value.title} item={value} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-subtitle">Our Journey</div>
            <h2 className="section-title gold-text">Milestones</h2>
            <div className="gold-divider" style={{ margin: '16px auto' }} />
          </motion.div>

          <div className="timeline">
            <div className="timeline-line" />
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7 }}
              >
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-year">{m.year}</div>
                  <h3 className="timeline-title">{m.title}</h3>
                  <p className="timeline-desc">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-subtitle">The People Behind</div>
            <h2 className="section-title gold-text">Our Team</h2>
            <div className="gold-divider" style={{ margin: '16px auto' }} />
          </motion.div>

          <div className="team-list">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                className="team-item"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6 }}
              >
                <div className="team-avatar">{member.emoji}</div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <div className="team-role">{member.role}</div>
                  <div className="team-exp">{member.exp} experience</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
