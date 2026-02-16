# 📚 Taprobane - Premium Sri Lanka Tourism Platform

**Complete Full-Stack Tourism Application | React + Node.js + MongoDB**

A modern, sophisticated web application for exploring Sri Lanka with premium design, smooth animations, and comprehensive travel features. This is a full-stack application with separate frontend and backend.

## 🎯 Quick Navigation

| What Do You Want? | Start Here |
|------------------|-----------|
| 🚀 **New to project** | [Backend Setup Complete](BACKEND_SETUP_COMPLETE.md) |
| 🏗️ **Set up backend** | [Backend Setup Guide](backend/BACKEND_SETUP.md) |
| 🔗 **Connect frontend to backend** | [Integration Guide](FRONTEND_BACKEND_INTEGRATION.md) |
| 📖 **Full API documentation** | [Backend Complete Guide](BACKEND_COMPLETE.md) |
| 💻 **Frontend code** | See `src/` folder |
| 🆘 **Having issues** | [Troubleshooting](BACKEND_SETUP_COMPLETE.md#troubleshooting) |

## 📚 Complete Documentation Index

See **[Documentation Index](DOCUMENTATION_INDEX.md)** for comprehensive guide to all documentation files.

---

## ✨ Features

### ✅ Implemented Features
- **Stunning Home Page** with smooth scroll animations and modern design
- **Premium Navigation** with responsive mobile menu
- **Interactive Map Integration** (ready for Leaflet implementation)
- **Verified Tour Guides Directory** with detailed profiles
- **Comprehensive Data** for attractions and guides
- **Responsive Design** that works perfectly on all devices
- **Smooth Page Transitions** using Framer Motion
- **Toast Notifications** for user feedback
- **Complete Backend API** with 7 routes and 35+ endpoints
- **JWT Authentication** for secure access
- **MongoDB Database** with 6 data models
- **Production-Ready** code and documentation

### 🎨 Design Highlights
- **Premium Typography** using Playfair Display and Sora fonts
- **Sophisticated Color Palette** inspired by Sri Lankan landscapes
- **Micro-interactions** and hover effects throughout
- **Glassmorphism** effects on key elements
- **Smooth Animations** using Framer Motion
- **Accessibility** focused design
- **Dark/Light Theme** support

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js v14+ and npm
- MongoDB (local or MongoDB Atlas)
- Git

### Step 1: Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure MONGODB_URI in .env
```

### Step 2: Start Backend
```bash
npm run dev
# Backend running on http://localhost:5000
```

### Step 3: Frontend (in another terminal)
```bash
cd ..
npm install
npm run dev
# Frontend running on http://localhost:3000
```

### Step 4: Verify
```bash
curl http://localhost:5000/api/health
# Should return: { "status": "OK", ... }
```

✅ **Both frontend and backend are running!**

---

## 📁 Complete Project Structure

```
thaprobase-premium/
├── public/                    # Static assets
├── src/
│   ├── components/           # Reusable components
│   │   ├── common/          # Shared components (Navbar, Footer)
│   │   ├── tourist/         # Tourist-specific components
│   │   └── provider/        # Service provider components
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # ✅ Premium landing page
│   │   ├── Explore.jsx      # Interactive map page
│   │   ├── Guides.jsx       # Tour guides directory
│   │   └── ...              # Other pages
│   ├── data/                # Static data
│   │   ├── attractions.js   # ✅ Attractions database
│   │   └── guides.js        # ✅ Guides database
│   ├── services/            # API integration layer
│   ├── styles/              # Global styles
│   │   └── index.css        # ✅ Premium design system
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── App.jsx              # ✅ Main app with routing
│   └── main.jsx             # ✅ Entry point
├── index.html               # ✅ HTML template
├── package.json             # ✅ Dependencies
├── vite.config.js           # ✅ Build configuration
└── README.md               # This file
```

## 🎨 Design System

### Colors
```css
--color-emerald: #1a5f3e      /* Primary brand color */
--color-gold: #d4af37          /* Accent/CTA color */
--color-coral: #ff6b6b         /* Warning/highlight */
--color-ocean: #0077be         /* Info/links */
```

### Typography
- **Display Font:** Playfair Display (headings, hero)
- **Body Font:** Sora (paragraphs, UI elements)

### Spacing Scale
Uses a consistent 8px base unit with semantic naming:
- xs, sm, md, lg, xl, 2xl, 3xl, 4xl

## 🛠️ Development Guide

### Adding a New Page

1. Create page component in `src/pages/`:
```jsx
// src/pages/NewPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './NewPage.css';

const NewPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>New Page</h1>
    </motion.div>
  );
};

