import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, User, Calendar } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore', icon: MapPin },
    { path: '/guides', label: 'Guides', icon: User },
    { path: '/accommodations', label: 'Stay' },
    { path: '/transportation', label: 'Transport' },
    { path: '/planner', label: 'Plan Trip', icon: Calendar }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="navbar-container container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <motion.div
              className="logo-wrapper"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/taprobane-logo.svg" alt="Taprobane Logo" className="logo-image" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="navbar-links hide-md">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                >
                  {link.icon && <link.icon size={18} />}
                  <span>{link.label}</span>
                  {isActive(link.path) && (
                    <motion.div
                      className="active-indicator"
                      layoutId="activeIndicator"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="navbar-actions hide-md">
            <Link to="/contact" className="btn btn-secondary btn-sm">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button hide-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-content">
              <ul className="mobile-nav-links">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                    >
                      {link.icon && <link.icon size={20} />}
                      <span>{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mobile-menu-actions">
                <Link to="/contact" className="btn btn-primary w-full">
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
