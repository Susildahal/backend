
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const databasename = 'e-com';

let client;

// Function to connect to the MongoDB database
async function connectDB() {
    if (!client) {
        client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB');
    }
    const db = client.db(databasename); // Get the database instance
    return db; // Return the database instance to be used elsewhere
}
// Export the connectDB function
module.exports = connectDB;
