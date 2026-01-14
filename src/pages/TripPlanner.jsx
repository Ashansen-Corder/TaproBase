import React from 'react';
import { motion } from 'framer-motion';

const TripPlanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container section"
    >
      <h1>Trip Planner</h1>
      <p>Create your custom itinerary - Coming soon...</p>
    </motion.div>
  );
};

export default TripPlanner;
