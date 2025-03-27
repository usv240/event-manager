const Event = require('../models/event');

// List all events
exports.listEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.render('events', { events });
    } catch (err) {
        console.error("Error listing events:", err);
        res.status(500).render('error', { message: "Could not load events" });
    }
};

// View a single event
exports.getEventDetails = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).render('error', { message: "Event Not Found" });
        res.render('event', { event });
    } catch (err) {
        console.error("Error getting event:", err);
        res.status(500).render('error', { message: "Error retrieving event" });
    }
};

// Show New Event Form
exports.showCreateForm = async (req, res) => {
    try {
        const categories = await Event.distinct('category');
        res.render('newEvent', { categories });
    } catch (err) {
        res.status(500).render('error', { message: "Failed to load form" });
    }
};

// Create New Event
exports.createEvent = async (req, res) => {
    try {
        const image = req.file ? `/images/${req.file.filename}` : '/images/default.jpg';
        await Event.create({ ...req.body, image });
        res.redirect('/events');
    } catch (err) {
        console.error("Create error:", err);
        res.status(400).render('error', { message: "Failed to create event" });
    }
};

// Show Edit Form
exports.editEventForm = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).render('error', { message: "Event Not Found" });

        const categories = await Event.distinct('category');
        res.render('edit', { event, categories });
    } catch (err) {
        console.error("Edit form error:", err);
        res.status(500).render('error', { message: "Error loading edit form" });
    }
};

// Update Event
exports.updateEvent = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.image = `/images/${req.file.filename}`;

        await Event.updateOne({ _id: req.params.id }, updateData);
        res.redirect(`/events/${req.params.id}`);
    } catch (err) {
        console.error("Update error:", err);
        res.status(400).render('error', { message: "Failed to update event" });
    }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
    try {
        await Event.deleteOne({ _id: req.params.id });
        res.redirect('/events');
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).render('error', { message: "Failed to delete event" });
    }
};

// Filter Events by Category
exports.filterByCategory = async (req, res) => {
    try {
        const category = decodeURIComponent(req.params.category).trim();
        const filteredEvents = await Event.find({ category });
        res.render('category', { category, events: filteredEvents });
    } catch (err) {
        console.error("Filter error:", err);
        res.status(500).render('error', { message: "Failed to filter events" });
    }
};
