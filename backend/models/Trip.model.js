import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  destinations: [{
    name: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    order: Number,
    days: Number
  }],
  itinerary: [{
    day: Number,
    date: Date,
    activities: [{
      time: String,
      activity: String,
      location: String,
      type: {
        type: String,
        enum: ['attraction', 'accommodation', 'restaurant', 'transport', 'other']
      },
      notes: String
    }]
  }],
  accommodations: [{
    accommodation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accommodation'
    },
    checkIn: Date,
    checkOut: Date,
    notes: String
  }],
  guides: [{
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    date: Date,
    duration: String,
    notes: String
  }],
  attractions: [{
    attraction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attraction'
    },
    date: Date,
    order: Number,
    notes: String
  }],
  budget: {
    total: Number,
    accommodation: Number,
    transport: Number,
    food: Number,
    activities: Number
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  isShared: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
tripSchema.index({ user: 1, createdAt: -1 });
tripSchema.index({ isPublic: 1 });

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
