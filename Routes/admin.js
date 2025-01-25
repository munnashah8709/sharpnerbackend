const express = require('express');
const path = require('path');

const router = express.Router();

// Serve the add-product form
router.get('/Add_Product', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'Add_Product.html')); // Corrected path
});

// Handle form submission
router.post('/Add_Product', (req, res) => {
    console.log(`Product Name: ${req.body.name}, Price: ${req.body.price}`);
    res.redirect('/shop'); // Ensure '/shop' is a valid route
});

module.exports = router;
