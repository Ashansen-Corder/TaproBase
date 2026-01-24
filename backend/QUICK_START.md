# Quick Start Guide

Get your Taprobane backend up and running in minutes!

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taprobane
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**Important:** Make sure MongoDB is running on your system, or use MongoDB Atlas cloud service.

## Step 3: Start MongoDB

### Local MongoDB:
```bash
# On Windows (if installed as service, it should auto-start)
# Or start manually:
mongod

# On macOS with Homebrew:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod
```

### MongoDB Atlas (Cloud):
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

## Step 4: Seed the Database (Optional)

Populate the database with sample data:

```bash
npm run seed
```

This creates:
- Sample accommodations
- Sample attractions  
- Sample guides
- Test tourist account (email: `tourist@test.com`, password: `password123`)

## Step 5: Start the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## Step 6: Test the API

### Health Check:
```bash
curl http://localhost:5000/api/health
```

### Register a Tourist:
```bash
curl -X POST http://localhost:5000/api/auth/register/tourist \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+94 77 123 4567"
  }'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Accommodations:
```bash
curl http://localhost:5000/api/accommodations
```

## Connecting Frontend

1. In your frontend `.env` file (or `vite.config.js`), set:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

2. The frontend API service is already set up in `taprobane-premium/src/services/api.js`

3. Use the API in your React components:
   ```javascript
   import { accommodationsAPI } from '../services/api';
   
   const fetchAccommodations = async () => {
     const response = await accommodationsAPI.getAll();
     console.log(response.data);
   };
   ```

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Change `PORT` in `.env` to a different port (e.g., 5001)
- Or stop the process using port 5000

### Module Not Found
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then `npm install`

## Next Steps

- Read the full [README.md](./README.md) for detailed API documentation
- Check [ENV_SETUP.md](./ENV_SETUP.md) for environment configuration details
- Explore the API endpoints using Postman or similar tools

## Need Help?

- Check the main README.md for detailed documentation
- Review the error messages in the console
- Ensure all environment variables are set correctly
