import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { label: 'Attractions', path: '/explore' },
      { label: 'Tour Guides', path: '/guides' },
      { label: 'Accommodations', path: '/accommodations' },
      { label: 'Transportation', path: '/transportation' }
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'Careers', path: '/careers' },
      { label: 'Blog', path: '/blog' }
    ],
    support: [
      { label: 'Help Center', path: '/help' },
      { label: 'Safety', path: '/safety' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Privacy Policy', path: '/privacy' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <span className="logo-icon">🌴</span>
                <span className="logo-text">Thaprobase</span>
              </Link>
              <p className="footer-tagline">
                Your complete travel companion for exploring the pearl of the Indian Ocean
              </p>
              
              <div className="footer-contact">
                <a href="mailto:hello@thaprobase.lk" className="contact-item">
                  <Mail size={18} />
                  <span>hello@thaprobase.lk</span>
                </a>
                <a href="tel:+94112345678" className="contact-item">
                  <Phone size={18} />
                  <span>+94 11 234 5678</span>
                </a>
                <div className="contact-item">
                  <MapPin size={18} />
                  <span>Colombo, Sri Lanka</span>
                </div>
              </div>
            </div>

            {/* Explore Links */}
            <div className="footer-column">
              <h4 className="footer-title">Explore</h4>
              <ul className="footer-links">
                {footerLinks.explore.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="footer-column">
              <h4 className="footer-title">Company</h4>
              <ul className="footer-links">
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="footer-column">
              <h4 className="footer-title">Support</h4>
              <ul className="footer-links">
                {footerLinks.support.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} thaprobase. All rights reserved.
            </p>
            
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
