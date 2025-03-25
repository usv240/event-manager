const events = require('../models/event');

// Define categories globally so they can be used everywhere
let categories = ["Hiking & Trekking", "Water Sports", "Running Events"];

exports.listEvents = (req, res) => {
    res.render('events', { events });
};

exports.getEventDetails = (req, res) => {
    const event = events.find(e => e.id == req.params.id);
    if (event) {
        res.render('event', { event });
    } else {
        res.status(404).render('error', { message: "Event Not Found" });
    }
};

// Create New Event
exports.createEvent = (req, res) => {
    let { category, newCategory, title, details, location, start, end, host } = req.body;

    if (category === "new" && newCategory) {
        category = newCategory.trim();
        if (!categories.includes(category)) {
            categories.push(category);
        }
    } else if (!categories.includes(category)) {
        categories.push(category);
    }
    

    if (!category || !title || !details || !location || !start || !end) {
        return res.status(400).render('error', { message: "All fields are required!" });
    }
    

    const newEvent = {
        id: (events.length + 1).toString(),
        category,
        title,
        details,
        location,
        start,
        end,
        host,
        image: req.file ? `/images/${req.file.filename}` : '/images/default.jpg',
    };

    events.push(newEvent);
    res.redirect('/events');
};

// Edit Event Form
exports.editEventForm = (req, res) => {
    const event = events.find(e => e.id == req.params.id);
    if (!event) {
        return res.status(404).render('error', { message: "Event Not Found" });
    }
    res.render('edit', { event, categories });
};


// Update Event
exports.updateEvent = (req, res) => {
    const event = events.find(e => e.id == req.params.id);
    if (!event) {
        return res.status(404).render('error', { message: "Event Not Found" });
    }

    event.category = req.body.category || event.category;
    event.title = req.body.title || event.title;
    event.details = req.body.details || event.details;
    event.location = req.body.location || event.location;
    event.start = req.body.start || event.start;
    event.end = req.body.end || event.end;
    event.host = req.body.host || event.host;
    event.image = req.file ? `/images/${req.file.filename}` : event.image;

    res.redirect(`/events/${event.id}`);
};

// Delete Event
exports.deleteEvent = (req, res) => {
    const eventIndex = events.findIndex(e => e.id == req.params.id);
    if (eventIndex === -1) {
        return res.status(404).render('error', { message: "Event Not Found" });
    }
    events.splice(eventIndex, 1);
    res.redirect('/events');
};

// Filter Events by Category
exports.filterByCategory = (req, res) => {
    const category = decodeURIComponent(req.params.category).trim();
    const filteredEvents = events.filter(event => event.category.trim() === category);
    res.render('category', { category, events: filteredEvents });
};
