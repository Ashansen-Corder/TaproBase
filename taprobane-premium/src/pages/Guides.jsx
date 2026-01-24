import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, MapPin, Globe, Filter, X } from 'lucide-react';
import { guides, guideSpecialties, guideLanguages } from '../data/guides';
import './Guides.css';

const Guides = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Filter guides
  const filteredGuides = guides.filter(guide => {
    const matchSpecialty = selectedSpecialty === 'all' || guide.specialties.includes(selectedSpecialty);
    const matchLanguage = selectedLanguage === 'all' || guide.languages.includes(selectedLanguage);
    return matchSpecialty && matchLanguage;
  });

  // Sort guides
  const sortedGuides = [...filteredGuides].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviews - a.reviews;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="guides-page"
    >
      {/* Header */}
      <section className="guides-header">
        <div className="container">
          <motion.div
            className="header-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="guides-title">
              <Users size={40} style={{ marginRight: '1rem' }} />
              Verified Tour Guides
            </h1>
            <p className="guides-subtitle">
              Connect with experienced, certified local experts who bring Sri Lankan culture and traditions to life
            </p>
            <div className="guides-stats">
              <div className="stat">
                <span className="stat-value">{guides.length}</span>
                <span className="stat-label">Expert Guides</span>
              </div>
              <div className="stat">
                <span className="stat-value">{new Set(guides.flatMap(g => g.languages)).size}</span>
                <span className="stat-label">Languages</span>
              </div>
              <div className="stat">
                <span className="stat-value">{new Set(guides.flatMap(g => g.specialties)).size}</span>
                <span className="stat-label">Specialties</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="guides-filters">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="filters-wrapper"
          >
            {/* Specialty Filter */}
            <div className="filter-group">
              <label className="filter-title">Specialty</label>
              <div className="filter-options">
                <motion.button
                  className={`filter-option ${selectedSpecialty === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedSpecialty('all')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  All
                </motion.button>
                {guideSpecialties.map((specialty) => (
                  <motion.button
                    key={specialty}
                    className={`filter-option ${selectedSpecialty === specialty ? 'active' : ''}`}
                    onClick={() => setSelectedSpecialty(specialty)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {specialty}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Language Filter */}
            <div className="filter-group">
              <label className="filter-title">Language</label>
              <div className="filter-options">
                <motion.button
                  className={`filter-option ${selectedLanguage === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedLanguage('all')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  All
                </motion.button>
                {guideLanguages.map((language) => (
                  <motion.button
                    key={language}
                    className={`filter-option ${selectedLanguage === language ? 'active' : ''}`}
                    onClick={() => setSelectedLanguage(language)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {language}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="filter-group">
              <label className="filter-title">Sort By</label>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="guides-content">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="guides-info"
          >
            <h2>
              Available Guides
              <span className="count-badge">{sortedGuides.length}</span>
            </h2>
            {sortedGuides.length === 0 && (
              <p className="no-results">No guides found matching your filters. Try adjusting your search.</p>
            )}
          </motion.div>

          <div className="guides-grid">
            {sortedGuides.map((guide, index) => (
              <GuideCard key={guide.id} guide={guide} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="guides-info-section">
        <div className="container">
          <motion.div
            className="info-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="info-card">
              <div className="info-icon">✅</div>
              <h3>Verified & Certified</h3>
              <p>All guides are thoroughly vetted and hold proper certifications</p>
            </div>
            <div className="info-card">
              <div className="info-icon">⭐</div>
              <h3>Highly Rated</h3>
              <p>Average rating above 4.7 stars with hundreds of reviews</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🌍</div>
              <h3>Multilingual</h3>
              <p>Guides speak multiple languages including English, French, Spanish and more</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💬</div>
              <h3>Book & Connect</h3>
              <p>Click on any guide to see their full profile and contact information</p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

// Guide Card Component
const GuideCard = ({ guide, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="guide-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Verified Badge */}
      {guide.verified && (
        <div className="verified-badge">
          <span title="Verified Guide">✓ Verified</span>
        </div>
      )}

      {/* Avatar Placeholder */}
      <div className="guide-avatar">
        <div className="avatar-placeholder">
          {guide.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>

      {/* Guide Info */}
      <div className="guide-content">
        <h3 className="guide-name">{guide.name}</h3>
        <p className="guide-bio">{guide.bio}</p>

        {/* Rating */}
        <div className="guide-rating">
          <div className="rating-stars">
            <span className="stars">⭐ {guide.rating}</span>
            <span className="reviews">({guide.reviews} reviews)</span>
          </div>
        </div>

        {/* Experience & Location */}
        <div className="guide-meta">
          <span className="meta-item">📅 {guide.experience}</span>
          <span className="meta-item">📍 {guide.location}</span>
        </div>

        {/* Specialties */}
        <div className="specialties">
          {guide.specialties.slice(0, 3).map((specialty) => (
            <span key={specialty} className="specialty-tag">
              {specialty}
            </span>
          ))}
          {guide.specialties.length > 3 && (
            <span className="specialty-tag more">+{guide.specialties.length - 3}</span>
          )}
        </div>

        {/* Languages */}
        <div className="languages">
          <Globe size={16} />
          <span>{guide.languages.join(', ')}</span>
        </div>

        {/* Rates */}
        <div className="rates">
          <div className="rate">
            <span className="rate-label">Hourly</span>
            <span className="rate-value">{guide.hourlyRate}</span>
          </div>
          <div className="rate">
            <span className="rate-label">Daily</span>
            <span className="rate-value">{guide.dailyRate}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="highlights">
          {guide.highlights.map((highlight, idx) => (
            <div key={idx} className="highlight-item">
              <span>✨ {highlight}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          className="contact-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Contact Guide</span>
          <span className="arrow">→</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Guides;
