const express = require('express');
const router = express.Router();
const multer = require('multer');
const eventController = require('../controllers/eventController');
const path = require('path'); 

//  Define categories in this file as well
let categories = ["Hiking & Trekking", "Water Sports", "Running Events"];

const storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

//  Routes
router.get('/', eventController.listEvents);
router.get('/new', (req, res) => res.render('newEvent', { categories })); 
router.post('/', upload.single('image'), eventController.createEvent);
router.get('/:id', eventController.getEventDetails);
router.get('/edit/:id', eventController.editEventForm);
router.put('/edit/:id', upload.single('image'), eventController.updateEvent);
router.delete('/delete/:id', eventController.deleteEvent);
router.get('/category/:category', eventController.filterByCategory);
router.post('/edit/:id', upload.single('image'), eventController.updateEvent);


module.exports = router;
