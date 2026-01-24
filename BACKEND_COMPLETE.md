# Taprobane Premium Tourism Platform - Complete Backend Setup

## 🎯 Project Overview

**Taprobane** is a premium Sri Lanka tourism web application featuring:
- 🏨 Accommodation booking system
- 🗺️ Interactive attraction discovery
- 👨‍🏫 Professional guide matching
- 📅 Trip planning & itinerary management
- 🎫 Booking and reservation system

This repository contains both **Frontend** (React/Vite) and **Backend** (Node.js/Express/MongoDB).

## 📁 Backend Structure

The backend is a RESTful API built with:
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** express-validator
- **Password Hashing:** bcryptjs

### Complete Backend File Structure

```
backend/
├── config/
│   └── database.js                    # MongoDB connection setup
├── controllers/                       # Business logic layer
│   ├── auth.controller.js            # Authentication logic (register, login, password)
│   ├── accommodations.controller.js  # Accommodation CRUD operations
│   ├── attractions.controller.js     # Attraction CRUD operations
│   ├── guides.controller.js          # Guide management & booking
│   ├── bookings.controller.js        # Booking management
│   ├── trips.controller.js           # Trip planning & management
│   └── contact.controller.js         # Contact form submissions
├── models/                            # Database schemas
│   ├── User.model.js                 # User schema (Tourist, Guide, Admin)
│   ├── Accommodation.model.js        # Hotels, guesthouses, resorts
│   ├── Attraction.model.js           # Tourist attractions, landmarks
│   ├── Booking.model.js              # Reservation records
│   ├── Trip.model.js                 # User-created trip itineraries
│   └── Contact.model.js              # Contact form submissions
├── routes/                            # API endpoint definitions
│   ├── auth.routes.js                # /api/auth
│   ├── accommodations.routes.js      # /api/accommodations
│   ├── attractions.routes.js         # /api/attractions
│   ├── guides.routes.js              # /api/guides
│   ├── bookings.routes.js            # /api/bookings
│   ├── trips.routes.js               # /api/trips
│   └── contact.routes.js             # /api/contact
├── middleware/
│   └── auth.middleware.js            # JWT token validation & authorization
├── utils/
│   ├── asyncHandler.js               # Async error catching wrapper
│   └── ErrorResponse.js              # Standardized error response class
├── scripts/
│   └── seedDatabase.js               # Sample data insertion script
├── server.js                         # Express app setup & middleware config
├── package.json                      # Dependencies & scripts
├── .env                              # Environment variables (not in git)
├── .env.example                      # Template for .env
├── .gitignore                        # Git ignore rules
├── BACKEND_SETUP.md                  # Setup & API documentation
└── verify-backend.ps1                # Verification script (Windows)
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ 
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Configure MongoDB in .env
# For local: MONGODB_URI=mongodb://localhost:27017/taprobane
# For Atlas: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/taprobane

# 5. Start development server
npm run dev
```

### Verify Backend
```bash
# Windows PowerShell
.\verify-backend.ps1

# Linux/Mac
bash verify-backend.sh
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Taprobane Backend API is running",
  "timestamp": "2026-01-24T12:00:00.000Z"
}
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
```
POST   /auth/register/tourist      Register as tourist
POST   /auth/register/guide        Register as guide
POST   /auth/login                 Login user
GET    /auth/me                    Get current user (protected)
PUT    /auth/profile               Update profile (protected)
PUT    /auth/password              Change password (protected)
```

### Accommodations Endpoints
```
GET    /accommodations             Get all accommodations
GET    /accommodations/:id         Get accommodation by ID
POST   /accommodations             Create accommodation (admin)
PUT    /accommodations/:id         Update accommodation (admin)
DELETE /accommodations/:id         Delete accommodation (admin)
```

### Attractions Endpoints
```
GET    /attractions                Get all attractions
GET    /attractions/:id            Get attraction by ID
POST   /attractions                Create attraction (admin)
PUT    /attractions/:id            Update attraction (admin)
DELETE /attractions/:id            Delete attraction (admin)
```

### Guides Endpoints
```
GET    /guides                     Get all guides
GET    /guides/:id                 Get guide by ID
POST   /guides/:id/book            Book a guide (protected)
GET    /guides/:id/reviews         Get guide reviews
```

### Bookings Endpoints
```
GET    /bookings                   Get user bookings (protected)
POST   /bookings                   Create booking (protected)
PUT    /bookings/:id               Update booking status (protected)
DELETE /bookings/:id               Cancel booking (protected)
```

### Trips Endpoints
```
GET    /trips                      Get user trips (protected)
POST   /trips                      Create trip (protected)
PUT    /trips/:id                  Update trip (protected)
DELETE /trips/:id                  Delete trip (protected)
```

### Contact Endpoints
```
POST   /contact                    Submit contact form
GET    /contact                    Get submissions (admin)
```

## 🔒 Authentication

### JWT Token Flow
1. User registers/logs in
2. Backend generates JWT token
3. Frontend stores token in localStorage
4. Frontend includes token in Authorization header
5. Backend validates token via `protect` middleware

### Using Protected Endpoints
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:5000/api/trips
```

