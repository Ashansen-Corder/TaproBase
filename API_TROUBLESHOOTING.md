# API Troubleshooting & Testing Guide

## The Issue: "Route not found" Error

This error means one of the following:
1. ✗ The endpoint doesn't exist
2. ✗ The request path is incorrect  
3. ✗ The backend isn't responding
4. ✗ The database connection failed

---

## ✅ Solution Steps

### Step 1: Verify Backend is Running
```powershell
# Check if backend is responding
Invoke-WebRequest http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Taprobane Backend API is running"
}
```

### Step 2: Check Backend Logs
Look at the backend terminal - you should see:
```
MongoDB Connected: localhost
Server running on port 5000
[timestamp] GET /api/health
```

### Step 3: Seed Database (If Empty)
```powershell
cd backend
npm run seed
```

This adds sample attractions, guides, and accommodations.

### Step 4: Test Each Endpoint

```powershell
# Health check
Invoke-WebRequest http://localhost:5000/api/health

# Get all attractions
Invoke-WebRequest http://localhost:5000/api/attractions

# Get all guides
Invoke-WebRequest http://localhost:5000/api/guides

# Get all accommodations
Invoke-WebRequest http://localhost:5000/api/accommodations
```

### Step 5: Restart Services
If still not working, restart both:

**Terminal 1 (Backend):**
```powershell
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```powershell
cd taprobane-premium
npm run dev
```

---

## 🔧 Debugging Tips

### Check Console Output
Open browser DevTools (F12):
1. Go to **Console** tab
2. Look for any error messages
3. Check the **Network** tab to see API requests

### Check Backend Terminal
Look for logs like:
```
[2026-01-24] GET /api/attractions
[ERROR] Route not found: GET /api/typo-endpoint
```

### Verify Endpoint Path
Frontend calling: `/attractions`?
Backend has: `/api/attractions`

Full URL should be: `http://localhost:5000/api/attractions`

---

## 📋 Working Endpoints

All these should work:

| Endpoint | Method | Returns |
|----------|--------|---------|
| `/api/health` | GET | Status OK |
| `/api/attractions` | GET | List of attractions |
| `/api/attractions/search` | GET | Search results |
| `/api/guides` | GET | List of guides |
| `/api/accommodations` | GET | List of accommodations |
| `/api/contact` | POST | Contact form submission |
| `/api/auth/register/tourist` | POST | Register user |
| `/api/auth/login` | POST | Login & get token |

---

## 🛠️ If Endpoints Still Return 404

### Check 1: Is backend running?
```powershell
Get-Process node
# Should show node.exe running
```

### Check 2: Is MongoDB running?
```powershell
Get-Process mongod
# If empty, MongoDB isn't running
```

### Check 3: Are routes mounted in server.js?
Should see in `backend/server.js`:
```javascript
app.use('/api/auth', authRoutes);
app.use('/api/attractions', attractionRoutes);
app.use('/api/guides', guideRoutes);
// etc...
```

### Check 4: Does controller export exist?
Check `backend/controllers/attractions.controller.js` has `getAttractions` export

### Check 5: Does model exist?
Check `backend/models/Attraction.model.js` exists

---

## 🔄 Complete Reset

If nothing works, do a complete reset:

```powershell
# 1. Stop both services (Ctrl+C in both terminals)

# 2. Clear node_modules and reinstall
cd backend
rm -r node_modules
npm install

# 3. Restart
npm run dev
```

---

## 📝 API Configuration

### Frontend Config
File: `src/services/api.js`

```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // ← Make sure this is correct
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Backend Config
File: `backend/.env`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taprobane
FRONTEND_URL=http://localhost:3001
```

---

## ✅ Expected Working State

You should see:

**Backend Terminal:**
```
MongoDB Connected: localhost
Server running on port 5000
[2026-01-24T12:00:00] GET /api/health
[2026-01-24T12:00:01] GET /api/attractions
```

**Frontend:** No console errors, data loads properly

---

## 🎯 Quick Fix Checklist

- [ ] Backend running (`npm run dev`)?
- [ ] Frontend running on port 3001?
- [ ] MongoDB connected (check backend logs)?
- [ ] Health endpoint responds (`/api/health`)?
- [ ] Attractions endpoint responds (`/api/attractions`)?
- [ ] Data seeded (`npm run seed`)?
- [ ] No typos in endpoint paths?
- [ ] Browser console has no errors?
- [ ] Network tab shows successful requests?

---

## 💡 Pro Tips

1. **Use Postman** - Great for testing APIs directly
2. **Check Network tab** - See actual requests and responses
3. **Read backend logs** - They tell you exactly what's wrong
4. **Restart services** - 90% of issues fixed by restarting
5. **Clear browser cache** - Sometimes old responses cached

---

**If this doesn't fix it, check the backend logs for the exact error message!**
