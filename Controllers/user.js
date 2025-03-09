const user = require('../models/user');

async function savedata(req, resp) {
  try {
    const { name, email, password, confirmPassword, age } = req.body;

    // Check if email already exists
    const existingEmail = await user.findOne({ email });
    if (existingEmail) {
      return resp.status(400).json({ message: "Your email already exists in our database." });
    }

    // Create new user if email is unique
    const newuser = new user({ name, email, password, confirmPassword, age });
    await newuser.save();
    console.log(req.body);
    
    // Send response after saving user
    resp.status(201).json({ message: "Data is saved to the database" });

  } catch (error) {
    resp.status(500).json({ message: "Some problem happened", error: error.message });
  }
}


async function alldata(req,resp) {
  try {
    const users= await user.find();
    resp.status(201).json({message:"data found succesfuly",
      users
    })
  } catch (error) {
    resp.status(500).json({message:"some error happen in server",error:error.message})
  }
  
}

module.exports = { savedata,alldata };
