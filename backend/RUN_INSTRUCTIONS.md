# How to Run the Backend

Follow these steps to get your backend server running:

## Prerequisites

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - Choose one:
   - **Local MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
   - **MongoDB Atlas** (Cloud - Free) - [Sign up here](https://www.mongodb.com/cloud/atlas)

## Step-by-Step Instructions

### Step 1: Navigate to Backend Directory

Open your terminal/command prompt and navigate to the backend folder:

```bash
cd backend
```

### Step 2: Install Dependencies

Install all required packages:

```bash
npm install
```

This will install Express, Mongoose, JWT, and all other dependencies.

### Step 3: Set Up Environment Variables

Create a `.env` file in the `backend` directory with the following content:

**For Local MongoDB:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taprobane
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**For MongoDB Atlas (Cloud):**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taprobane?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**Important:** Replace the MongoDB Atlas connection string with your actual credentials.

### Step 4: Start MongoDB

#### Option A: Local MongoDB

**Windows:**
- If MongoDB is installed as a service, it should start automatically
- Or run: `mongod` in a separate terminal

**macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)
- No local setup needed!
- Just make sure your connection string in `.env` is correct
- Whitelist your IP address in MongoDB Atlas dashboard

### Step 5: Seed Database (Optional but Recommended)

Populate the database with sample data:

```bash
npm run seed
```

This creates:
- 5 sample accommodations
- 5 sample attractions
- 3 sample guides
- 1 test tourist account (email: `tourist@test.com`, password: `password123`)

### Step 6: Start the Server

#### Development Mode (Recommended - Auto-reloads on changes):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

You should see:
```
MongoDB Connected: localhost (or your Atlas cluster)
Server running on port 5000
Environment: development
```

## Verify It's Working

### Test Health Endpoint

Open your browser or use curl:

**Browser:**
```
http://localhost:5000/api/health
```

**Terminal (curl):**
```bash
curl http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Taprobane Backend API is running",
  "timestamp": "2024-..."
}
```

### Test Getting Accommodations

```bash
curl http://localhost:5000/api/accommodations
```

## Common Issues & Solutions

### Issue: "Cannot find module"
**Solution:** Run `npm install` again

### Issue: "MongoDB connection error"
**Solutions:**
- Make sure MongoDB is running (local) or connection string is correct (Atlas)
- Check your `MONGODB_URI` in `.env`
- For Atlas: Ensure your IP is whitelisted in MongoDB Atlas dashboard

### Issue: "Port 5000 already in use"
**Solution:** Change `PORT=5001` (or another port) in `.env`

### Issue: "EADDRINUSE: address already in use"
**Solution:** 
- Find and kill the process using port 5000
- Or change the port in `.env`

## Next Steps

1. **Test the API** - Use Postman, Insomnia, or curl to test endpoints
2. **Connect Frontend** - Update your frontend to use `http://localhost:5000/api`
3. **Read Documentation** - Check `README.md` for full API documentation

## Running Both Frontend and Backend

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd taprobane-premium
npm run dev
```

Both will run simultaneously:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000` (or your Vite port)

## API Base URL

Once running, your API base URL is:
```
http://localhost:5000/api
```

All endpoints are documented in `README.md`
