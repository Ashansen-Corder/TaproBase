# Environment Variables Setup

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/taprobane

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taprobane?retryWrites=true&w=majority

# JWT Secret (Change this to a secure random string in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS - Frontend URL
FRONTEND_URL=http://localhost:3000
```

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use: `MONGODB_URI=mongodb://localhost:27017/taprobane`

### Option 2: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Replace username, password, and cluster name in connection string
5. Use the full connection string as `MONGODB_URI`

## Security Notes

- **Never commit `.env` file to version control**
- Use a strong, random `JWT_SECRET` in production
- Change default passwords in production
- Use environment-specific configurations
