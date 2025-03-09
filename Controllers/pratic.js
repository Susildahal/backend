const Pratic = require("../models/Pratic"); // Capitalized model name

async function saveData(req, res) {
    try {
        const { id, password } = req.body;
        
        if (!id || !password) {
            return res.status(400).json({ message: "ID and Password are required" });
        }

        console.log("Request Body:", req.body); // Debugging

        const newUser = new Pratic({ id, password });
        await newUser.save();

        res.status(201).json({ message: "Data is saved to database" });
    } catch (error) {
        res.status(500).json({ message: "Data is not saved to the database", error: error.message });
    }
}

module.exports = {saveData};
