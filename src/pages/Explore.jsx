import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Filter, X } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { attractions, categories } from '../data/attractions';
import './Explore.css';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Main cities/locations in Sri Lanka (Emojis removed)
const mainLocations = [
  { name: 'Colombo', lat: 6.9271, lng: 80.7789 },
  { name: 'Kandy', lat: 7.2906, lng: 80.6337 },
  { name: 'Galle', lat: 6.0328, lng: 80.2168 },
  { name: 'Ella', lat: 6.8667, lng: 81.0467 },
  { name: 'Mirissa', lat: 5.9495, lng: 80.4761 },
  { name: 'Sigiriya', lat: 7.9570, lng: 80.7603 }
];

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [mapCenter, setMapCenter] = useState([7.8731, 80.7718]);
  const [mapZoom, setMapZoom] = useState(8);

  // Filter attractions by category
  const filteredAttractions = selectedCategory === 'all'
    ? attractions
    : attractions.filter(attr => attr.category === selectedCategory);

  // Handle location selection
  const handleLocationSelect = (location) => {
    setMapCenter([location.lat, location.lng]);
    setMapZoom(10);
  };

  // Custom marker icon with brand colors (Handles Images and Emojis)
  const createCustomIcon = (category) => {
    const categoryData = filteredAttractions.find(a => a.category === category);
    const imageSrc = categoryData?.image;
    
    // Check if it's a file path or an emoji
    const iconContent = imageSrc?.includes('/') 
      ? `<img src="${imageSrc}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />`
      : (imageSrc || '📍');

    return L.divIcon({
      className: 'custom-marker',
      html: `<div class="marker-icon marker-${category}" style="background-color: #003d82; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); overflow: hidden;">${iconContent}</div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="explore-page"
    >
      {/* Header */}
      <section className="explore-header">
        <div className="container">
          <motion.div
            className="header-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="explore-title">
              <MapPin size={40} style={{ marginRight: '1rem' }} />
              Explore Sri Lanka's Hidden Gems
            </h1>
            <p className="explore-subtitle">
              Discover attractions, beaches, heritage sites, and adventure spots across the island
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="explore-filters">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="filter-section"
          >
            <div className="filter-label">
              <Filter size={20} />
              <span>Filter by Category:</span>
            </div>
            <div className="filter-buttons">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="filter-icon">{category.icon}</span>
                  <span>{category.label}</span>
                  <span className="count">
                    {category.id === 'all'
                      ? attractions.length
                      : attractions.filter(a => a.category === category.id).length}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Locations */}
      <section className="explore-locations">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="locations-section"
          >
            <div className="locations-label">
              <MapPin size={20} />
              <span>Quick Locations:</span>
            </div>
            <div className="locations-buttons">
              {mainLocations.map((location) => (
                <motion.button
                  key={location.name}
                  className="location-btn"
                  onClick={() => handleLocationSelect(location)}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={`Jump to ${location.name}`}
                >
                  <span className="location-name">{location.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map and List Container */}
      <section className="explore-content">
        <div className="container explore-container">
          {/* Map */}
          <motion.div
            className="map-section"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              scrollWheelZoom={true}
              className="map-container"
              key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredAttractions.map((attraction) => (
                <Marker
                  key={attraction.id}
                  position={[attraction.lat, attraction.lng]}
                  icon={L.icon({
                    iconUrl: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#003d82" width="40" height="40"><path d="M12 0C6.48 0 2 4.48 2 10c0 5.52 8 13 10 15.5 2-2.5 10-9.98 10-15.5C22 4.48 17.52 0 12 0zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>`)}`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40]
                  })}
                  eventHandlers={{
                    click: () => setSelectedAttraction(attraction)
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="popup-content">
                      <h3>{attraction.name}</h3>
                      <p>{attraction.description}</p>
                      <div className="popup-details">
                        <span className="badge">⏱️ {attraction.duration}</span>
                        <span className="badge">💵 {attraction.entrance_fee}</span>
                      </div>
                      <div className="popup-rating">
                        <span className="star">⭐ {attraction.rating}</span>
                        <span className="reviews">({attraction.reviews} reviews)</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </motion.div>

          {/* Attractions List */}
          <motion.div
            className="attractions-list-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="list-header">
              <h2>
                Attractions
                <span className="count-badge">{filteredAttractions.length}</span>
              </h2>
              <p className="list-description">
                {selectedCategory === 'all'
                  ? 'All attractions in Sri Lanka'
                  : categories.find(c => c.id === selectedCategory)?.label}
              </p>
            </div>

            <div className="attractions-items">
              {filteredAttractions.map((attraction, index) => (
                <motion.div
                  key={attraction.id}
                  className={`attraction-item ${selectedAttraction?.id === attraction.id ? 'selected' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedAttraction(attraction)}
                  whileHover={{ x: 4 }}
                >
                  {/* --- FIXED IMAGE SECTION --- */}
                  <div className="item-icon" style={{ 
                    width: '90px',      // Force strict width
                    height: '90px',     // Force strict height
                    flexShrink: 0,      // Prevent the flexbox from squishing it
                    padding: 0, 
                    overflow: 'hidden', 
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f0f4f8'
                  }}>
                    {attraction.image?.includes('/') ? (
                      <img 
                        src={attraction.image} 
                        alt={attraction.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <span style={{ fontSize: '2.5rem' }}>{attraction.image || '📍'}</span>
                    )}
                  </div>
                  {/* ----------------------------- */}

                  <div className="item-content">
                    <h4>{attraction.name}</h4>
                    <p className="item-desc">{attraction.description}</p>
                    <div className="item-meta">
                      <span className="category-tag">{attraction.category}</span>
                      <span className="rating">⭐ {attraction.rating}</span>
                    </div>
                    <div className="item-info">
                      <span>⏱️ {attraction.duration}</span>
                      <span>💵 {attraction.entrance_fee}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredAttractions.length === 0 && (
              <motion.div
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p>No attractions found in this category</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Info Box */}
      <section className="explore-info">
        <div className="container">
          <motion.div
            className="info-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="info-card">
              <div className="info-icon"></div>
              <h3>Interactive Map</h3>
              <p>Click on markers to see attraction details and ratings</p>
            </div>
            <div className="info-card">
              <div className="info-icon"></div>
              <h3>Smart Filtering</h3>
              <p>Filter attractions by category to find what interests you</p>
            </div>
            <div className="info-card">
              <div className="info-icon"></div>
              <h3>Location Data</h3>
              <p>Get exact coordinates and practical information for each spot</p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Explore;