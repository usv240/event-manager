const express = require('express');
const path = require('path');
const methodOverride = require('method-override'); // ✅ Add this

const app = express();

// Middleware for parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method')); // ✅ Allow DELETE requests

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import routes
const eventRoutes = require('./routes/eventRoutes');
const mainRoutes = require('./routes/mainRoutes');

app.use('/', mainRoutes);
app.use('/events', eventRoutes);

// Error Handling - Page Not Found
app.use((req, res) => {
    res.status(404).render('error', { message: "Page Not Found" });
});

// Error Handling - Server Errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
