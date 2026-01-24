import Accommodation from '../models/Accommodation.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// @desc    Get all accommodations
// @route   GET /api/accommodations
// @access  Public
export const getAccommodations = asyncHandler(async (req, res, next) => {
  const {
    type,
    region,
    minPrice,
    maxPrice,
    rating,
    page = 1,
    limit = 10,
    sort = '-createdAt'
  } = req.query;

  // Build query
  const query = { isActive: true };

  if (type && type !== 'all') {
    query.type = type;
  }

  if (region && region !== 'all') {
    query.region = region;
  }

  if (rating) {
    query.rating = { $gte: parseFloat(rating) };
  }

  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const accommodations = await Accommodation.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limitNum)
    .populate('provider', 'name email phone');

  const total = await Accommodation.countDocuments(query);

  res.json({
    success: true,
    count: accommodations.length,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    data: accommodations
  });
});

// @desc    Get single accommodation
// @route   GET /api/accommodations/:id
// @access  Public
export const getAccommodation = asyncHandler(async (req, res, next) => {
  const accommodation = await Accommodation.findById(req.params.id)
    .populate('provider', 'name email phone');

  if (!accommodation || !accommodation.isActive) {
    return next(new ErrorResponse('Accommodation not found', 404));
  }

  res.json({
    success: true,
    data: accommodation
  });
});

// @desc    Create accommodation
// @route   POST /api/accommodations
// @access  Private (Guide/Admin)
export const createAccommodation = asyncHandler(async (req, res, next) => {
  req.body.provider = req.user.id;

  const accommodation = await Accommodation.create(req.body);

  res.status(201).json({
    success: true,
    data: accommodation
  });
});

// @desc    Update accommodation
// @route   PUT /api/accommodations/:id
// @access  Private (Guide/Admin)
export const updateAccommodation = asyncHandler(async (req, res, next) => {
  let accommodation = await Accommodation.findById(req.params.id);

  if (!accommodation) {
    return next(new ErrorResponse('Accommodation not found', 404));
  }

  // Make sure user is accommodation owner or admin
  if (accommodation.provider.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to update this accommodation', 403));
  }

  accommodation = await Accommodation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.json({
    success: true,
    data: accommodation
  });
});

// @desc    Delete accommodation
// @route   DELETE /api/accommodations/:id
// @access  Private (Guide/Admin)
export const deleteAccommodation = asyncHandler(async (req, res, next) => {
  const accommodation = await Accommodation.findById(req.params.id);

  if (!accommodation) {
    return next(new ErrorResponse('Accommodation not found', 404));
  }

  // Make sure user is accommodation owner or admin
  if (accommodation.provider.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to delete this accommodation', 403));
  }

  // Soft delete
  accommodation.isActive = false;
  await accommodation.save();

  res.json({
    success: true,
    message: 'Accommodation deleted successfully'
  });
});

// @desc    Search accommodations
// @route   GET /api/accommodations/search
// @access  Public
export const searchAccommodations = asyncHandler(async (req, res, next) => {
  const { q, lat, lng, radius = 50 } = req.query;

  let query = { isActive: true };

  // Text search
  if (q) {
    query.$or = [
      { name: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { location: { $regex: q, $options: 'i' } }
    ];
  }

  // Location-based search (if lat/lng provided)
  if (lat && lng) {
    // Simple distance calculation (for production, use geospatial queries)
    query['coordinates.lat'] = {
      $gte: parseFloat(lat) - 0.5,
      $lte: parseFloat(lat) + 0.5
    };
    query['coordinates.lng'] = {
      $gte: parseFloat(lng) - 0.5,
      $lte: parseFloat(lng) + 0.5
    };
  }

  const accommodations = await Accommodation.find(query)
    .limit(20)
    .populate('provider', 'name email');

  res.json({
    success: true,
    count: accommodations.length,
    data: accommodations
  });
});
