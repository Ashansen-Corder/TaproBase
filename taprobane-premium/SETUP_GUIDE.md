# 🚀 TAPROBANE PREMIUM - COMPLETE SETUP GUIDE

## Step-by-Step Installation & Setup

### Prerequisites Check

Before starting, make sure you have:
- ✅ Node.js v18+ installed
- ✅ npm or yarn installed
- ✅ Git installed
- ✅ VS Code (or any code editor)

Verify installations:
```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
git --version     # Should show git version
```

---

## 📥 STEP 1: Get the Code

### Option A: If you have a ZIP file
1. Extract the `taprobane-premium` folder to your desired location
2. Open Terminal/Command Prompt
3. Navigate to the folder:
```bash
cd path/to/taprobane-premium
```

### Option B: If using Git
```bash
git clone YOUR_REPOSITORY_URL
cd taprobane-premium
```

---

## 📦 STEP 2: Install Dependencies

This will install all the required packages (React, Framer Motion, etc.):

```bash
npm install
```

**This will take 2-5 minutes.** You'll see a progress bar.

### If you see any errors:
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

---

## 🎨 STEP 3: Start Development Server

```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

**Open your browser and go to:** `http://localhost:3000`

You should see the beautiful Taprobane home page! 🎉

---

## 🔍 STEP 4: Explore the Project

### Project Structure Overview

```
taprobane-premium/
├── src/
│   ├── components/
│   │   └── common/
│   │       ├── Navbar.jsx      ✅ Premium navigation
│   │       ├── Navbar.css
│   │       ├── Footer.jsx      ✅ Complete footer
│   │       ├── Footer.css
│   │       └── ScrollToTop.jsx
│   ├── pages/
│   │   ├── Home.jsx            ✅ Stunning hero & sections
│   │   ├── Home.css
│   │   ├── Explore.jsx         📝 Stub (to complete)
│   │   ├── Guides.jsx          📝 Stub (to complete)
│   │   └── ...other pages
│   ├── data/
│   │   ├── attractions.js      ✅ 5+ attractions with details
│   │   └── guides.js           ✅ 6+ verified guides
│   ├── styles/
│   │   └── index.css           ✅ Complete design system
│   ├── App.jsx                 ✅ Routing setup
│   └── main.jsx
├── index.html                  ✅ With Google Fonts
├── package.json                ✅ All dependencies
└── vite.config.js
```

---

## 🎯 STEP 5: Test Navigation

Click through all the navigation links:
- **Home** - Should show the complete landing page
- **Explore** - Placeholder page
- **Guides** - Placeholder page
- **Stay** - Placeholder page
- **Transport** - Placeholder page
- **Plan Trip** - Placeholder page

All pages should load without errors.

---

## 🛠️ STEP 6: Customize & Build

### Change Colors

Edit `src/styles/index.css` (line 30-50):
```css
:root {
  --color-emerald: #1a5f3e;    /* Change to your primary color */
  --color-gold: #d4af37;       /* Change to your accent color */
  /* ... more colors */
}
```

### Add More Attractions

Edit `src/data/attractions.js`:
```javascript
{
  id: 6,
  name: "Your Attraction",
  description: "Description here",
  category: "heritage",
  lat: 7.8731,
  lng: 80.7718,
  rating: 4.5,
  reviews: 100,
  entrance_fee: "Free",
  image: "🎯",
  duration: "2 hours"
}
```

### Save & See Changes

The browser will automatically reload when you save files!

---

## 📝 STEP 7: Complete the Stub Pages

The following pages need to be completed:

### High Priority:
1. **Explore.jsx** - Add interactive map with Leaflet
2. **Guides.jsx** - Show guide cards with filtering
3. **GuideDetail.jsx** - Individual guide profile page

### Medium Priority:
4. **Accommodations.jsx** - Hotel listings
5. **Transportation.jsx** - Transport options
6. **Contact.jsx** - Contact form

### Example: Complete Guides.jsx

Replace the content with this structure:
```jsx
import React, { useState } from 'react';
import { guides } from '../data/guides';

const Guides = () => {
  const [filter, setFilter] = useState('all');
  
  return (
    <div className="container section">
      <h1>Tour Guides</h1>
      {/* Add filtering UI */}
      {/* Map through guides and display cards */}
    </div>
  );
};
```

---

## 🚀 STEP 8: Build for Production

When you're ready to deploy:

```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

### Test the Production Build

```bash
npm run preview
```

Opens the production build at `http://localhost:4173`

---

## 🌐 STEP 9: Deploy Online

### Option A: Vercel (Easiest)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Follow the prompts. Your site will be live in 2 minutes!

### Option B: Netlify

1. Sign up at https://netlify.com
2. Drag and drop the `dist/` folder
3. Your site is live!

### Option C: GitHub Pages

1. Push code to GitHub
2. Go to Settings → Pages
3. Select branch and folder
4. Your site will be at `username.github.io/repo-name`

---

## 🐛 Common Issues & Solutions

### Issue: Port 3000 already in use
**Solution:**
```bash
# Kill the process
# Mac/Linux:
lsof -ti:3000 | xargs kill -9
# Windows:
netstat -ano | findstr :3000
# Then kill the PID

# Or just change the port in vite.config.js
```

### Issue: npm install fails
**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Blank page after npm run dev
**Solution:**
1. Check browser console for errors (F12)
2. Make sure all imports are correct
3. Check if port is correct

### Issue: Changes not appearing
**Solution:**
1. Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
2. Clear browser cache
3. Restart dev server

---

## 📚 Learning Path

### Week 1: Understand the Code
- Read through Home.jsx
- Understand the data structure
- Play with colors and styles

### Week 2: Complete One Feature
- Pick Explore or Guides page
- Implement using data files
- Add styling

### Week 3: Add Functionality
- Implement search
- Add filters
- Create detail pages

### Week 4: Polish & Deploy
- Test everything
- Fix bugs
- Deploy online
- Add to portfolio!

---

## 🎓 Resources

### Official Docs
- React: https://react.dev/learn
- Framer Motion: https://www.framer.com/motion/
- Vite: https://vitejs.dev/guide/

### Tutorials
- React Router: https://reactrouter.com/en/main/start/tutorial
- CSS Tricks: https://css-tricks.com/
- Flexbox Guide: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

### Tools
- React DevTools: Browser extension for debugging
- VS Code Extensions: ES7 React snippets, Prettier
- Color Palette: coolors.co

---

## ✅ Success Checklist

Before considering the project complete:

- [ ] All pages load without errors
- [ ] Navigation works on mobile and desktop
- [ ] At least 3 main pages are fully functional
- [ ] Data displays correctly from data files
- [ ] Site is responsive (test on phone)
- [ ] No console errors (F12 in browser)
- [ ] Code is commented
- [ ] README is updated
- [ ] Site is deployed online
- [ ] Added to your portfolio

---

## 💡 Pro Tips

1. **Commit Often**: Save your work with Git every time you complete a feature
2. **Test Early**: Check in browser frequently while coding
3. **Use Console**: F12 → Console tab shows errors
4. **Mobile First**: Test on phone regularly
5. **Ask for Help**: Stack Overflow, Discord, Reddit

---

## 🎉 You're Ready!

You now have a premium, production-quality tourism website template. The foundation is solid - now make it yours!

### Next Steps:
1. Run `npm install`
2. Run `npm run dev`
3. Open browser to `localhost:3000`
4. Start customizing!

**Good luck with your project! 🚀**

---

*Need help? Check the main README.md file or create an issue on GitHub.*
