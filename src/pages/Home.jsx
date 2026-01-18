import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  MapPin, Users, Hotel, Train, Calendar, Star, 
  Shield, Heart, Globe, ArrowRight, Sparkles 
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const features = [
    {
      icon: MapPin,
      title: 'Interactive Exploration',
      description: 'Discover hidden gems, popular attractions, and authentic local experiences with our intelligent map',
      color: 'var(--color-emerald)'
    },
    {
      icon: Users,
      title: 'Verified Guides',
      description: 'Connect with certified local experts who bring Sri Lankan culture and history to life',
      color: 'var(--color-gold)'
    },
    {
      icon: Hotel,
      title: 'Premium Stays',
      description: 'From boutique hotels to beachfront villas, find your perfect accommodation',
      color: 'var(--color-ocean)'
    },
    {
      icon: Train,
      title: 'Seamless Transport',
      description: 'Navigate Sri Lanka effortlessly with all transport options at your fingertips',
      color: 'var(--color-coral)'
    }
  ];

  const stats = [
    { value: '500+', label: 'Attractions' },
    { value: '200+', label: 'Verified Guides' },
    { value: '1000+', label: 'Happy Travelers' },
    { value: '50+', label: 'Cities Covered' }
  ];

  const destinations = [
    {
      name: 'Sigiriya',
      category: 'Heritage',
      image: '🏛️',
      rating: 4.9
    },
    {
      name: 'Ella',
      category: 'Nature',
      image: '🏔️',
      rating: 4.8
    },
    {
      name: 'Galle',
      category: 'Historic',
      image: '🏰',
      rating: 4.7
    },
    {
      name: 'Unawatuna',
      category: 'Beach',
      image: '🏖️',
      rating: 4.8
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <motion.div 
          className="hero-content container"
          style={{ opacity, scale }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles size={16} />
            <span>Discover the Pearl of the Indian Ocean</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Your Journey Through
            <span className="text-gradient"> Sri Lanka </span>
            Starts Here
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            From ancient temples to pristine beaches, let thaprobase be your guide
            to unforgettable experiences in Sri Lanka's breathtaking landscapes.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link to="/explore" className="btn btn-primary btn-lg">
              Start Exploring
              <ArrowRight size={20} />
            </Link>
            <Link to="/guides" className="btn btn-secondary btn-lg">
              Find a Guide
            </Link>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="hero-decoration">
          <div className="decoration-circle decoration-1"></div>
          <div className="decoration-circle decoration-2"></div>
          <div className="decoration-circle decoration-3"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <div className="section-header">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Everything You Need in One Place
            </motion.h2>
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Experience Sri Lanka like never before with our comprehensive travel platform
            </motion.p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="destinations-section section">
        <div className="container">
          <div className="section-header">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Popular Destinations
            </motion.h2>
            <Link to="/explore" className="section-link">
              View All
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="destinations-grid">
            {destinations.map((dest, index) => (
              <DestinationCard key={index} destination={dest} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section section">
        <div className="container">
          <div className="why-us-content">
            <motion.div
              className="why-us-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Why Travelers Trust thaprobase</h2>
              <p className="section-subtitle">
                We're more than just a travel app—we're your trusted companion
                for exploring Sri Lanka safely and authentically.
              </p>

              <div className="benefits-list">
                <BenefitItem
                  icon={Shield}
                  title="Verified & Secure"
                  description="All guides and services are thoroughly vetted for your safety"
                />
                <BenefitItem
                  icon={Heart}
                  title="Local Expertise"
                  description="Connect with authentic local experiences and hidden gems"
                />
                <BenefitItem
                  icon={Globe}
                  title="24/7 Support"
                  description="Round-the-clock assistance wherever you are in Sri Lanka"
                />
              </div>

              <Link to="/about" className="btn btn-primary">
                Learn More About Us
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              className="why-us-visual"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="visual-card">
                <div className="visual-icon">✨</div>
                <h3>Premium Experience</h3>
                <p>Curated itineraries and personalized recommendations</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="cta-title">Ready to Start Your Adventure?</h2>
            <p className="cta-description">
              Join thousands of travelers discovering the magic of Sri Lanka
            </p>
            <div className="cta-actions">
              <Link to="/planner" className="btn btn-gold btn-lg">
                <Calendar size={20} />
                Plan Your Trip
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="feature-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="feature-icon" style={{ color: feature.color }}>
        <feature.icon size={32} />
      </div>
      <h3 className="feature-title">{feature.title}</h3>
      <p className="feature-description">{feature.description}</p>
    </motion.div>
  );
};

// Destination Card Component
const DestinationCard = ({ destination, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="destination-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <div className="destination-image">{destination.image}</div>
      <div className="destination-info">
        <div className="destination-header">
          <h3 className="destination-name">{destination.name}</h3>
          <div className="destination-rating">
            <Star size={14} fill="currentColor" />
            <span>{destination.rating}</span>
          </div>
        </div>
        <span className="destination-category">{destination.category}</span>
      </div>
    </motion.div>
  );
};

// Benefit Item Component
const BenefitItem = ({ icon: Icon, title, description }) => (
  <div className="benefit-item">
    <div className="benefit-icon">
      <Icon size={24} />
    </div>
    <div className="benefit-text">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </div>
);

export default Home;
