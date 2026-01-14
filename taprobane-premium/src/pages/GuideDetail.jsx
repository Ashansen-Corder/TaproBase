import React from 'react';
import { motion } from 'framer-motion';

const GuideDetail = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container section"
    >
      <h1>Guide Profile</h1>
      <p>Detailed guide profile coming soon...</p>
    </motion.div>
  );
};

export default GuideDetail;
