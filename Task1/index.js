const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

// Correct path to the HTML file
let urlfile = './task1/task1.html';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        // Serve the HTML form
        fs.readFile(urlfile, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading the HTML file.');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && parsedUrl.pathname === '/submit') {
        let body = '';

        // Collect the data from the form
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const formData = querystring.parse(body);

            // Append the form data to a file
            fs.appendFile('formData.txt', `Name: ${formData.name}, Email: ${formData.email}\n`, err => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error writing to file.');
                } else {
                    res.writeHead(302, {
                        'Location': '/thank-you',
                    });
                    res.end();
                }
            });
        });
    } else if (req.method === 'GET' && parsedUrl.pathname === '/thank-you') {
        // Show the thank-you message
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Thank you for submitting the form!</h1>');
    } else {
        // Handle unknown routes
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
