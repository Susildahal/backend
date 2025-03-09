const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 4001;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/new1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Schema and Model
const userSchema = mongoose.Schema({
  first: { type: Number, required: true },
  second: { type: Number, required: true },
  
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/', async (req, res) => {
  const { first, second } = req.body;

  // Log incoming request data
  console.log('Request Body:', req.body);

  // Validate request data
  if (first == null || second == null) {
    return res.status(400).json({ message: 'Invalid input: first and second are required.' });
  }

  const newUser = new User({ first, second });

  try {
    // Save data to database
    await newUser.save();
    return res.status(201).json({ message: 'Data saved successfully to the database.' });
  } catch (error) {
    console.error('Database Save Error:', error.message);
    return res.status(500).json({ message: 'An error occurred while saving data to the database.' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