export default NewPage;
```

2. Add route in `App.jsx`:
```jsx
import NewPage from './pages/NewPage';

// In Routes:
<Route path="/new-page" element={<NewPage />} />
```

3. Add navigation link in `Navbar.jsx`:
```jsx
{ path: '/new-page', label: 'New Page' }
```

### Adding New Data

Edit the data files in `src/data/`:

```javascript
// src/data/attractions.js
export const attractions = [
  {
    id: 1,
    name: "New Attraction",
    description: "Description here",
    category: "heritage",
    lat: 7.8731,
    lng: 80.7718,
    rating: 4.5,
    // ... more fields
  }
];
```

### Creating Components

Follow this structure for new components:

```jsx
import React from 'react';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  return (
    <div className="component-name">
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

## 🎯 To-Do List for Completion

### High Priority
- [ ] Complete Explore page with Leaflet map integration
- [ ] Complete Guides page with filtering
- [ ] Add GuideDetail page
- [ ] Complete Accommodations page
- [ ] Complete Transportation page
- [ ] Add Contact form functionality

### Medium Priority
- [ ] Add TripPlanner functionality
- [ ] Implement search functionality
- [ ] Add user authentication (optional)
- [ ] Create booking system
- [ ] Add favorites/wishlist feature

### Nice to Have
- [ ] Add blog section
- [ ] Implement reviews system
- [ ] Add image galleries
- [ ] Create mobile app version
- [ ] Add multiple language support

## 📦 Building for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

The build files will be in the `dist/` folder, ready to deploy.

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Deploy to GitHub Pages
```bash
npm run build
# Copy dist folder contents to gh-pages branch
```

## 🎓 Learning Resources

- **React:** https://react.dev/learn
- **Framer Motion:** https://www.framer.com/motion/
- **React Router:** https://reactrouter.com/
- **Vite:** https://vitejs.dev/
- **Leaflet:** https://leafletjs.com/

## 💡 Tips for Students

1. **Start Small:** Focus on one page at a time
2. **Use the Console:** Check browser console for errors
3. **Read Error Messages:** They usually tell you what's wrong
4. **Commit Often:** Save your work frequently with Git
5. **Ask for Help:** Don't struggle alone - use Stack Overflow

## 🐛 Common Issues

### Port Already in Use
```bash
# Kill the process on port 3000
# Then restart
npm run dev
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check for syntax errors in your code
# Make sure all imports are correct
npm run build
```

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

## 🤝 Contributing

This is a student project, but improvements are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 🙏 Acknowledgments

- Sri Lanka Tourism Development Authority for inspiration
- React and Vite communities for excellent tools
- All open-source contributors

## 📞 Support

For questions or issues:
- Check the code comments
- Review the Learning Resources section
- Search on Stack Overflow
- Create an issue on GitHub

---

**Built with ❤️ for Sri Lanka Tourism**

*Note: This is a student project for learning purposes. Some features are simulated and will be connected to real services in future iterations.*

**Student Names and IDs**  

ITBIN-2313-0112 — Dimuth Minsilu  
ITBIN-2313-0104 — Ashan Senanayaka  
ITBIN-2313-0131 — Akash Williyamge

