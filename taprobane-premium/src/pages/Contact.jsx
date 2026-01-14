import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container section"
    >
      <h1>Contact Us</h1>
      <p>Get in touch with our team</p>
    </motion.div>
  );
};

export default Contact;
