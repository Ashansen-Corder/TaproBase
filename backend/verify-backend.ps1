# Backend Verification Script for Windows
# Run this script to verify all backend components are in place

Write-Host "🔍 Backend Verification Checklist" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Function to check file existence
function Check-File {
    param([string]$Path)
    if (Test-Path -Path $Path -PathType Leaf) {
        Write-Host "✓ $Path" -ForegroundColor Green
        return $true
    } else {
        Write-Host "✗ $Path (MISSING)" -ForegroundColor Red
        return $false
    }
}

# Function to check directory existence
function Check-Directory {
    param([string]$Path)
    if (Test-Path -Path $Path -PathType Container) {
        Write-Host "✓ $Path/" -ForegroundColor Green
        return $true
    } else {
        Write-Host "✗ $Path/ (MISSING)" -ForegroundColor Red
        return $false
    }
}

Write-Host "📁 Directory Structure:" -ForegroundColor Cyan
Check-Directory "config"
Check-Directory "controllers"
Check-Directory "middleware"
Check-Directory "models"
Check-Directory "routes"
Check-Directory "scripts"
Check-Directory "utils"

Write-Host ""
Write-Host "⚙️  Core Files:" -ForegroundColor Cyan
Check-File "server.js"
Check-File "package.json"

Write-Host ""
Write-Host "🔧 Configuration:" -ForegroundColor Cyan
Check-File ".env"
Check-File ".env.example"
Check-File ".gitignore"

Write-Host ""
Write-Host "📋 Model Files:" -ForegroundColor Cyan
Check-File "models/User.model.js"
Check-File "models/Accommodation.model.js"
Check-File "models/Attraction.model.js"
Check-File "models/Booking.model.js"
Check-File "models/Trip.model.js"
Check-File "models/Contact.model.js"

Write-Host ""
Write-Host "🎮 Controller Files:" -ForegroundColor Cyan
Check-File "controllers/auth.controller.js"
Check-File "controllers/accommodations.controller.js"
Check-File "controllers/attractions.controller.js"
Check-File "controllers/guides.controller.js"
Check-File "controllers/bookings.controller.js"
Check-File "controllers/trips.controller.js"
Check-File "controllers/contact.controller.js"

Write-Host ""
Write-Host "🛣️  Route Files:" -ForegroundColor Cyan
Check-File "routes/auth.routes.js"
Check-File "routes/accommodations.routes.js"
Check-File "routes/attractions.routes.js"
Check-File "routes/guides.routes.js"
Check-File "routes/bookings.routes.js"
Check-File "routes/trips.routes.js"
Check-File "routes/contact.routes.js"

Write-Host ""
Write-Host "🔐 Middleware:" -ForegroundColor Cyan
Check-File "middleware/auth.middleware.js"

Write-Host ""
Write-Host "🛠️  Utilities:" -ForegroundColor Cyan
Check-File "utils/asyncHandler.js"
Check-File "utils/ErrorResponse.js"

Write-Host ""
Write-Host "📚 Database & Scripts:" -ForegroundColor Cyan
Check-File "config/database.js"
Check-File "scripts/seedDatabase.js"

Write-Host ""
Write-Host "📖 Documentation:" -ForegroundColor Cyan
Check-File "BACKEND_SETUP.md"
Check-File "ENV_SETUP.md"
Check-File "QUICK_START.md"
Check-File "RUN_INSTRUCTIONS.md"

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "✅ Backend structure verification complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Install dependencies: npm install" -ForegroundColor White
Write-Host "2. Configure .env file (copy from .env.example)" -ForegroundColor White
Write-Host "3. Start MongoDB" -ForegroundColor White
Write-Host "4. Run: npm run dev (development)" -ForegroundColor White
Write-Host "5. Test: curl http://localhost:5000/api/health" -ForegroundColor White
