import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['accommodation', 'guide'],
    required: true
  },
  accommodation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accommodation'
  },
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  checkIn: {
    type: Date
  },
  checkOut: {
    type: Date
  },
  guests: {
    type: Number,
    default: 1
  },
  roomType: {
    type: String
  },
  // Guide booking specific
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  duration: {
    type: String,
    enum: ['hourly', 'daily']
  },
  tourType: {
    type: String
  },
  // Common fields
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  specialRequests: {
    type: String
  },
  contactInfo: {
    name: String,
    email: String,
    phone: String
  }
}, {
  timestamps: true
});

// Indexes
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ type: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
