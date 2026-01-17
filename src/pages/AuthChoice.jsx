import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, UserCheck } from 'lucide-react';
import './AuthChoice.css';

const AuthChoice = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="auth-choice-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="auth-choice-container">
        <motion.div className="auth-choice-header" variants={itemVariants}>
          <h1>Welcome to thaprobase</h1>
          <p>Choose how you want to explore Sri Lanka</p>
        </motion.div>

        <motion.div className="auth-choice-cards" variants={itemVariants}>
          {/* Tourist Card */}
          <motion.div
            className="auth-choice-card tourist-card"
            whileHover={{ scale: 1.05, y: -8 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="card-icon tourist-icon">
              <Users size={48} />
            </div>
            <h2>Tourist</h2>
            <p>Discover attractions, book guides, and find accommodations</p>
            <div className="card-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/tourist-signup')}
              >
                Sign Up
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => navigate('/tourist-login')}
              >
                Sign In
              </button>
            </div>
          </motion.div>

          {/* Guide Card */}
          <motion.div
            className="auth-choice-card guide-card"
            whileHover={{ scale: 1.05, y: -8 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="card-icon guide-icon">
              <UserCheck size={48} />
            </div>
            <h2>Tour Guide</h2>
            <p>Offer your expertise, connect with tourists, and grow your business</p>
            <div className="card-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/guide-signup')}
              >
                Sign Up
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => navigate('/guide-login')}
              >
                Sign In
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="auth-choice-footer" variants={itemVariants}>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AuthChoice;
