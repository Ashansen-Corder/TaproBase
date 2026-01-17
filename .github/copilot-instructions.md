# Taprobane Tourism App - AI Coding Instructions

## Project Overview
Taprobane is a premium Sri Lanka tourism web application built with **React 18**, **Vite**, **Framer Motion**, and **React Router**. It features a sophisticated design system, smooth animations, and a modular component architecture designed for scalability.

## Architecture & Data Flow

### Core Stack
- **Frontend Framework:** React 18 with React Router v6 for client-side routing
- **Build Tool:** Vite (dev server port 3000, auto-opens browser)
- **Animations:** Framer Motion for page transitions and micro-interactions
- **Icons:** Lucide React (24px default size)
- **State Management:** Zustand (installed but not actively used yet)
- **HTTP Client:** Axios (prepared for API integration)
- **UI Notifications:** React Hot Toast (top-right, dark theme, 3s default)

### Data Architecture Pattern
Data is currently **static** (no backend API) and stored in `src/data/`:
- **[attractions.js](src/data/attractions.js):** 5 attractions with fields: `id, name, description, category, lat, lng, rating, reviews, entrance_fee, image (emoji), duration`
- **[guides.js](src/data/guides.js):** 6 verified guides with fields: `id, name, bio, rating, reviews, languages, specialties, location, hourlyRate, dailyRate, verified, contact`
- Both files export arrays and metadata (e.g., `guideSpecialties`, `guideLanguages`, `categories`)

### Page Structure
All pages follow the motion animation pattern:
```jsx
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container section">
```
This enables smooth fade transitions via Framer Motion's `AnimatePresence` in [App.jsx](src/App.jsx).

## Key Files & Patterns

### Layout Components (Persistent Across Routes)
- **[Navbar.jsx](src/components/common/Navbar.jsx):** Sticky nav with scroll detection, active state indicators, mobile hamburger menu
- **[Footer.jsx](src/components/common/Footer.jsx):** Multi-column footer with social links (hardcoded URLs to social platforms)
- **[ScrollToTop.jsx](src/components/common/ScrollToTop.jsx):** Auto-scrolls to top on route change

### Critical Page Implementation
- **[Home.jsx](src/pages/Home.jsx):** Complete reference implementation with hero section, feature cards, destination grid, statistics, and "why us" section. Uses `useInView` from Framer Motion for lazy animation triggers.
- **Stub Pages** (to complete): Explore, Guides, GuideDetail, Accommodations, Transportation, Contact, TripPlanner, About

