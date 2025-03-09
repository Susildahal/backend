const express = require("express");
const cors = require("cors");

const app = express();
app.use(express());
app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/new")
.then(() => { console.log("Database is connected"); })
.catch((error) => { console.error(error); });

const userSchema = new mongoose.Schema({
    fullname: String,
    address: String,
    phone: Number,
    password: String,
});

const User = mongoose.model("new", userSchema);

const port = process.env.PORT || 4000;

app.post('/new', async (req, res) => {
    const { fullname, address, phone, password } = req.body;
    console.log(req.body);
    const user = new User({ fullname, address, phone, password });

    try {
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Error saving data to database", error: error.message });
    }
});

app.get('/new',async(req,resp)=>{
  try {
    const data= await User.find();
    resp.json(data)
 
    
  } catch (error) {
    console.error("error",error)
    
  }



});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
