import User from '../models/User.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// @desc    Get all guides
// @route   GET /api/guides
// @access  Public
export const getGuides = asyncHandler(async (req, res, next) => {
  const {
    location,
    specialty,
    language,
    verified,
    rating,
    page = 1,
    limit = 10,
    sort = '-rating'
  } = req.query;

  // Build query
  const query = { 
    role: 'guide',
    isActive: true
  };

  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  if (specialty) {
    query.specialties = { $in: [specialty] };
  }

  if (language) {
    query.languages = { $in: [language] };
  }

  if (verified !== undefined) {
    query.verified = verified === 'true';
  }

  if (rating) {
    query.rating = { $gte: parseFloat(rating) };
  }

  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const guides = await User.find(query)
    .select('-password')
    .sort(sort)
    .skip(skip)
    .limit(limitNum);

  const total = await User.countDocuments(query);

  res.json({
    success: true,
    count: guides.length,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    data: guides
  });
});

// @desc    Get single guide
// @route   GET /api/guides/:id
// @access  Public
export const getGuide = asyncHandler(async (req, res, next) => {
  const guide = await User.findOne({
    _id: req.params.id,
    role: 'guide',
    isActive: true
  }).select('-password');

  if (!guide) {
    return next(new ErrorResponse('Guide not found', 404));
  }

  res.json({
    success: true,
    data: guide
  });
});

// @desc    Update guide profile
// @route   PUT /api/guides/:id
// @access  Private
export const updateGuide = asyncHandler(async (req, res, next) => {
  // Only allow guides to update their own profile or admin
  if (req.params.id !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to update this guide', 403));
  }

  const fieldsToUpdate = req.body;
  delete fieldsToUpdate.password;
  delete fieldsToUpdate.email;
  delete fieldsToUpdate.role;

  const guide = await User.findByIdAndUpdate(
    req.params.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  ).select('-password');

  if (!guide || guide.role !== 'guide') {
    return next(new ErrorResponse('Guide not found', 404));
  }

  res.json({
    success: true,
    data: guide
  });
});

// @desc    Search guides
// @route   GET /api/guides/search
// @access  Public
export const searchGuides = asyncHandler(async (req, res, next) => {
  const { q, location, specialty, language } = req.query;

  let query = {
    role: 'guide',
    isActive: true
  };

  // Text search
  if (q) {
    query.$or = [
      { name: { $regex: q, $options: 'i' } },
      { bio: { $regex: q, $options: 'i' } },
      { location: { $regex: q, $options: 'i' } }
    ];
  }

  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  if (specialty) {
    query.specialties = { $in: [specialty] };
  }

  if (language) {
    query.languages = { $in: [language] };
  }

  const guides = await User.find(query)
    .select('-password')
    .limit(20)
    .sort('-rating');

  res.json({
    success: true,
    count: guides.length,
    data: guides
  });
});
