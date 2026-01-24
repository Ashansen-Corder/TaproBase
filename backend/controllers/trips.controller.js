import Trip from '../models/Trip.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// @desc    Create trip
// @route   POST /api/trips
// @access  Private
export const createTrip = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const trip = await Trip.create(req.body);

  res.status(201).json({
    success: true,
    data: trip
  });
});

// @desc    Get user trips
// @route   GET /api/trips
// @access  Private
export const getTrips = asyncHandler(async (req, res, next) => {
  const trips = await Trip.find({ user: req.user.id })
    .populate('accommodations.accommodation')
    .populate('guides.guide', 'name location rating')
    .populate('attractions.attraction')
    .sort('-createdAt');

  res.json({
    success: true,
    count: trips.length,
    data: trips
  });
});

// @desc    Get public trips
// @route   GET /api/trips/public
// @access  Public
export const getPublicTrips = asyncHandler(async (req, res, next) => {
  const trips = await Trip.find({ isPublic: true })
    .populate('user', 'name')
    .populate('accommodations.accommodation', 'name location')
    .populate('guides.guide', 'name location')
    .populate('attractions.attraction', 'name category')
    .sort('-createdAt')
    .limit(20);

  res.json({
    success: true,
    count: trips.length,
    data: trips
  });
});

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Private
export const getTrip = asyncHandler(async (req, res, next) => {
  const trip = await Trip.findById(req.params.id)
    .populate('user', 'name email')
    .populate('accommodations.accommodation')
    .populate('guides.guide', 'name location rating specialties languages')
    .populate('attractions.attraction');

  if (!trip) {
    return next(new ErrorResponse('Trip not found', 404));
  }

  // Check authorization
  if (trip.user._id.toString() !== req.user.id && !trip.isPublic && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to view this trip', 403));
  }

  res.json({
    success: true,
    data: trip
  });
});

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
export const updateTrip = asyncHandler(async (req, res, next) => {
  let trip = await Trip.findById(req.params.id);

  if (!trip) {
    return next(new ErrorResponse('Trip not found', 404));
  }

  // Check authorization
  if (trip.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to update this trip', 403));
  }

  trip = await Trip.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  )
    .populate('accommodations.accommodation')
    .populate('guides.guide')
    .populate('attractions.attraction');

  res.json({
    success: true,
    data: trip
  });
});

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private
export const deleteTrip = asyncHandler(async (req, res, next) => {
  const trip = await Trip.findById(req.params.id);

  if (!trip) {
    return next(new ErrorResponse('Trip not found', 404));
  }

  // Check authorization
  if (trip.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to delete this trip', 403));
  }

  await trip.deleteOne();

  res.json({
    success: true,
    message: 'Trip deleted successfully'
  });
});