## 📊 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'tourist' | 'guide' | 'admin',
  phone: String,
  avatar: String,
  // Tourist fields
  nationality: String,
  preferences: [String],
  // Guide fields
  bio: String,
  languages: [String],
  specialties: [String],
  hourlyRate: Number,
  dailyRate: Number,
  verified: Boolean,
  createdAt: Date
}
```

### Accommodation Model
```javascript
{
  name: String,
  description: String,
  location: String,
  type: 'hotel' | 'guesthouse' | 'resort' | 'villa',
  pricePerNight: Number,
  amenities: [String],
  rating: Number,
  reviews: Number,
  coordinates: { lat: Number, lng: Number },
  images: [String],
  maxGuests: Number,
  createdAt: Date
}
```

### Attraction Model
```javascript
{
  name: String,
  description: String,
  category: String,
  location: String,
  lat: Number,
  lng: Number,
  rating: Number,
  reviews: Number,
  entranceFee: Number,
  duration: Number,
  images: [String],
  createdAt: Date
}
```

### Booking Model
```javascript
{
  userId: ObjectId (ref: User),
  accommodationId: ObjectId (ref: Accommodation),
  guideId: ObjectId (ref: User),
  checkInDate: Date,
  checkOutDate: Date,
  numberOfGuests: Number,
  totalPrice: Number,
  status: 'pending' | 'confirmed' | 'cancelled',
  createdAt: Date
}
```

### Trip Model
```javascript
{
  userId: ObjectId (ref: User),
  title: String,
  description: String,
  destination: String,
  startDate: Date,
  endDate: Date,
  attractions: [ObjectId],
  accommodations: [ObjectId],
  activities: [String],
  status: 'planning' | 'confirmed' | 'completed',
  createdAt: Date
}
```

## 🛠️ Available Scripts

```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed
```

## 🗄️ Database Setup

### Local MongoDB
```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB
mongod

# Or with Homebrew (Mac)
brew services start mongodb-community

# Verify connection
mongo
```

### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in .env:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taprobane?retryWrites=true&w=majority
   ```

### Seed Sample Data
```bash
npm run seed
```

This populates the database with:
- 5 Attractions
- 6 Guides
- 10 Accommodations

## 📋 Configuration

### Environment Variables (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/taprobane

# JWT
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:3000
```

### CORS Settings
Configure in `server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

## 🔍 Troubleshooting

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** 
- Start MongoDB: `mongod`
- Check MONGODB_URI in .env
- Verify MongoDB is running on port 27017

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
- Change PORT in .env to 5001 or another available port
- Or kill process on port 5000

### JWT Token Expired
```
Error: 401 Unauthorized
```
**Solution:**
- User needs to login again
- Or increase JWT_EXPIRE in .env

### CORS Error
```
Error: Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Verify FRONTEND_URL in .env matches frontend origin
- Ensure CORS middleware is configured in server.js

## 🚢 Deployment

### Backend Deployment Checklist
- [ ] Set NODE_ENV=production in .env
- [ ] Use strong JWT_SECRET (generate: `openssl rand -base64 32`)
- [ ] Use MongoDB Atlas for production database
- [ ] Update FRONTEND_URL to production domain
- [ ] Enable HTTPS
- [ ] Set up CI/CD pipeline
- [ ] Configure environment-specific .env
- [ ] Test all API endpoints in production

### Recommended Hosting Platforms
- **Railway** (nodejs + MongoDB)
- **Render**
- **Heroku** (low cost)
- **AWS** (EC2 + RDS/MongoDB Atlas)
- **DigitalOcean** (App Platform)

## 📖 Complete Documentation

For detailed information, see:
- [Backend Setup Guide](backend/BACKEND_SETUP.md)
- [Frontend-Backend Integration](FRONTEND_BACKEND_INTEGRATION.md)
- [Environment Setup](backend/ENV_SETUP.md)
- [Quick Start Guide](backend/QUICK_START.md)
- [Run Instructions](backend/RUN_INSTRUCTIONS.md)

## 🤝 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [{ field: "email", message: "Invalid email" }],
  "stack": "..." // Only in development
}
```

## 📞 Support & Contact

For issues or questions:
1. Check documentation files
2. Review API response errors
3. Check browser console & server logs
4. Verify environment variables
5. Test with curl or Postman

## ✅ Verification Checklist

After setup, verify:
- [ ] Backend running on port 5000
- [ ] MongoDB connected
- [ ] Health check endpoint responding
- [ ] All routes are accessible
- [ ] JWT token generation working
- [ ] CORS allowing frontend requests
- [ ] Database collections created
- [ ] Sample data seeded (optional)

## 📦 Dependencies

### Core
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - CORS middleware
- `dotenv` - Environment variables

### Security
- `jsonwebtoken` - JWT tokens
- `bcryptjs` - Password hashing
- `express-validator` - Input validation

### Development
- `nodemon` - Auto-reload on file changes

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [REST API Best Practices](https://restfulapi.net/)

## 📝 License

MIT License - Feel free to use this project for learning and development.

## 🎉 Ready to Start?

```bash
# 1. Install dependencies
cd backend
npm install

# 2. Setup .env
cp .env.example .env

# 3. Start MongoDB
mongod

# 4. Start backend
npm run dev

# 5. Check health
curl http://localhost:5000/api/health

# 6. Seed data (optional)
npm run seed
```

Happy coding! 🚀

---

**Last Updated:** January 24, 2026
**Version:** 1.0.0
**Status:** ✅ Production Ready
