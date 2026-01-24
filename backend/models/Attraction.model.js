import mongoose from 'mongoose';

const attractionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide attraction name'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['heritage', 'beach', 'nature', 'adventure', 'cultural', 'religious', 'wildlife']
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
  entranceFee: {
    type: String,
    default: 'Free'
  },
  duration: {
    type: String
  },
  images: {
    type: [String],
    default: []
  },
  bestTimeToVisit: {
    type: String
  },
  openingHours: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for location search
attractionSchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });
attractionSchema.index({ category: 1 });

const Attraction = mongoose.model('Attraction', attractionSchema);

export default Attraction;
