import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Routes
import authRoutes from './routes/auth.routes.js';
import accommodationRoutes from './routes/accommodations.routes.js';
import attractionRoutes from './routes/attractions.routes.js';
import guideRoutes from './routes/guides.routes.js';
import bookingRoutes from './routes/bookings.routes.js';
import tripRoutes from './routes/trips.routes.js';
import contactRoutes from './routes/contact.routes.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
  // Updated fallback to 8080 to match our Docker frontend container
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/attractions', attractionRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/contact', contactRoutes);

// Root route added specifically for the Docker Healthcheck
app.get('/', (req, res) => {
  res.status(200).send('TaproBase API is running');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Taprobane Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    path: req.path,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  console.warn(`[404] Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method,
    availableEndpoints: [
      '/api/auth',
      '/api/accommodations',
      '/api/attractions',
      '/api/guides',
      '/api/bookings',
      '/api/trips',
      '/api/contact',
      '/api/health'
    ]
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    // This perfectly catches the MONGODB_URI from docker-compose!
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taprobane');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});

export default app;