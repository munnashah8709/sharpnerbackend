const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const messagesFile = path.join(__dirname, '../messages.json');

// Serve the chat page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'chat.html'));
});

// Retrieve messages
router.get('/messages', (req, res) => {
    if (fs.existsSync(messagesFile)) {
        const messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
        res.json(messages);
    } else {
        res.json([]);
    }
});

// Handle sending messages
router.post('/send-message', express.urlencoded({ extended: false }), (req, res) => {
    const username = req.headers.username || 'Anonymous'; // Read from headers
    const message = req.body.message;

    console.log(message)

    const newMessage = { username, message };
    let messages = [];

    if (fs.existsSync(messagesFile)) {
        messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
    }

    messages.push(newMessage);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

    res.redirect('/');
});

module.exports = router;
