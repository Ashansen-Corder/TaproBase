import React from 'react';
import { motion } from 'framer-motion';

const Transportation = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container section"
    >
      <h1>Transportation</h1>
      <p>Transport options coming soon...</p>
    </motion.div>
  );
};

export default Transportation;
