# Backend Setup & Configuration Guide

## Overview
The Taprobane Backend is a Node.js/Express API built with MongoDB using Mongoose ODM. It provides endpoints for authentication, accommodations, attractions, guides, bookings, trips, and contact management.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (locally or MongoDB Atlas)
- npm or yarn

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend` directory with the following:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taprobane
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

For **MongoDB Atlas** (Cloud):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taprobane?retryWrites=true&w=majority
```

### 3. Start MongoDB
**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas** - update MONGODB_URI in .env

### 4. Start the Server

**Development (with hot reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on `http://localhost:5000`

### 5. Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Taprobane Backend API is running",
  "timestamp": "2026-01-24T00:00:00.000Z"
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register/tourist` - Register as tourist
- `POST /api/auth/register/guide` - Register as guide
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (requires token)
- `PUT /api/auth/profile` - Update profile (requires token)
- `PUT /api/auth/password` - Change password (requires token)

### Accommodations
- `GET /api/accommodations` - Get all accommodations
- `GET /api/accommodations/:id` - Get accommodation by ID
- `POST /api/accommodations` - Create accommodation (admin)
- `PUT /api/accommodations/:id` - Update accommodation (admin)
- `DELETE /api/accommodations/:id` - Delete accommodation (admin)

### Attractions
- `GET /api/attractions` - Get all attractions
- `GET /api/attractions/:id` - Get attraction by ID
- `POST /api/attractions` - Create attraction (admin)
- `PUT /api/attractions/:id` - Update attraction (admin)
- `DELETE /api/attractions/:id` - Delete attraction (admin)

### Guides
- `GET /api/guides` - Get all guides
- `GET /api/guides/:id` - Get guide by ID
- `POST /api/guides/:id/book` - Book a guide (requires token)

### Bookings
- `GET /api/bookings` - Get user bookings (requires token)
- `POST /api/bookings` - Create booking (requires token)
- `PUT /api/bookings/:id` - Update booking status (requires token)
- `DELETE /api/bookings/:id` - Cancel booking (requires token)

### Trips
- `GET /api/trips` - Get user trips (requires token)
- `POST /api/trips` - Create trip (requires token)
- `PUT /api/trips/:id` - Update trip (requires token)
- `DELETE /api/trips/:id` - Delete trip (requires token)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact submissions (admin)

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/             # Business logic
│   ├── auth.controller.js
│   ├── accommodations.controller.js
│   ├── attractions.controller.js
│   ├── guides.controller.js
│   ├── bookings.controller.js
│   ├── trips.controller.js
│   └── contact.controller.js
├── models/                  # Mongoose schemas
│   ├── User.model.js
│   ├── Accommodation.model.js
│   ├── Attraction.model.js
│   ├── Booking.model.js
│   ├── Trip.model.js
│   └── Contact.model.js
├── routes/                  # API routes
│   ├── auth.routes.js
│   ├── accommodations.routes.js
│   ├── attractions.routes.js
│   ├── guides.routes.js
│   ├── bookings.routes.js
│   ├── trips.routes.js
│   └── contact.routes.js
├── middleware/
│   └── auth.middleware.js   # JWT authentication
├── utils/
│   ├── asyncHandler.js      # Async error handling
│   └── ErrorResponse.js     # Error response class
├── scripts/
│   └── seedDatabase.js      # Database seeding
├── server.js                # Express app setup
├── package.json
└── .env                     # Environment variables (create from .env.example)
```

## Authentication

### JWT Token Flow
1. User registers or logs in
2. Server generates JWT token
3. Client stores token (localStorage/sessionStorage)
4. Client includes token in Authorization header for protected routes
5. Server validates token via `protect` middleware

### Using Authenticated Endpoints
Include token in headers:
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/api/trips
```

## Database Models

### User
- `name`, `email`, `password`, `phone`
- `role` (tourist, guide, admin)
- Guide-specific: `bio`, `languages`, `specialties`, `hourlyRate`, `dailyRate`
- Tourist-specific: `nationality`, `preferences`

### Accommodation
- Basic info: `name`, `description`, `location`
- Details: `type`, `pricePerNight`, `rating`, `amenities`
- Coordinates: `lat`, `lng`

### Attraction
- Basic info: `name`, `description`, `category`
- Details: `rating`, `entranceFee`, `duration`
- Coordinates: `lat`, `lng`

### Booking
- Reference: `userId`, `accommodationId` or `guideId`
- Dates: `checkInDate`, `checkOutDate`
- Status: `pending`, `confirmed`, `cancelled`
- Pricing: `totalPrice`, `numberOfGuests`

### Trip
- Reference: `userId`
- Details: `title`, `description`, `destination`
- Dates: `startDate`, `endDate`
- Itinerary: `attractions`, `accommodations`, `activities`
- Status: `planning`, `confirmed`, `completed`

### Contact
- `name`, `email`, `subject`, `message`
- `status` (new, read, replied)
- Timestamps: `createdAt`

## Seeding Database

To populate the database with sample data:

```bash
npm run seed
```

This will insert sample attractions, accommodations, and guides into the database.

## Error Handling

All endpoints return standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "stack": "..." // Only in development
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Validation

Input validation is performed using `express-validator`. See route files for specific validation rules applied to each endpoint.

## CORS Configuration

By default, CORS is enabled for `http://localhost:3000` (frontend dev server). Update in `server.js` for production:

```javascript
app.use(cors({
  origin: 'https://yourdomain.com', // Update to your domain
  credentials: true
}));
```

## Troubleshooting

### MongoDB Connection Error
- Verify MongoDB is running: `mongo` or check MongoDB Atlas connection
- Check `MONGODB_URI` in `.env`
- Ensure network access is allowed (MongoDB Atlas: IP Whitelist)

### Port Already in Use
Change `PORT` in `.env` to an available port (e.g., 5001)

### JWT Token Expired
Regenerate token by logging in again. Adjust `JWT_EXPIRE` in `.env` for longer sessions (default: 7d)

### CORS Error
Verify `FRONTEND_URL` in `.env` matches your frontend URL

## Production Deployment

Before deploying to production:

1. Update `.env` with production values
2. Set `NODE_ENV=production`
3. Use strong `JWT_SECRET` (generate: `openssl rand -base64 32`)
4. Use MongoDB Atlas or managed database
5. Set `FRONTEND_URL` to your domain
6. Enable HTTPS
7. Set security headers
8. Use environment-specific configurations

## Next Steps

- [ ] Connect frontend to backend API
- [ ] Implement file upload for avatars/images
- [ ] Add email notifications
- [ ] Implement payment gateway (Stripe)
- [ ] Add advanced search/filtering
- [ ] Implement real-time notifications with WebSockets

---

**Last Updated:** January 2026
