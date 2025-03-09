const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/registrationcollections', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB:', err));

// Define the User schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },  
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create a Mongoose model
const User = mongoose.model('User', userSchema);

// API endpoint to register a new user
app.post('/reg', async (req, res) => {
    const { firstName, lastName, phone, email, password } = req.body;

    // Create a new user instance
    const newUser = new User({ firstName, lastName, phone, email, password });

    try {
        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error (unique constraint violation)
            res.status(400).json({ message: 'Phone number or email already exists.' });
        } else {
            res.status(500).json({ message: 'Error saving data to database', error });
        }
    }
});

// Start the server
app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
