const User = require("../models/datawithimage"); // Ensure correct model path
const cloudinary = require("../config/cloudinary");

async function saveData(req, resp) {
    try {
        const { name, age, address } = req.body;
        const file = req.file;
        if (!file) {
            return resp.status(400).json({ msg: "Please upload a file" });
        }

        // Cloudinary upload
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
            folder: "user_images",
            use_filename: true,
            unique_filename: false,
        });

        // Save to MongoDB
        const newUser = new User({ name, age, address, imageurl: uploadedImage.secure_url });
        await newUser.save();

        resp.status(201).json({ msg: "Data saved successfully", data: newUser });
    } catch (error) {
        console.error("Error saving data:", error);
        resp.status(500).json({ msg: "Internal Server Error" });
    }
}

async function getdata(req, resp) {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return resp.status(404).json({ msg: "No data found" });
        }
        resp.status(200).json({ data: users });
    } catch (error) {
        console.error("Error fetching data:", error);
        resp.status(500).json({ msg: "Internal Server Error" });
    }
}

async function getdatabyid(req, resp) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return resp.status(404).json({ msg: "Data not found" });
        }
        resp.status(200).json({ data: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        resp.status(500).json({ msg: "Internal Server Error" });
    }
}

async function updateuser(req, resp) {
    try {
        const { id } = req.params;
        const { name, age, address } = req.body;

        // Check if user exists
        const userExist = await User.findById(id);
        if (!userExist) return resp.status(404).json({ msg: "Data Not Found" });

        // Upload new image if provided
        let imageurl = userExist.imageurl;
        if (req.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
                folder: "user_folder",
                use_filename: true,
                unique_filename: false
            });
            imageurl = secure_url;
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            id, { name, age, address, imageurl }, { new: true, runValidators: true }
        );

        resp.status(200).json({ msg: "User updated successfully", data: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        resp.status(500).json({ msg: "Internal Server Error" });
    }
}

async function deleteuser(req, resp) {
    try {
        const { id } = req.params;

        // Check if user exists
        const userExist = await User.findById(id);
        if (!userExist) {
            return resp.status(404).json({ msg: "Data not found" });
        }

        // Delete image from Cloudinary if it exists
        if (userExist.imageurl) {
            const publicId = userExist.imageurl.split("/").pop().split(".")[0]; 
            await cloudinary.uploader.destroy(`user_folder/${publicId}`);
        }

        // Delete user from MongoDB
        await User.findByIdAndDelete(id);
        resp.status(200).json({ msg: "User has been deleted" });
        
    } catch (error) {
        console.error("Error deleting user:", error);
        resp.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = { saveData, getdata, getdatabyid, updateuser, deleteuser };
