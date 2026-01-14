import React from 'react';
import { motion } from 'framer-motion';

const Accommodations = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container section"
    >
      <h1>Accommodations</h1>
      <p>Hotel listings coming soon...</p>
    </motion.div>
  );
};

export default Accommodations;
