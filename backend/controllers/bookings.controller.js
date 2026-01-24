import Booking from '../models/Booking.model.js';
import Accommodation from '../models/Accommodation.model.js';
import User from '../models/User.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = asyncHandler(async (req, res, next) => {
  const { type, accommodation, guide, checkIn, checkOut, guests, roomType, startDate, endDate, duration, tourType, specialRequests } = req.body;

  if (type === 'accommodation') {
    if (!accommodation || !checkIn || !checkOut) {
      return next(new ErrorResponse('Please provide accommodation, check-in and check-out dates', 400));
    }

    const accommodationDoc = await Accommodation.findById(accommodation);
    if (!accommodationDoc || !accommodationDoc.isActive) {
      return next(new ErrorResponse('Accommodation not found', 404));
    }

    // Calculate total amount (simplified - in production, calculate based on dates and room type)
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    // Extract price range and calculate average (simplified)
    const priceStr = accommodationDoc.pricePerNight;
    const priceMatch = priceStr.match(/\$?(\d+)/);
    const avgPrice = priceMatch ? parseInt(priceMatch[1]) * 1.5 : 100;
    const totalAmount = nights * avgPrice * (guests || 1);

    const booking = await Booking.create({
      user: req.user.id,
      type: 'accommodation',
      accommodation,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guests || 1,
      roomType,
      totalAmount,
      specialRequests,
      contactInfo: {
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone
      }
    });

    res.status(201).json({
      success: true,
      data: booking
    });
  } else if (type === 'guide') {
    if (!guide || !startDate) {
      return next(new ErrorResponse('Please provide guide and start date', 400));
    }

    const guideDoc = await User.findById(guide);
    if (!guideDoc || guideDoc.role !== 'guide' || !guideDoc.isActive) {
      return next(new ErrorResponse('Guide not found', 404));
    }

    // Calculate total amount
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(start.getTime() + 24 * 60 * 60 * 1000);
    
    let totalAmount = 0;
    if (duration === 'hourly') {
      const rateStr = guideDoc.hourlyRate || 'USD 15';
      const rateMatch = rateStr.match(/\$?(\d+)/);
      const hourlyRate = rateMatch ? parseInt(rateMatch[1]) : 15;
      const hours = Math.ceil((end - start) / (1000 * 60 * 60));
      totalAmount = hours * hourlyRate;
    } else {
      const rateStr = guideDoc.dailyRate || 'USD 100';
      const rateMatch = rateStr.match(/\$?(\d+)/);
      const dailyRate = rateMatch ? parseInt(rateMatch[1]) : 100;
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      totalAmount = days * dailyRate;
    }

    const booking = await Booking.create({
      user: req.user.id,
      type: 'guide',
      guide,
      startDate: start,
      endDate: end,
      duration: duration || 'daily',
      tourType,
      totalAmount,
      specialRequests,
      contactInfo: {
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone
      }
    });

    res.status(201).json({
      success: true,
      data: booking
    });
  } else {
    return next(new ErrorResponse('Invalid booking type', 400));
  }
});

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
export const getUserBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate('accommodation')
    .populate('guide', 'name email phone location rating')
    .sort('-createdAt');

  res.json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Get all bookings (for admin/guides)
// @route   GET /api/bookings/all
// @access  Private
export const getBookings = asyncHandler(async (req, res, next) => {
  let query = {};

  // Guides can only see their own bookings
  if (req.user.role === 'guide') {
    query.guide = req.user.id;
  }
  // Admins can see all

  const bookings = await Booking.find(query)
    .populate('user', 'name email phone')
    .populate('accommodation')
    .populate('guide', 'name email phone')
    .sort('-createdAt');

  res.json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate('user', 'name email phone')
    .populate('accommodation')
    .populate('guide', 'name email phone location rating specialties');

  if (!booking) {
    return next(new ErrorResponse('Booking not found', 404));
  }

  // Check authorization
  if (booking.user._id.toString() !== req.user.id && 
      req.user.role !== 'admin' && 
      (req.user.role !== 'guide' || booking.guide?._id?.toString() !== req.user.id)) {
    return next(new ErrorResponse('Not authorized to view this booking', 403));
  }

  res.json({
    success: true,
    data: booking
  });
});

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
export const updateBooking = asyncHandler(async (req, res, next) => {
  let booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorResponse('Booking not found', 404));
  }

  // Check authorization
  if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to update this booking', 403));
  }

  // Don't allow updating certain fields
  delete req.body.user;
  delete req.body.type;
  delete req.body.totalAmount;

  booking = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate('accommodation').populate('guide', 'name email phone');

  res.json({
    success: true,
    data: booking
  });
});

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const cancelBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorResponse('Booking not found', 404));
  }

  // Check authorization
  if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to cancel this booking', 403));
  }

  booking.status = 'cancelled';
  await booking.save();

  res.json({
    success: true,
    message: 'Booking cancelled successfully',
    data: booking
  });
});
