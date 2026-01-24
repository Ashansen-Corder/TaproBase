import User from '../models/User.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// @desc    Register tourist
// @route   POST /api/auth/register/tourist
// @access  Public
export const registerTourist = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone, nationality } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorResponse('User already exists', 400));
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    nationality,
    role: 'tourist'
  });

  const token = user.generateToken();

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      nationality: user.nationality
    }
  });
});

// @desc    Register guide
// @route   POST /api/auth/register/guide
// @access  Public
export const registerGuide = asyncHandler(async (req, res, next) => {
  const {
    name,
    email,
    password,
    phone,
    bio,
    location,
    languages,
    specialties,
    hourlyRate,
    dailyRate,
    experience,
    highlights
  } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorResponse('User already exists', 400));
  }

  // Create guide
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: 'guide',
    bio,
    location,
    languages: languages || [],
    specialties: specialties || [],
    hourlyRate,
    dailyRate,
    experience,
    highlights: highlights || [],
    verified: false, // Guides need to be verified by admin
    contact: {
      phone,
      email
    }
  });

  const token = user.generateToken();

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      location: user.location,
      languages: user.languages,
      specialties: user.specialties
    }
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if user is active
  if (!user.isActive) {
    return next(new ErrorResponse('Account has been deactivated', 403));
  }

  const token = user.generateToken();

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    }
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.json({
    success: true,
    user
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = req.body;
  const userId = req.user.id;

  // Remove fields that shouldn't be updated
  delete fieldsToUpdate.password;
  delete fieldsToUpdate.email;
  delete fieldsToUpdate.role;

  const user = await User.findByIdAndUpdate(
    userId,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  );

  res.json({
    success: true,
    user
  });
});

// @desc    Update password
// @route   PUT /api/auth/password
// @access  Private
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new ErrorResponse('Please provide current and new password', 400));
  }

  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    return next(new ErrorResponse('Current password is incorrect', 401));
  }

  user.password = newPassword;
  await user.save();

  const token = user.generateToken();

  res.json({
    success: true,
    token,
    message: 'Password updated successfully'
  });
});
