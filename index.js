const express = require("express");
const cors = require("cors");
require("./dbconfig/dbconnect"); // Ensure MongoDB connection is established
require('dotenv').config();
const app = express();
const port =process.env.PORT || 5000 ;

// ✅ Middleware Setup
app.use(express.json()); // Enable JSON body parsing
app.use(express.urlencoded({ extended: true })); // Enable form data parsing
app.use(cors()); // Enable CORS


// const newimage=require('./routes/newimage')
const SaTodo=require('./routes/Satodo')


// app.use("/newimage",newimage)
app.use('/Satodo',SaTodo)

app.get("/", (req, res) => {
    res.send("🚀 Server is running successfully!");
});


app.listen(port, () => {
    console.log(`✅ Server is running at http://localhost:${port}`);
});
