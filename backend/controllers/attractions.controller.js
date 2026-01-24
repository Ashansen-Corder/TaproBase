import Attraction from '../models/Attraction.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// @desc    Get all attractions
// @route   GET /api/attractions
// @access  Public
export const getAttractions = asyncHandler(async (req, res, next) => {
  const {
    category,
    rating,
    page = 1,
    limit = 10,
    sort = '-createdAt'
  } = req.query;

  // Build query
  const query = { isActive: true };

  if (category && category !== 'all') {
    query.category = category;
  }

  if (rating) {
    query.rating = { $gte: parseFloat(rating) };
  }

  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const attractions = await Attraction.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limitNum);

  const total = await Attraction.countDocuments(query);

  res.json({
    success: true,
    count: attractions.length,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    data: attractions
  });
});

// @desc    Get single attraction
// @route   GET /api/attractions/:id
// @access  Public
export const getAttraction = asyncHandler(async (req, res, next) => {
  const attraction = await Attraction.findById(req.params.id);

  if (!attraction || !attraction.isActive) {
    return next(new ErrorResponse('Attraction not found', 404));
  }

  res.json({
    success: true,
    data: attraction
  });
});

// @desc    Create attraction
// @route   POST /api/attractions
// @access  Private (Admin)
export const createAttraction = asyncHandler(async (req, res, next) => {
  const attraction = await Attraction.create(req.body);

  res.status(201).json({
    success: true,
    data: attraction
  });
});

// @desc    Update attraction
// @route   PUT /api/attractions/:id
// @access  Private (Admin)
export const updateAttraction = asyncHandler(async (req, res, next) => {
  let attraction = await Attraction.findById(req.params.id);

  if (!attraction) {
    return next(new ErrorResponse('Attraction not found', 404));
  }

  attraction = await Attraction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.json({
    success: true,
    data: attraction
  });
});

// @desc    Delete attraction
// @route   DELETE /api/attractions/:id
// @access  Private (Admin)
export const deleteAttraction = asyncHandler(async (req, res, next) => {
  const attraction = await Attraction.findById(req.params.id);

  if (!attraction) {
    return next(new ErrorResponse('Attraction not found', 404));
  }

  // Soft delete
  attraction.isActive = false;
  await attraction.save();

  res.json({
    success: true,
    message: 'Attraction deleted successfully'
  });
});

// @desc    Search attractions
// @route   GET /api/attractions/search
// @access  Public
export const searchAttractions = asyncHandler(async (req, res, next) => {
  const { q, category, lat, lng } = req.query;

  let query = { isActive: true };

  // Text search
  if (q) {
    query.$or = [
      { name: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } }
    ];
  }

  if (category && category !== 'all') {
    query.category = category;
  }

  // Location-based search
  if (lat && lng) {
    query['coordinates.lat'] = {
      $gte: parseFloat(lat) - 0.5,
      $lte: parseFloat(lat) + 0.5
    };
    query['coordinates.lng'] = {
      $gte: parseFloat(lng) - 0.5,
      $lte: parseFloat(lng) + 0.5
    };
  }

  const attractions = await Attraction.find(query).limit(20);

  res.json({
    success: true,
    count: attractions.length,
    data: attractions
  });
});
