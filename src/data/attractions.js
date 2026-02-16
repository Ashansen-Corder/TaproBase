export const categories = [
  { id: 'all', label: 'All Attractions', icon: '📍' },
  { id: 'heritage', label: 'Heritage', icon: '🏛️' },
  { id: 'beach', label: 'Beaches', icon: '🏖️' },
  { id: 'nature', label: 'Nature & Wildlife', icon: '🌿' }
];

export const attractions = [
  {
    id: 1,
    name: 'Sigiriya Rock Fortress',
    category: 'heritage',
    image: '/images/sigiriya.jpg',
    description: 'Ancient rock fortress and UNESCO World Heritage site featuring historic frescoes.',
    duration: '3-4 hours',
    entrance_fee: 'USD 30',
    rating: 4.9,
    reviews: 2450,
    lat: 7.9570,
    lng: 80.7603
  },
  {
    id: 2,
    name: 'Temple of the Tooth',
    category: 'heritage',
    image: '/images/temple.jpg',
    description: "Sacred Buddhist temple in Kandy housing a relic of Buddha's tooth.",
    duration: '1-2 hours',
    entrance_fee: 'LKR 2000',
    rating: 4.8,
    reviews: 3120,
    lat: 7.2936,
    lng: 80.6413
  },
  {
    id: 3,
    name: 'Unawatuna Beach',
    category: 'beach',
    image: '/images/unawatuna.jpg',
    description: 'Pristine crescent-shaped beach perfect for swimming and water sports.',
    duration: 'Full day',
    entrance_fee: 'Free',
    rating: 4.7,
    reviews: 1890,
    lat: 6.0113,
    lng: 80.2483
  },
  {
    id: 4,
    name: 'Yala National Park',
    category: 'nature',
    image: '/images/yala.jpg',
    description: 'Premier wildlife sanctuary famous for leopards and elephants.',
    duration: 'Half day',
    entrance_fee: 'USD 25',
    rating: 4.8,
    reviews: 4200,
    lat: 6.3670,
    lng: 81.5173
  },
  {
    id: 5,
    name: 'Ella Rock',
    category: 'nature',
    image: '/images/ella-rock.jpg',
    description: 'A famous cliff offering panoramic views of the misty highlands and tea estates.',
    duration: '3-4 hours',
    entrance_fee: 'Free',
    rating: 4.8,
    reviews: 850,
    lat: 6.8567,
    lng: 81.0450
  }
];