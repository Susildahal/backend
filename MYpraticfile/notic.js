const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();
app.use(express.json());
app.use(cors());

const port =4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/notic", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Database is connected"))
    .catch((error) => console.error("Database is not connected", error));

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
    id: { required: true, type: String },
    password: { required: true, type: String },
    phoneNumber: { required: true, type: Number },
});

const User = mongoose.model("notic", userSchema);

// POST route to create a new record
app.post("/notic", async (req, res) => {
    const { id, password, phoneNumber } = req.body;
    if (!id || !password || !phoneNumber) {
        return res.status(400).send({ message: "All fields are required" });
    }
    const newUser = new User({ id, password, phoneNumber });
    try {
        await newUser.save();
        res.status(201).send({ message: "Data saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Data could not be saved", error });
    }
});

// GET route to fetch all records
app.get("/notic", async (req, res) => {
    try {
        const data = await User.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch data", error });
    }
});

// DELETE route to delete a record by ID
app.delete("/notic/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error deleting user", error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
