import Contact from '../models/Contact.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// @desc    Create contact message
// @route   POST /api/contact
// @access  Public
export const createContact = asyncHandler(async (req, res, next) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return next(new ErrorResponse('Please provide all required fields', 400));
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message
  });

  res.status(201).json({
    success: true,
    message: 'Your message has been sent successfully',
    data: contact
  });
});

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private (Admin)
export const getContacts = asyncHandler(async (req, res, next) => {
  const { status, page = 1, limit = 20 } = req.query;

  const query = {};
  if (status) {
    query.status = status;
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const contacts = await Contact.find(query)
    .sort('-createdAt')
    .skip(skip)
    .limit(limitNum);

  const total = await Contact.countDocuments(query);

  res.json({
    success: true,
    count: contacts.length,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    data: contacts
  });
});

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private (Admin)
export const getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorResponse('Contact message not found', 404));
  }

  res.json({
    success: true,
    data: contact
  });
});

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private (Admin)
export const updateContactStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (!status || !['new', 'read', 'replied', 'archived'].includes(status)) {
    return next(new ErrorResponse('Invalid status', 400));
  }

  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status },
    {
      new: true,
      runValidators: true
    }
  );

  if (!contact) {
    return next(new ErrorResponse('Contact message not found', 404));
  }

  res.json({
    success: true,
    data: contact
  });
});

// @desc    Reply to contact
// @route   POST /api/contact/:id/reply
// @access  Private (Admin)
export const replyToContact = asyncHandler(async (req, res, next) => {
  const { replyMessage } = req.body;

  if (!replyMessage) {
    return next(new ErrorResponse('Please provide a reply message', 400));
  }

  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    {
      replyMessage,
      status: 'replied',
      repliedAt: new Date()
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!contact) {
    return next(new ErrorResponse('Contact message not found', 404));
  }

  res.json({
    success: true,
    message: 'Reply sent successfully',
    data: contact
  });
});
