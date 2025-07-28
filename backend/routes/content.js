const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const router = express.Router();

// In-memory storage for content (in a real app, you'd use a database)
let contentStorage = [];

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image, PDF, and document files are allowed!'));
    }
  }
});

// Get all content
router.get('/', (req, res) => {
  try {
    const { type, search, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    let filteredContent = [...contentStorage];

    // Filter by type
    if (type) {
      filteredContent = filteredContent.filter(item => 
        item.type.toLowerCase() === type.toLowerCase()
      );
    }

    // Search functionality
    if (search) {
      const searchLower = search.toLowerCase();
      filteredContent = filteredContent.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.content.toLowerCase().includes(searchLower) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort content
    filteredContent.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    res.json({
      success: true,
      data: filteredContent,
      total: filteredContent.length
    });

  } catch (error) {
    console.error('Get Content Error:', error);
    res.status(500).json({ error: 'Failed to retrieve content' });
  }
});

// Get content by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const content = contentStorage.find(item => item.id === id);

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json({
      success: true,
      data: content
    });

  } catch (error) {
    console.error('Get Content by ID Error:', error);
    res.status(500).json({ error: 'Failed to retrieve content' });
  }
});

// Create new content
router.post('/', (req, res) => {
  try {
    const { title, content, type, tags = [], metadata = {} } = req.body;

    if (!title || !content || !type) {
      return res.status(400).json({ 
        error: 'Title, content, and type are required' 
      });
    }

    const newContent = {
      id: Date.now().toString(),
      title,
      content,
      type,
      tags: Array.isArray(tags) ? tags : [tags],
      metadata,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    contentStorage.push(newContent);

    res.status(201).json({
      success: true,
      data: newContent,
      message: 'Content created successfully'
    });

  } catch (error) {
    console.error('Create Content Error:', error);
    res.status(500).json({ error: 'Failed to create content' });
  }
});

// Update content
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, type, tags, metadata } = req.body;

    const contentIndex = contentStorage.findIndex(item => item.id === id);

    if (contentIndex === -1) {
      return res.status(404).json({ error: 'Content not found' });
    }

    const updatedContent = {
      ...contentStorage[contentIndex],
      ...(title && { title }),
      ...(content && { content }),
      ...(type && { type }),
      ...(tags && { tags: Array.isArray(tags) ? tags : [tags] }),
      ...(metadata && { metadata }),
      updatedAt: new Date().toISOString()
    };

    contentStorage[contentIndex] = updatedContent;

    res.json({
      success: true,
      data: updatedContent,
      message: 'Content updated successfully'
    });

  } catch (error) {
    console.error('Update Content Error:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Delete content
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const contentIndex = contentStorage.findIndex(item => item.id === id);

    if (contentIndex === -1) {
      return res.status(404).json({ error: 'Content not found' });
    }

    const deletedContent = contentStorage.splice(contentIndex, 1)[0];

    res.json({
      success: true,
      data: deletedContent,
      message: 'Content deleted successfully'
    });

  } catch (error) {
    console.error('Delete Content Error:', error);
    res.status(500).json({ error: 'Failed to delete content' });
  }
});

// Upload file
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileInfo = {
      id: Date.now().toString(),
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadedAt: new Date().toISOString(),
      url: `/uploads/${req.file.filename}`
    };

    res.json({
      success: true,
      data: fileInfo,
      message: 'File uploaded successfully'
    });

  } catch (error) {
    console.error('File Upload Error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Get content statistics
router.get('/stats/overview', (req, res) => {
  try {
    const stats = {
      total: contentStorage.length,
      byType: {},
      byDate: {},
      totalTags: new Set()
    };

    contentStorage.forEach(item => {
      // Count by type
      stats.byType[item.type] = (stats.byType[item.type] || 0) + 1;
      
      // Count by date (last 7 days)
      const date = new Date(item.createdAt).toDateString();
      stats.byDate[date] = (stats.byDate[date] || 0) + 1;
      
      // Collect all tags
      item.tags.forEach(tag => stats.totalTags.add(tag));
    });

    stats.uniqueTags = stats.totalTags.size;
    delete stats.totalTags;

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Stats Error:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

module.exports = router; 