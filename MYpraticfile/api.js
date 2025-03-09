const express = require("express");
const dbconnection = require('./dbconnect'); // Import the dbconnect function

const app = express();
app.use(express.json()); // Middleware to parse incoming JSON requests

// Define the root route to fetch data from the 'product' collection
app.get("/", async (req, resp) => {
    try {
        const db = await dbconnection(); // Get the database instance
        const collection = db.collection('product'); // Access the 'product' collection
        const data = await collection.find({}).toArray(); // Fetch all documents from the collection
        resp.json(data); // Send the data as a JSON response
    } catch (error) {
        console.error("Error fetching data:", error);
        resp.status(500).send("Error fetching data from the database");
    }
});

// Define the post route to insert data into the 'product' collection
app.post('/about', async (req, resp) => {
    try {
        const db = await dbconnection(); // Get the database instance
        const collection = db.collection('product'); // Access the 'product' collection
        const result = await collection.insertOne(req.body); // Insert the data from the request body
        resp.json({ message: "Product inserted successfully", insertedId: result.insertedId }); // Send confirmation
    } catch (error) {
        console.error("Error inserting data:", error);
        resp.status(500).send("Error inserting data into the database");
    }
});
app.put("/", async (req, resp) => {
    try {
        const db = await dbconnection(); // Get the database instance
        const collection = db.collection('product'); // Access the 'product' collection

        // Update the document with name "nepal" to set its name to "bhutan"
        const result = await collection.updateOne(
            { name: "nepal" }, // Filter condition
            { $set: { name: "bhutan" } } // Update operation
        );

        if (result.modifiedCount > 0) {
            resp.json({ message: "Product updated successfully" });
        } else {
            resp.status(404).json({ message: "No product found with the specified criteria" });
        }
    } catch (error) {
        console.error("Error updating data:", error);
        resp.status(500).send("Error updating data in the database");
    }
});



// Start the server on port 2000
app.listen(2000, () => {
    console.log("Server is running on http://localhost:2000");
});
