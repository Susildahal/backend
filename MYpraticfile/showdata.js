const connectDB = require('./dbconnect'); // Import the connectDB function

async function showData() {
    try {
        const db = await connectDB(); // Get the database instance using the connectDB function
        const collection = db.collection('product'); // Access the 'product' collection
        const data = await collection.find({}).toArray()// Fetch all documents
        console.log('Data from product collection:', data); // Log the fetched data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

showData(); // Call the function to display data
