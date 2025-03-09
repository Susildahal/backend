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
  .connect("mongodb://localhost:27017/pratic", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Schema and Model
const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true }, // Use String for phone to handle all formats
  password: { type: String, required: true },
});

const User = mongoose.model("pratics" , userSchema);

// Routes
app.post("/pratic", async (req, res) => {
  const { fullname, address, phone, password } = req.body;

  console.log("Request received:", req.body);

  const user = new User({ fullname, address, phone, password });

  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error saving data:", error.message);
    res.status(500).json({ message: "Error saving data to database", error: error.message });
  }
});



app.get("/pratic", async (req, res) => {
    try {
        const user = await User.find();  // Fetch all data from the 'List' collection
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from database', error });
    }
});


// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
