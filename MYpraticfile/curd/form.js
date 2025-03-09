const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/curd")
  .then(() => console.log("Database is connected"))
  .catch(() => console.error("Database is not connected"));

const userSchema = mongoose.Schema({
  name: { type: String },
  phone: { type: Number },
  address: { type: String },
  gmail: { type: String },
});

const User = mongoose.model("curds", userSchema);

app.post("/form", async (req, res) => {
  const { name, phone, address, gmail } = req.body;
  const newUser = new User({ name, phone, address, gmail });
  console.log(req.body)
  try {
    await newUser.save();
    res.status(201).send({ message: "Data is saved to the database" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Data is not saved to the database" });
  }
});

app.get("/form", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch data", error });
  }
});

app.put("/form/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone, address, gmail } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, phone, address, gmail },
      { new: true } // Return the updated document
    );
   
    res.status(200).send({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to update user", error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
