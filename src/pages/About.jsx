import React from 'react';
import { motion } from 'framer-motion';
import { Map, Shield, Users, Heart } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <motion.div 
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            About TaproBase
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Your trusted travel companion for discovering the wonder of Sri Lanka
          </motion.p>
        </div>
      </section>

      {/* Main Content Section (Replacing the empty dark space) */}
      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            
            <motion.div 
              className="about-text-box"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2>Our Mission</h2>
              <p>
                We built TaproBase to make exploring Sri Lanka's breathtaking landscapes, 
                ancient heritage, and vibrant culture easier than ever. Whether you are 
                looking for a quiet beach getaway or an adventurous hike through the hill country, 
                our platform connects you with the best guides, stays, and transport options.
              </p>
              <p>
                As a community-driven tourism management system, we believe in empowering local 
                businesses while giving travelers a seamless, unforgettable experience.
              </p>
            </motion.div>

            <motion.div 
              className="about-features"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="feature-item">
                <div className="feature-icon"><Map size={24} /></div>
                <div>
                  <h3>Interactive Planning</h3>
                  <p>Custom trip itineraries tailored to your schedule.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><Users size={24} /></div>
                <div>
                  <h3>Local Guides</h3>
                  <p>Connect directly with verified, knowledgeable locals.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><Shield size={24} /></div>
                <div>
                  <h3>Trusted Platform</h3>
                  <p>Secure, reliable, and community-reviewed services.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;