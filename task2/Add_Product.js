const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to show the form
app.get('/', (req, res) => {
    res.send(`
        <h1>Add Product</h1>
        <form action="/add-product" method="POST">
            <label for="name">Product Name:</label>
            <input type="text" id="name" name="name" required><br><br>
            
            <label for="price">Price:</label>
            <input type="text" id="price" name="price" required><br><br>
            
            <label for="size">Size:</label>
            <input type="text" id="size" name="size" required><br><br>
            
            <button type="submit">Submit</button>
        </form>
    `);
});

// Route to handle form submission and log data
app.post('/add-product', (req, res) => {
    // Accessing the form data from req.body
    const { name, price, size } = req.body;

    // Log the parsed data to the console
    console.log(`Product Name: ${name}`);
    console.log(`Price: ${price}`);
    console.log(`Size: ${size}`);

    // Sending a response to the user
    res.send('<h1>Product Added Successfully!</h1>');
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
