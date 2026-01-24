# Taprobane Backend API

Backend API for the Taprobane Premium Tourism Platform - A comprehensive tourism management system for Sri Lanka.

## Features

- 🔐 **Authentication & Authorization**
  - User registration (Tourists & Guides)
  - JWT-based authentication
  - Role-based access control (Tourist, Guide, Admin)

- 🏨 **Accommodations Management**
  - CRUD operations for accommodations
  - Search and filter by type, region, price, rating
  - Location-based search

- 🗺️ **Attractions Management**
  - CRUD operations for attractions
  - Category-based filtering
  - Search functionality

- 👨‍🏫 **Tour Guides Management**
  - Guide profiles with specialties and languages
  - Search guides by location, specialty, language
  - Verified guide system

- 📅 **Booking System**
  - Accommodation bookings
  - Guide bookings (hourly/daily)
  - Booking management and cancellation

- 🗓️ **Trip Planner**
  - Create and manage custom itineraries
  - Add accommodations, guides, and attractions to trips
  - Public trip sharing

- 📧 **Contact Management**
  - Contact form submissions
  - Admin reply system

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** express-validator

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/taprobane
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```
This will start the server with nodemon for auto-reloading.

### Production Mode
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## Seeding the Database

To populate the database with sample data:

```bash
npm run seed
```

This will create:
- Sample accommodations
- Sample attractions
- Sample guides
- A test tourist account (email: `tourist@test.com`, password: `password123`)

## API Endpoints

### Authentication
- `POST /api/auth/register/tourist` - Register a tourist
- `POST /api/auth/register/guide` - Register a guide
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)
- `PUT /api/auth/password` - Update password (Protected)

### Accommodations
- `GET /api/accommodations` - Get all accommodations
- `GET /api/accommodations/search` - Search accommodations
- `GET /api/accommodations/:id` - Get single accommodation
- `POST /api/accommodations` - Create accommodation (Protected - Guide/Admin)
- `PUT /api/accommodations/:id` - Update accommodation (Protected - Guide/Admin)
- `DELETE /api/accommodations/:id` - Delete accommodation (Protected - Guide/Admin)

### Attractions
- `GET /api/attractions` - Get all attractions
- `GET /api/attractions/search` - Search attractions
- `GET /api/attractions/:id` - Get single attraction
- `POST /api/attractions` - Create attraction (Protected - Admin)
- `PUT /api/attractions/:id` - Update attraction (Protected - Admin)
- `DELETE /api/attractions/:id` - Delete attraction (Protected - Admin)

### Guides
- `GET /api/guides` - Get all guides
- `GET /api/guides/search` - Search guides
- `GET /api/guides/:id` - Get single guide
- `PUT /api/guides/:id` - Update guide profile (Protected)

### Bookings
- `GET /api/bookings` - Get user bookings (Protected)
- `GET /api/bookings/all` - Get all bookings (Protected - Admin/Guide)
- `POST /api/bookings` - Create booking (Protected)
- `GET /api/bookings/:id` - Get single booking (Protected)
- `PUT /api/bookings/:id` - Update booking (Protected)
- `DELETE /api/bookings/:id` - Cancel booking (Protected)

### Trips
- `GET /api/trips` - Get user trips (Protected)
- `GET /api/trips/public` - Get public trips
- `POST /api/trips` - Create trip (Protected)
- `GET /api/trips/:id` - Get single trip (Protected)
- `PUT /api/trips/:id` - Update trip (Protected)
- `DELETE /api/trips/:id` - Delete trip (Protected)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Protected - Admin)
- `GET /api/contact/:id` - Get single contact (Protected - Admin)
- `PUT /api/contact/:id` - Update contact status (Protected - Admin)
- `POST /api/contact/:id/reply` - Reply to contact (Protected - Admin)

### Health Check
- `GET /api/health` - Server health check

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Request/Response Examples

### Register Tourist
```json
POST /api/auth/register/tourist
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+94 77 123 4567",
  "nationality": "USA"
}
```

### Register Guide
```json
POST /api/auth/register/guide
{
  "name": "Chaminda Perera",
  "email": "chaminda@example.com",
  "password": "password123",
  "phone": "+94 77 123 4567",
  "bio": "Experienced tour guide",
  "location": "Kandy",
  "languages": ["English", "Sinhala"],
  "specialties": ["Heritage Sites", "Cultural Tours"],
  "hourlyRate": "USD 15",
  "dailyRate": "USD 100"
}
```

### Create Accommodation Booking
```json
POST /api/bookings
Authorization: Bearer <token>
{
  "type": "accommodation",
  "accommodation": "accommodation_id",
  "checkIn": "2024-03-15",
  "checkOut": "2024-03-18",
  "guests": 2,
  "roomType": "Deluxe"
}
```

### Create Guide Booking
```json
POST /api/bookings
Authorization: Bearer <token>
{
  "type": "guide",
  "guide": "guide_id",
  "startDate": "2024-03-15T09:00:00Z",
  "endDate": "2024-03-15T17:00:00Z",
  "duration": "hourly",
  "tourType": "Heritage Tour"
}
```

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/             # Route controllers
│   ├── auth.controller.js
│   ├── accommodations.controller.js
│   ├── attractions.controller.js
│   ├── guides.controller.js
│   ├── bookings.controller.js
│   ├── trips.controller.js
│   └── contact.controller.js
├── middleware/
│   └── auth.middleware.js   # Authentication middleware
├── models/                  # Mongoose models
│   ├── User.model.js
│   ├── Accommodation.model.js
│   ├── Attraction.model.js
│   ├── Booking.model.js
│   ├── Trip.model.js
│   └── Contact.model.js
├── routes/                  # Express routes
│   ├── auth.routes.js
│   ├── accommodations.routes.js
│   ├── attractions.routes.js
│   ├── guides.routes.js
│   ├── bookings.routes.js
│   ├── trips.routes.js
│   └── contact.routes.js
├── scripts/
│   └── seedDatabase.js      # Database seeding script
├── utils/
│   ├── asyncHandler.js     # Async error handler
│   └── ErrorResponse.js     # Custom error class
├── .env.example            # Environment variables example
├── .gitignore
├── package.json
├── server.js               # Main server file
└── README.md
```

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control
- Input validation with express-validator
- CORS configuration
- Environment variable protection

## Future Enhancements

- [ ] Image upload functionality
- [ ] Email notifications
- [ ] Payment integration
- [ ] Review and rating system
- [ ] Advanced search with geospatial queries
- [ ] Real-time notifications
- [ ] Admin dashboard API
- [ ] Analytics and reporting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on the repository.
