const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://270.0.0.1:27017/pratic", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Define Schema and Model
const userSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true }, // Changed to String for better validation
  password: { type: String, required: true },
});

const User = mongoose.model("pratic", userSchema);

// Routes
app.post("/pratic", async (req, res) => {
  const { fullname, address, phone, password } = req.body;

  try {
    const newUser = new User({ fullname, address, phone, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error saving data:", error.message);
    res.status(500).json({ message: "Error saving data to database", error: error.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