### Design System
**[styles/index.css](src/styles/index.css)** defines everything:
- **Color Variables:** `--color-emerald` (primary #1a5f3e), `--color-gold` (accent #d4af37), `--color-ocean`, `--color-coral`
- **Spacing:** 8px base unit (xs=0.5rem through 4xl=8rem)
- **Typography:** Inter font family, responsive heading sizes using `clamp()`
- **Utilities:** `.container`, `.section`, `.btn` (4 styles: primary, secondary, gold, ghost), `.card`, `.badge`, `.grid-cols-*`
- **Responsive Breakpoints:** 1024px (hide-lg), 768px (hide-md), 640px (hide-sm)

### Navigation Routes (App.jsx)
```
/ → Home
/explore → Explore (interactive map - stub)
/guides → Guides (guide listing - stub)
/guides/:id → GuideDetail (guide profile - stub)
/accommodations → Accommodations (stub)
/transportation → Transportation (stub)
/planner → TripPlanner (stub)
/about → About
/contact → Contact (stub)
```

## Conventions & Patterns

### Component Patterns
1. **Functional Components Only:** Always use `const ComponentName = () => {}`
2. **Imports Order:** React/libs → local components → styles
3. **Framer Motion in All Pages:** Mandatory `initial/animate/exit` for page consistency
4. **Icon Usage:** `import { IconName } from 'lucide-react'` then `<IconName size={18} />`
5. **UseInView Lazy Animation:** 
   ```jsx
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true });
   <motion.div ref={ref} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} />
   ```

### CSS Conventions
- **CSS Modules Not Used:** Global styles + scoped classNames only
- **Class Naming:** kebab-case (e.g., `feature-card`, `navbar-logo`)
- **Responsive Classes:** `hide-lg`, `hide-md`, `hide-sm` for display toggles
- **Utilities:** Use existing `.container`, `.btn-*`, `.grid-cols-*` before adding custom CSS
- **Color Usage:** Always reference CSS variables (`var(--color-emerald)`) not hardcodes

### Data Consumption Pattern
- Import data at component top: `import { attractions } from '../data/attractions';`
- Map arrays directly: `{attractions.map((item) => <Card key={item.id} item={item} />)}`
- No destructuring in component logic (keep data sources explicit)

## Common Tasks & Solutions

### Complete a Stub Page (e.g., Guides)
1. Import data: `import { guides, guideSpecialties } from '../data/guides';`
2. Add state for filters: `const [filter, setFilter] = useState('all');`
3. Create reusable card component within page file
4. Map guides with Framer Motion entry animation (use `useInView` pattern)
5. Add CSS file with layout grid (reference Home.css structure)

### Add a Feature to Map Component
- Map is ready to integrate (Leaflet installed in dependencies)
- Use [react-leaflet](react-leaflet.js.org) pattern for component-based map
- Store attractions as `react-leaflet` markers with lat/lng from data
- Reference [Explore.jsx](src/pages/Explore.jsx) TODO comments

### Add Form Validation
- Use HTML5 validation (`required`, `type="email"`, etc.)
- React Hot Toast for success/error feedback: `toast.success("Message")` or `toast.error("Error")`
- No external form libraries in use

### Create a New Data File
- Export array of objects with consistent, required fields
- Include metadata export (e.g., categories, specialties)
- Keep IDs numeric and sequential
- Use emojis for visual placeholders (image field uses Unicode emoji)

## Build & Development Commands
```bash
npm run dev      # Start Vite dev server (auto-opens port 3000)
npm run build    # Production build to dist/
npm run preview  # Preview dist/ locally on port 4173
npm run lint     # ESLint check (max-warnings: 0)
```

## Performance & Optimization Notes
- **Lazy Animation Triggers:** Always use `useInView` with `once: true` to animate sections on first scroll into view
- **Image Optimization:** Currently using Unicode emojis; ready for SVG/image URLs
- **No API Integration Yet:** All data is static; Axios configured but unused (ready for backend integration)
- **Bundle Size Consideration:** Zustand and Leaflet are installed but Zustand not yet adopted (consider for complex state)

## Common Pitfalls to Avoid
1. **Forget Exit Animations:** All motion.div in pages MUST have `exit={{ opacity: 0 }}` for `AnimatePresence` to work
2. **Hardcode Colors:** Use CSS variables; never hardcode hex values in components
3. **Misuse .container:** Always wrap section content; don't create nested containers
4. **Missing Keys in Maps:** Always include `key={item.id}` when mapping data
5. **Inconsistent Spacing:** Use spacing variables (`--space-lg`, etc.) not arbitrary px values
6. **Break Mobile Menu:** Test hamburger menu at 1024px breakpoint on every nav change

## Next High-Priority Features to Implement
1. **[Guides.jsx](src/pages/Guides.jsx):** Grid of guide cards with specialty filtering (reference Home.jsx card patterns)
2. **[Explore.jsx](src/pages/Explore.jsx):** Leaflet map with attraction markers and category filtering
3. **[GuideDetail.jsx](src/pages/GuideDetail.jsx):** Use URL param `:id`, fetch guide from data, show full profile + contact info
4. **Contact Form:** Simple form component with Toast notifications for submission feedback

## File Structure Reference
```
src/
├── components/common/      # Layout: Navbar, Footer, ScrollToTop
├── pages/                  # Route pages (Home fully implemented, others are stubs)
├── data/                   # Static data exports (attractions.js, guides.js)
├── styles/index.css        # Design system (colors, spacing, utilities, animations)
├── App.jsx                 # Route config + Toaster setup
└── main.jsx                # React entry point
```

---

**Last Updated:** January 2026 | **Status:** Design system complete, core layout done, page stubs ready for implementation
