const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const eventController = require('../controllers/eventController');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ========== Routes ==========

// Show all events
router.get('/', eventController.listEvents);

// Show create form
router.get('/new', eventController.showCreateForm);

// Create new event
router.post('/', upload.single('image'), eventController.createEvent);

// Show single event
router.get('/:id', eventController.getEventDetails);

// Show edit form
router.get('/edit/:id', eventController.editEventForm);

// Update event
router.put('/edit/:id', upload.single('image'), eventController.updateEvent);

// Delete event
router.delete('/delete/:id', eventController.deleteEvent);

// Filter by category
router.get('/category/:category', eventController.filterByCategory);

module.exports = router;
