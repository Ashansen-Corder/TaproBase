import React from 'react';
import { motion } from 'framer-motion';

const Guides = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container section"
    >
      <h1>Tour Guides</h1>
      <p>Verified guides directory coming soon...</p>
    </motion.div>
  );
};

export default Guides;
