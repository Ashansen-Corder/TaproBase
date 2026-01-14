import React from 'react';
import { motion } from 'framer-motion';

const Explore = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container section"
    >
      <h1>Explore Sri Lanka</h1>
      <p>Interactive map coming soon...</p>
      <p style={{ marginTop: '2rem', padding: '2rem', background: '#f5f5f5', borderRadius: '12px' }}>
        <strong>To implement:</strong><br />
        1. Install Leaflet: npm install leaflet react-leaflet<br />
        2. Import map component<br />
        3. Add markers from attractions data<br />
        4. Add filtering by category
      </p>
    </motion.div>
  );
};

export default Explore;
