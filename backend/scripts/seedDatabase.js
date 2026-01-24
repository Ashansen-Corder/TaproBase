import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import Accommodation from '../models/Accommodation.model.js';
import Attraction from '../models/Attraction.model.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taprobane');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Accommodation.deleteMany({});
    await Attraction.deleteMany({});
    console.log('Cleared existing data');

    // Seed Accommodations
    const accommodations = [
      {
        name: 'Sigiriya Village Resort',
        type: 'Resort',
        description: 'Luxury resort with stunning views of Sigiriya Rock Fortress. Features spa, restaurant, and outdoor pool.',
        location: 'Dambulla, Sigiriya',
        coordinates: { lat: 7.9570, lng: 80.7603 },
        rating: 4.8,
        reviews: 523,
        pricePerNight: '$120-180',
        amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Air Conditioning'],
        roomTypes: ['Deluxe', 'Suite', 'Villa'],
        checkin: '14:00',
        checkout: '11:00',
        bestFor: 'Heritage Tours',
        region: 'Central Highlands'
      },
      {
        name: 'Kandy Lake Club',
        type: 'Boutique Hotel',
        description: 'Charming boutique hotel on the banks of Kandy Lake. Traditional architecture with modern amenities.',
        location: 'Kandy',
        coordinates: { lat: 7.2936, lng: 80.6410 },
        rating: 4.7,
        reviews: 428,
        pricePerNight: '$80-150',
        amenities: ['WiFi', 'Restaurant', 'Ayurveda Spa', 'Laundry', 'Parking'],
        roomTypes: ['Standard', 'Deluxe', 'Lake View'],
        checkin: '14:00',
        checkout: '11:00',
        bestFor: 'Cultural Experience',
        region: 'Central Highlands'
      },
      {
        name: 'Unawatuna Beach Cabanas',
        type: 'Beach Cabanas',
        description: 'Beachfront cabanas with direct access to Unawatuna Beach. Perfect for water sports and relaxation.',
        location: 'Unawatuna, Galle',
        coordinates: { lat: 6.0104, lng: 80.2491 },
        rating: 4.9,
        reviews: 612,
        pricePerNight: '$60-120',
        amenities: ['Beach Access', 'Snorkeling', 'Surf Board Rental', 'WiFi', 'Beach Bar'],
        roomTypes: ['Beach Cabana', 'Ocean View', 'Garden Room'],
        checkin: '14:00',
        checkout: '11:00',
        bestFor: 'Beach Holiday',
        region: 'South Coast'
      },
      {
        name: 'Ella Gap Mountain Lodge',
        type: 'Mountain Lodge',
        description: 'Cozy mountain lodge in Ella with hiking trails and panoramic views of tea plantations.',
        location: 'Ella',
        coordinates: { lat: 6.8667, lng: 81.0467 },
        rating: 4.6,
        reviews: 389,
        pricePerNight: '$50-100',
        amenities: ['Hiking Trails', 'Restaurant', 'WiFi', 'Garden', 'Hot Water'],
        roomTypes: ['Budget Room', 'Standard', 'Premium Room'],
        checkin: '15:00',
        checkout: '10:00',
        bestFor: 'Adventure & Trekking',
        region: 'Central Highlands'
      },
      {
        name: 'Yala Safari Lodge',
        type: 'Safari Lodge',
        description: 'Exclusive lodge near Yala National Park. Wildlife viewing, safari tours, and naturalist guides included.',
        location: 'Yala',
        coordinates: { lat: 6.3726, lng: 81.5198 },
        rating: 4.8,
        reviews: 467,
        pricePerNight: '$140-200',
        amenities: ['Safari Tours', 'Wildlife Expert', 'Observatory', 'Restaurant', 'WiFi'],
        roomTypes: ['Safari Room', 'Premium Lodge', 'Suite'],
        checkin: '14:00',
        checkout: '11:00',
        bestFor: 'Wildlife Adventure',
        region: 'South Coast'
      }
    ];

    await Accommodation.insertMany(accommodations);
    console.log(`Seeded ${accommodations.length} accommodations`);

    // Seed Attractions
    const attractions = [
      {
        name: 'Sigiriya Rock Fortress',
        description: 'Ancient rock fortress and UNESCO World Heritage site with breathtaking frescoes',
        category: 'heritage',
        coordinates: { lat: 7.9570, lng: 80.7603 },
        rating: 4.9,
        reviews: 3421,
        entranceFee: 'USD 30',
        duration: '3-4 hours'
      },
      {
        name: 'Temple of the Tooth',
        description: 'Sacred Buddhist temple in Kandy housing a relic of Buddha\'s tooth',
        category: 'heritage',
        coordinates: { lat: 7.2936, lng: 80.6410 },
        rating: 4.8,
        reviews: 2876,
        entranceFee: 'LKR 2000',
        duration: '1-2 hours'
      },
      {
        name: 'Unawatuna Beach',
        description: 'Pristine crescent-shaped beach perfect for swimming and water sports',
        category: 'beach',
        coordinates: { lat: 6.0104, lng: 80.2491 },
        rating: 4.7,
        reviews: 1956,
        entranceFee: 'Free',
        duration: 'Full day'
      },
      {
        name: 'Yala National Park',
        description: 'Premier wildlife sanctuary famous for leopards and elephants',
        category: 'nature',
        coordinates: { lat: 6.3726, lng: 81.5198 },
        rating: 4.8,
        reviews: 2134,
        entranceFee: 'USD 25',
        duration: 'Half day'
      },
      {
        name: 'Ella Rock',
        description: 'Spectacular hiking trail with panoramic views of tea plantations',
        category: 'adventure',
        coordinates: { lat: 6.8667, lng: 81.0467 },
        rating: 4.9,
        reviews: 1823,
        entranceFee: 'Free',
        duration: '4-5 hours'
      }
    ];

    await Attraction.insertMany(attractions);
    console.log(`Seeded ${attractions.length} attractions`);

    // Seed Guides
    const guides = [
      {
        name: 'Chaminda Perera',
        email: 'chaminda@thaprobase.lk',
        password: 'password123',
        role: 'guide',
        bio: 'Certified guide with 15 years of experience specializing in cultural and heritage tours',
        location: 'Kandy',
        languages: ['English', 'German', 'Sinhala', 'Tamil'],
        specialties: ['Heritage Sites', 'Cultural Tours', 'Photography', 'History'],
        hourlyRate: 'USD 15',
        dailyRate: 'USD 100',
        verified: true,
        experience: '15 years',
        availability: 'Available',
        rating: 4.9,
        reviews: 156,
        highlights: [
          'UNESCO World Heritage expert',
          'Professional photographer',
          'Fluent in 4 languages'
        ],
        contact: {
          phone: '+94 77 123 4567',
          email: 'chaminda@thaprobase.lk'
        }
      },
      {
        name: 'Anjali Fernando',
        email: 'anjali@thaprobase.lk',
        password: 'password123',
        role: 'guide',
        bio: 'Passionate about wildlife and nature. Expert in safari tours and bird watching',
        location: 'Yala',
        languages: ['English', 'French', 'Sinhala'],
        specialties: ['Wildlife Safari', 'Nature Tours', 'Bird Watching', 'Eco-tourism'],
        hourlyRate: 'USD 20',
        dailyRate: 'USD 120',
        verified: true,
        experience: '10 years',
        availability: 'Available',
        rating: 4.8,
        reviews: 98,
        highlights: [
          'Certified wildlife guide',
          'Published wildlife photographer',
          'Eco-tourism advocate'
        ],
        contact: {
          phone: '+94 77 234 5678',
          email: 'anjali@thaprobase.lk'
        }
      },
      {
        name: 'Rohan Silva',
        email: 'rohan@thaprobase.lk',
        password: 'password123',
        role: 'guide',
        bio: 'Adventure enthusiast and hiking expert. Leading treks for over 10 years',
        location: 'Ella',
        languages: ['English', 'Spanish', 'Sinhala'],
        specialties: ['Hiking', 'Adventure Tours', 'Mountain Climbing', 'Camping'],
        hourlyRate: 'USD 18',
        dailyRate: 'USD 110',
        verified: true,
        experience: '10 years',
        availability: 'Available',
        rating: 4.7,
        reviews: 123,
        highlights: [
          'Mountain rescue certified',
          'First aid expert',
          'Adventure specialist'
        ],
        contact: {
          phone: '+94 77 345 6789',
          email: 'rohan@thaprobase.lk'
        }
      }
    ];

    await User.insertMany(guides);
    console.log(`Seeded ${guides.length} guides`);

    // Seed a test tourist
    const tourist = await User.create({
      name: 'Test Tourist',
      email: 'tourist@test.com',
      password: 'password123',
      role: 'tourist',
      phone: '+94 77 000 0000',
      nationality: 'USA'
    });
    console.log('Seeded test tourist:', tourist.email);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
