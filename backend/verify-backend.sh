#!/bin/bash
# Backend Verification Script
# Run this script to verify all backend components are in place

echo "🔍 Backend Verification Checklist"
echo "=================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check file existence
check_file() {
  if [ -f "$1" ]; then
    echo -e "${GREEN}✓${NC} $1"
    return 0
  else
    echo -e "${RED}✗${NC} $1 (MISSING)"
    return 1
  fi
}

# Function to check directory existence
check_dir() {
  if [ -d "$1" ]; then
    echo -e "${GREEN}✓${NC} $1/"
    return 0
  else
    echo -e "${RED}✗${NC} $1/ (MISSING)"
    return 1
  fi
}

echo "📁 Directory Structure:"
check_dir "config"
check_dir "controllers"
check_dir "middleware"
check_dir "models"
check_dir "routes"
check_dir "scripts"
check_dir "utils"

echo ""
echo "⚙️  Core Files:"
check_file "server.js"
check_file "package.json"

echo ""
echo "🔧 Configuration:"
check_file ".env"
check_file ".env.example"
check_file ".gitignore"

echo ""
echo "📋 Model Files:"
check_file "models/User.model.js"
check_file "models/Accommodation.model.js"
check_file "models/Attraction.model.js"
check_file "models/Booking.model.js"
check_file "models/Trip.model.js"
check_file "models/Contact.model.js"

echo ""
echo "🎮 Controller Files:"
check_file "controllers/auth.controller.js"
check_file "controllers/accommodations.controller.js"
check_file "controllers/attractions.controller.js"
check_file "controllers/guides.controller.js"
check_file "controllers/bookings.controller.js"
check_file "controllers/trips.controller.js"
check_file "controllers/contact.controller.js"

echo ""
echo "🛣️  Route Files:"
check_file "routes/auth.routes.js"
check_file "routes/accommodations.routes.js"
check_file "routes/attractions.routes.js"
check_file "routes/guides.routes.js"
check_file "routes/bookings.routes.js"
check_file "routes/trips.routes.js"
check_file "routes/contact.routes.js"

echo ""
echo "🔐 Middleware:"
check_file "middleware/auth.middleware.js"

echo ""
echo "🛠️  Utilities:"
check_file "utils/asyncHandler.js"
check_file "utils/ErrorResponse.js"

echo ""
echo "📚 Database & Scripts:"
check_file "config/database.js"
check_file "scripts/seedDatabase.js"

echo ""
echo "📖 Documentation:"
check_file "BACKEND_SETUP.md"
check_file "ENV_SETUP.md"
check_file "QUICK_START.md"
check_file "RUN_INSTRUCTIONS.md"

echo ""
echo "=================================="
echo "✅ Backend structure verification complete!"
echo ""
echo "Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Configure .env file (copy from .env.example)"
echo "3. Start MongoDB"
echo "4. Run: npm run dev (development)"
echo "5. Test: curl http://localhost:5000/api/health"
