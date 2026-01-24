import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide accommodation name'],
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Resort', 'Hotel', 'Boutique Hotel', 'Beach Cabanas', 'Mountain Lodge', 'Heritage Hotel', 'Cottage', 'Safari Lodge', 'City Hotel']
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  images: {
    type: [String],
    default: []
  },
  pricePerNight: {
    type: String,
    required: true
  },
  amenities: {
    type: [String],
    default: []
  },
  roomTypes: {
    type: [String],
    default: []
  },
  checkin: {
    type: String,
    default: '14:00'
  },
  checkout: {
    type: String,
    default: '11:00'
  },
  bestFor: {
    type: String
  },
  region: {
    type: String,
    enum: ['Central Highlands', 'South Coast', 'West Coast', 'North', 'East']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for location search
accommodationSchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });
accommodationSchema.index({ type: 1 });
accommodationSchema.index({ region: 1 });

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

export default Accommodation;
