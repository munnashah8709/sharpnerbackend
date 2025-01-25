const fs=require("fs")
// require("./Task1/index");
//require("./views/Add_Product")


const express = require('express');
const path = require('path');

const adminRoutes = require('./Routes/admin');
const shopRoutes = require('./Routes/shop')
const home=require("./Routes/home")

const app = express();

// Middleware to parse request body
app.use(express.urlencoded({ extended: false }));

// Serve static files (like CSS or images if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Admin and Shop Routes
app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use("/",home)

// 404 Page for Undefined Routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
