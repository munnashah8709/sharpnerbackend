const express = require('express');
const loginRoutes = require('./Routes/chapapp');
const chatRoutes = require('./Routes/login');

const app = express();

app.use((req, res, next) => {
    // Add the username to the request headers from localStorage
    req.headers.username = req.headers['username'] || req.body?.username || 'Anonymous';
    next();
});

app.use(loginRoutes);
app.use(chatRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
