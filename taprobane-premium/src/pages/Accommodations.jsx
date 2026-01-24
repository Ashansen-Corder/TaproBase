import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hotel, MapPin, Star, DollarSign, Filter, Home } from 'lucide-react';
import { accommodations, accommodationTypes, priceRanges } from '../data/accommodations';
import './Accommodations.css';

const Accommodations = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);

  // Filter accommodations
  const filteredAccommodations = accommodations.filter(accom => {
    const matchType = selectedType === 'all' || accom.type === selectedType;
    const matchPrice = selectedPrice === 'all' || 
      (selectedPrice === 'budget' && parseFloat(accom.pricePerNight.split('-')[0].slice(1)) <= 75) ||
      (selectedPrice === 'mid' && parseFloat(accom.pricePerNight.split('-')[0].slice(1)) >= 75 && parseFloat(accom.pricePerNight.split('-')[0].slice(1)) < 150) ||
      (selectedPrice === 'luxury' && parseFloat(accom.pricePerNight.split('-')[0].slice(1)) >= 150);
    return matchType && matchPrice;
  });

  // Sort accommodations
  const sortedAccommodations = [...filteredAccommodations].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviews - a.reviews;
    if (sortBy === 'price') return parseFloat(a.pricePerNight.split('-')[0].slice(1)) - parseFloat(b.pricePerNight.split('-')[0].slice(1));
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="accommodations-page"
    >
      {/* Header */}
      <section className="accommodations-header">
        <div className="container">
          <motion.div
            className="header-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="accommodations-title">
              <Hotel size={40} style={{ marginRight: '1rem' }} />
              Stay in Sri Lanka
            </h1>
            <p className="accommodations-subtitle">
              Discover luxury resorts, beachfront cabanas, mountain lodges, and heritage hotels across the island
            </p>
            <div className="accommodations-stats">
              <div className="stat">
                <span className="stat-value">{accommodations.length}</span>
                <span className="stat-label">Properties</span>
              </div>
              <div className="stat">
                <span className="stat-value">4.7</span>
                <span className="stat-label">Avg Rating</span>
              </div>
              <div className="stat">
                <span className="stat-value">$50-200</span>
                <span className="stat-label">Price Range</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="accommodations-filters">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="filters-wrapper"
          >
            {/* Type Filter */}
            <div className="filter-group">
              <label className="filter-title">Accommodation Type</label>
              <div className="filter-options">
                {accommodationTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    className={`filter-option ${selectedType === type.id ? 'active' : ''}`}
                    onClick={() => setSelectedType(type.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={type.label}
                  >
                    <span>{type.icon}</span>
                    <span className="hide-md">{type.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <label className="filter-title">Price Per Night</label>
              <div className="filter-options">
                {priceRanges.map((range) => (
                  <motion.button
                    key={range.id}
                    className={`filter-option ${selectedPrice === range.id ? 'active' : ''}`}
                    onClick={() => setSelectedPrice(range.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {range.label}
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
                <option value="price">Price: Low to High</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Accommodations Content */}
      <section className="accommodations-content">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="accommodations-info"
          >
            <h2>
              Available Accommodations
              <span className="count-badge">{sortedAccommodations.length}</span>
            </h2>
            {sortedAccommodations.length === 0 && (
              <p className="no-results">No accommodations found matching your filters. Try adjusting your search.</p>
            )}
          </motion.div>

          <div className="accommodations-grid">
            {sortedAccommodations.map((accom, index) => (
              <AccommodationCard 
                key={accom.id} 
                accommodation={accom} 
                index={index}
                isSelected={selectedAccommodation?.id === accom.id}
                onSelect={setSelectedAccommodation}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="accommodations-info-section">
        <div className="container">
          <motion.div
            className="info-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="info-card">
              <div className="info-icon">🏖️</div>
              <h3>Beachfront Cabanas</h3>
              <p>Enjoy stunning ocean views, water sports, and direct beach access</p>
            </div>
            <div className="info-card">
              <div className="info-icon">⛰️</div>
              <h3>Mountain Lodges</h3>
              <p>Experience tea plantations, hiking trails, and scenic landscapes</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🏰</div>
              <h3>Heritage Hotels</h3>
              <p>Stay in historic properties with traditional architecture and charm</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🦁</div>
              <h3>Safari Lodges</h3>
              <p>Perfect for wildlife enthusiasts with expert guides and tours</p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

// Accommodation Card Component
const AccommodationCard = ({ accommodation, index, isSelected, onSelect }) => {
  return (
    <motion.div
      className={`accommodation-card ${isSelected ? 'selected' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -8 }}
      onClick={() => onSelect(accommodation)}
    >
      {/* Image */}
      <div className="accom-image">
        <span className="accom-emoji">{accommodation.image}</span>
        <div className="type-badge">{accommodation.type}</div>
      </div>

      {/* Content */}
      <div className="accom-content">
        <h3 className="accom-name">{accommodation.name}</h3>
        <p className="accom-desc">{accommodation.description}</p>

        {/* Rating */}
        <div className="accom-rating">
          <span className="stars">⭐ {accommodation.rating}</span>
          <span className="reviews">({accommodation.reviews})</span>
        </div>

        {/* Location */}
        <div className="accom-location">
          <MapPin size={16} />
          <span>{accommodation.location}</span>
        </div>

        {/* Price */}
        <div className="accom-price">
          <DollarSign size={16} />
          <span className="price-text">{accommodation.pricePerNight} / night</span>
        </div>

        {/* Amenities */}
        <div className="amenities">
          {accommodation.amenities.slice(0, 4).map((amenity, idx) => (
            <span key={idx} className="amenity-tag">{amenity}</span>
          ))}
          {accommodation.amenities.length > 4 && (
            <span className="amenity-tag more">+{accommodation.amenities.length - 4}</span>
          )}
        </div>

        {/* Room Types */}
        <div className="room-types">
          <span className="room-label">Rooms:</span>
          <span className="rooms-list">{accommodation.roomTypes.join(', ')}</span>
        </div>

        {/* Check-in/out */}
        <div className="check-times">
          <span>Check-in: {accommodation.checkin}</span>
          <span>Check-out: {accommodation.checkout}</span>
        </div>

        {/* CTA */}
        <motion.button
          className="book-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>View Details & Book</span>
          <span className="arrow">→</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Accommodations;
