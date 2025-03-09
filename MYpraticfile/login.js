const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (Replace with your connection string)
mongoose.connect('mongodb://localhost:27017/loginDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB:', err));

// Define User schema
const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    password: { type: String, required: true }
});

// Create a model for User
const User = mongoose.model('User', userSchema);

// POST endpoint to save login data
app.post('/login', async (req, resp) => {
    const { id, password } = req.body;

    // Create a new user document
    const newUser = new User({
        id,
        password
    });

    try {
        // Save the user to the database
        await newUser.save();
        resp.json({ message: 'Login data received and saved successfully' });
    } catch (error) {
        resp.status(500).json({ message: 'Error saving data to database', error });
    }
});

// Start server
const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
