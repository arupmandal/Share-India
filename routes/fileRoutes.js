const express = require('express');
const multer = require('multer');
const path = require('path');
const generateToken = require('../utils/tokenGenerator');
const cloudinary = require('../utils/cloudinary');

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// File size limit: 1GB (in bytes)
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB limit
  fileFilter: (req, file, cb) => {
    cb(null, true); // Accept all file types
  },
});

// Simulated database for files
const fileDatabase = new Map();

// Upload Route
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const token = generateToken();
  const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  try {
    // Upload file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'file-share-app',
    });

    // Save file information in the simulated database
    fileDatabase.set(token, {
      url: cloudinaryResponse.secure_url,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      expiry,
    });

    res.status(200).json({
      message: 'File uploaded successfully!',
      token,
      expiry,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileUrl: cloudinaryResponse.secure_url,
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error.message);
    res.status(500).json({ message: 'Failed to upload file.' });
  }
});

// Handle file size limit error
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'Your file is larger than 1GB. Please upload a smaller file.' });
  }
  next(err);
});

// Download Route
router.get('/download/:token', (req, res) => {
  const { token } = req.params;
  const fileInfo = fileDatabase.get(token);

  if (!fileInfo) {
    return res.status(404).json({ message: 'Invalid or expired token.' });
  }

  if (Date.now() > fileInfo.expiry) {
    fileDatabase.delete(token);
    return res.status(410).json({ message: 'Token has expired.' });
  }

  res.status(200).json({
    fileName: fileInfo.originalName,
    fileSize: fileInfo.size,
    filePath: fileInfo.url,
  });
});

module.exports = router;
