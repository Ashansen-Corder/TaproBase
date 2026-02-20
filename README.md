# 📚 TaproBase - Premium Sri Lanka Tourism Platform

**Complete Full-Stack Tourism Application | React + Node.js + MongoDB | 🐳 Dockerized**

A modern, sophisticated web application for exploring Sri Lanka with premium design, smooth animations, and comprehensive travel features. This project features a fully containerized 3-tier architecture optimized for modern DevOps deployment.

## 🎯 Quick Navigation

| What Do You Want? | Start Here |
|------------------|-----------|
| 🐳 **Run with Docker (Recommended)** | [Docker Quick Start](#-docker-quick-start-recommended) |
| 🚀 **Manual Setup** | [Traditional Local Setup](#-traditional-local-setup-without-docker) |
| 📖 **Full API documentation** | [Backend Complete Guide](BACKEND_COMPLETE.md) |
| 💻 **Frontend code** | See `src/` folder |
| 🆘 **Having issues** | [Troubleshooting](#-troubleshooting) |

---

## ✨ Features

### ✅ Implemented Features
- **🐳 3-Tier Docker Architecture** with containerized Frontend, Backend, and Database
- **Stunning Home Page** with smooth scroll animations and modern design
- **Premium Navigation** with responsive mobile menu
- **Complete Backend API** with 7 routes and 35+ endpoints
- **JWT Authentication** for secure access
- **Persistent MongoDB Database** with mapped Docker volumes
- **Verified Tour Guides Directory** with detailed profiles
- **Responsive Design** that works perfectly on all devices
- **Smooth Page Transitions** using Framer Motion
- **Production-Ready** optimized build caching and secure non-root containers

### 🎨 Design Highlights
- **Premium Typography** using Playfair Display and Sora fonts
- **Sophisticated Color Palette** inspired by Sri Lankan landscapes
- **Micro-interactions** and hover effects throughout
- **Glassmorphism** effects on key elements

---

## 🐳 Docker Quick Start (Recommended)

This project is fully containerized. You do not need Node.js or MongoDB installed locally to run it—only Docker!

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine)
- Git

### Step 1: Clone the repository
\`\`\`bash
git clone <YOUR_GITHUB_REPO_URL>
cd TaproBase
\`\`\`

### Step 2: Build and Start the Application
Run the following command from the root directory. This will automatically build the optimized images, set up the internal network, and launch the database, backend, and frontend in the correct order:
\`\`\`bash
docker compose up -d --build
\`\`\`

### Step 3: Access the Application
- **Frontend (React/Nginx):** [http://localhost:8080](http://localhost:8080)
- **Backend API (Node.js):** [http://localhost:5000](http://localhost:5000)
- **Database (MongoDB):** Running internally on port `27017`

### 🛑 Stopping the Application
To safely spin down the containers and network while preserving your database data:
\`\`\`bash
docker compose down
\`\`\`

---

## ⚙️ Traditional Local Setup (Without Docker)

If you wish to run the application manually for development purposes:

### Prerequisites
- Node.js v18+ and npm
- MongoDB (local or MongoDB Atlas)

### Step 1: Backend Setup
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Configure MONGODB_URI in .env
npm run dev
# Backend running on http://localhost:5000
\`\`\`

### Step 2: Frontend Setup (in another terminal)
\`\`\`bash
cd ..
npm install
npm run dev
# Frontend running on http://localhost:5173 (or 3000)
\`\`\`

---

## 📁 Complete Project Structure

\`\`\`text
TAPROBASE/
├── backend/                  # Node.js/Express API
│   ├── src/                  # Backend source code
│   ├── .dockerignore         # Backend build exclusions
│   ├── Dockerfile            # Secure, non-root Node.js container blueprint
│   ├── package.json          
│   └── server.js             # Entry point
├── public/                   # Static assets
├── src/                      # React Frontend source
│   ├── components/           # Reusable components
│   ├── pages/                # Page components (Home, Explore, Guides)
│   ├── data/                 # Static data fallbacks
│   ├── styles/               # Global CSS
│   ├── App.jsx               # Main routing
│   └── main.jsx              # Entry point
├── .dockerignore             # Frontend build exclusions
├── docker-compose.yml        # 3-Tier Orchestration configuration
├── Dockerfile                # Multi-stage Nginx React container blueprint
├── package.json              # Frontend dependencies
├── vite.config.js            # Build configuration
└── README.md                 # This file
\`\`\`

---

## 🛠️ Development Guide

### Adding a New Page
1. Create page component in `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/common/Navbar.jsx`

## 🎯 To-Do List for Completion

### High Priority
- [ ] Complete Explore page with Leaflet map integration
- [ ] Complete Guides page with filtering
- [ ] Add GuideDetail page
- [ ] Add Contact form functionality

### Medium Priority
- [ ] Add TripPlanner functionality
- [ ] Implement search functionality
- [ ] Create booking system

---

## 🚀 Deployment (Cloud)

For production deployment beyond local Docker:

### Deploy to Vercel (Frontend only)
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

---

## 🐛 Troubleshooting

### Port Already in Use
If the Docker containers fail to start because ports `8080` or `5000` are taken:
\`\`\`bash
# Modify the port mapping in docker-compose.yml
# Example: change "8080:8080" to "8081:8080"
\`\`\`

### Backend Container Crashing
Ensure the MongoDB container is fully healthy. The orchestrator uses `depends_on: condition: service_healthy` to manage startup order automatically, but slower host machines may require a longer `start_period` in the `docker-compose.yml` healthcheck.

---

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 🙏 Acknowledgments

- Sri Lanka Tourism Development Authority for inspiration
- React, Node.js, and Docker communities for excellent tools
- Horizon Campus System Administration Module

---

**Built with ❤️ for Sri Lanka Tourism**

*Note: This is a student project for learning purposes. Some features are simulated and will be connected to real services in future iterations.*

---

**Student Names and IDs** ITBIN-2313-0112 — Dimuth Minsilu  
ITBIN-2313-0104 — Ashan Senanayaka  
ITBIN-2313-0131 — Akash Williyamge
