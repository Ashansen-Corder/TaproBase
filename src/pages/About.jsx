import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container section"
    >
      <h1>About thaprobase</h1>
      <p>Your trusted travel companion for Sri Lanka</p>
    </motion.div>
  );
};

export default About;
