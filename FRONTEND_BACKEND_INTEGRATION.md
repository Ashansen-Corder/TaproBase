# Frontend-Backend Integration Guide

## Overview
This document explains how the Taprobane Frontend and Backend are connected and how to set up the full-stack application.

## Project Structure

```
Tapro Pre/
├── frontend/              # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/         # Static data (being replaced by API)
│   │   └── services/     # API service files
│   ├── package.json
│   └── vite.config.js
│
└── backend/               # Node.js/Express API
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── server.js
    └── package.json
```curl http://localhost:5000/api/health

## Setup Instructions

### Step 1: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/taprobane
# (or MongoDB Atlas connection string)

# Start MongoDB locally (if using local MongoDB)
# On Windows: mongod
# On Mac: brew services start mongodb-community

# Start backend server
npm run dev
```

Backend will run on: `http://localhost:5000`

### Step 2: Frontend Setup

```bash
cd ../  # Go back to Tapro Pre root

# Install frontend dependencies
npm install

# Update API base URL in src/services/api.js (if needed)
# Default: http://localhost:5000

# Start frontend development server
npm run dev
```

Frontend will run on: `http://localhost:3000`

## API Integration Points

### Frontend API Service

Location: `src/services/api.js`

```javascript
import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### API Usage Examples

#### Authentication
```javascript
// Register
const registerResponse = await api.post('/auth/register/tourist', {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123'
});

// Login
const loginResponse = await api.post('/auth/login', {
  email: 'john@example.com',
  password: 'password123'
});
localStorage.setItem('authToken', loginResponse.data.token);

// Get current user
const userResponse = await api.get('/auth/me');
```

#### Attractions
```javascript
// Get all attractions
const attractions = await api.get('/attractions');

// Get attraction by ID
const attraction = await api.get(`/attractions/123`);
```

#### Accommodations
```javascript
// Get all accommodations
const accommodations = await api.get('/accommodations');

// Get accommodation by ID
const accommodation = await api.get(`/accommodations/123`);
```

#### Guides
```javascript
// Get all guides
const guides = await api.get('/guides');

// Book a guide
const booking = await api.post(`/guides/123/book`, {
  startDate: '2026-02-01',
  endDate: '2026-02-05',
  numberOfGuests: 2
});
```

#### Bookings
```javascript
// Get user bookings
const userBookings = await api.get('/bookings');

// Create booking
const newBooking = await api.post('/bookings', {
  accommodationId: '123',
  checkInDate: '2026-02-01',
  checkOutDate: '2026-02-05',
  numberOfGuests: 2
});

// Update booking
await api.put(`/bookings/456`, { status: 'confirmed' });

// Cancel booking
await api.delete(`/bookings/456`);
```

#### Trips
```javascript
// Get user trips
const trips = await api.get('/trips');

// Create trip
const newTrip = await api.post('/trips', {
  title: 'Summer Vacation',
  description: 'Exploring Sri Lanka',
  destination: 'Colombo',
  startDate: '2026-02-01',
  endDate: '2026-02-10',
  attractions: ['123', '456'],
  accommodations: ['789']
});

// Update trip
await api.put(`/trips/123`, { title: 'Updated Title' });

// Delete trip
await api.delete(`/trips/123`);
```

#### Contact
```javascript
// Submit contact form
await api.post('/contact', {
  name: 'John',
  email: 'john@example.com',
  subject: 'Inquiry',
  message: 'I have a question...'
});
```

## Data Flow

### Authentication Flow
1. User fills login/register form on frontend
2. Frontend sends POST request to `/api/auth/login` or `/api/auth/register/tourist`
3. Backend validates credentials and returns JWT token
4. Frontend stores token in localStorage
5. Frontend includes token in Authorization header for subsequent requests
6. Backend middleware (`protect`) validates token before allowing access

### Content Flow (Attractions, Guides, Accommodations)
1. Frontend requests data on mount using `useEffect`
2. Backend fetches from MongoDB
3. Backend returns JSON with pagination/filtering if needed
4. Frontend stores in state and renders UI
5. User can filter/search on frontend (client-side) or request filtered data from backend

### Booking Flow
1. User selects dates and confirms booking
2. Frontend sends POST request to `/api/bookings` with booking details
3. Backend creates booking record in MongoDB
4. Backend returns booking confirmation with ID
5. Frontend shows confirmation message
6. User can view bookings in "My Trips" section

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taprobane
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env or .env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

## Common Issues & Solutions

### CORS Error
**Error:** Access to XMLHttpRequest blocked by CORS policy

**Solution:** 
- Verify backend CORS configuration in `server.js`
- Ensure FRONTEND_URL in backend .env matches frontend URL
- Clear browser cache

### 404 Not Found
**Error:** GET http://localhost:5000/api/attractions 404

**Solution:**
- Verify backend is running: `curl http://localhost:5000/api/health`
- Check API endpoint matches route definitions in backend
- Verify database is connected

### MongoDB Connection Error
**Error:** Cannot connect to MongoDB

**Solution:**
- Start MongoDB: `mongod` (local) or verify Atlas credentials
- Check MONGODB_URI in .env
- Ensure MongoDB is running on correct port (27017 default)

### JWT Token Expired
**Error:** 401 Unauthorized

**Solution:**
- Clear localStorage: `localStorage.removeItem('authToken')`
- Re-login to get new token
- Increase JWT_EXPIRE in backend .env if needed

### CORS Token Not Sent
**Error:** Authorization header not sent with requests

**Solution:**
- Verify CORS `credentials: true` in backend
- Verify token is stored in localStorage
- Check API interceptor includes Authorization header

## Testing API Endpoints

### Using cURL
```bash
# Test health check
curl http://localhost:5000/api/health

# Get attractions
curl http://localhost:5000/api/attractions

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Get with token
curl http://localhost:5000/api/trips \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman
1. Import API collection (if available)
2. Set base URL: `http://localhost:5000/api`
3. For authenticated requests, add header:
   - Key: `Authorization`
   - Value: `Bearer YOUR_JWT_TOKEN`
4. Send request and check response

## Production Deployment

### Backend (Node.js hosting options)
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean
- MongoDB Atlas (managed database)

### Frontend (Static hosting options)
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Environment Variables for Production

**Backend .env**
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/taprobane
JWT_SECRET=generate_strong_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=https://yourdomain.com
```

**Frontend .env.production**
```env
VITE_API_URL=https://api.yourdomain.com
```

## Monitoring & Logging

### Backend Logs
- Enabled by default in development
- Check for MongoDB connection status on startup
- API request/response logging can be added via middleware

### Frontend Logs
- Check browser console (F12)
- Network tab shows API requests/responses
- Check localStorage for token storage

## Next Steps

1. ✅ Backend setup complete
2. ✅ Frontend-Backend integration ready
3. [ ] Implement authentication on frontend
4. [ ] Connect all API endpoints
5. [ ] Add error handling & loading states
6. [ ] Implement pagination & filtering
7. [ ] Add file upload for images
8. [ ] Deploy to production

---

**Last Updated:** January 2026
**Version:** 1.0
