const newuser = require('../models/new');

// Save Data
async function savedata(req, resp) {
    try {
        const { name, age, address, phone, email } = req.body;
        console.log(req.body);

        // Check if email or phone already exists before creating user
        const useremail = await newuser.findOne({ email });
        if (useremail) {
            return resp.status(400).json({ message: "Your email already exists" });
        }

        const userphonenumber = await newuser.findOne({ phone });
        if (userphonenumber) {
            return resp.status(400).json({ message: "Your phone number already exists" });
        }

        // Create new user only if validation passes
        const user = new newuser({ name, age, address, phone, email });
        await user.save();

        return resp.status(201).json({ message: "Data saved to the database", data: user });

    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: "Internal server error" });
    }
}

// Get All Data
async function getalldata(req, resp) {
    try {
        const users = await newuser.find();

        if (!users.length) {
            return resp.status(404).json({ message: "No data found in the database" });
        }

        return resp.status(200).json({ message: "Data retrieved successfully", data: users });

    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: "Internal server error" });
    }
}

// Get Data by ID
async function getdatabyid(req, resp) {
    try {
        const id = req.params.id;
        const userexist = await newuser.findById(id);

        if (!userexist) {
            return resp.status(404).json({ message: "Data not found in the database" });
        }

        return resp.status(200).json({ message: "Data retrieved successfully", data: userexist });

    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: "Internal server error" });
    }
}

// Delete Data
async function deletedata(req, resp) {
    try {
        const id = req.params.id;
        const userexist = await newuser.findById(id);

        if (!userexist) {
            return resp.status(404).json({ message: "Data not found" });
        }

        const deletedUser = await newuser.findByIdAndDelete(id);
        return resp.status(200).json({ message: "Data deleted successfully", data: deletedUser });

    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: "Internal server error" });
    }
}

// Update Data
async function updatedata(req, resp) {
    try {
        const id = req.params.id;
        const{email,phone}=req.body
const emailexist=await newuser.findOne({email})
if(emailexist){
    return resp.status(400).json({message:" your email is already exist "})
}
const phoneExist=await newuser.findOne({phone})
if(phoneExist){
    return resp.status(400).json({message:"your phone number is already exist "})
}

const userexist = await newuser.findById(id);

        if (!userexist) {
            return resp.status(404).json({ message: "Data not found" });
        }

        const updatedUser = await newuser.findByIdAndUpdate(id, req.body, { new: true });
        return resp.status(200).json({ message: "Data updated successfully", data: updatedUser });

    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { savedata, getalldata, getdatabyid, deletedata, updatedata };
