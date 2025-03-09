const Newimage = require("../models/Newimage");
const cloudinary = require('../config/cloudinary');

async function savedata(req, resp) {
    try {
        const { name, age } = req.body;
        const file = req.file;
        if (!file) {
            return resp.status(400).json({ msg: "please upload a file" });
        }

        const imageupload = await cloudinary.uploader.upload(file.path, {
            folder: "new_user",
            user_filename: true,
            unique_filename: false
        });

        const image = imageupload.secure_url;
        const newuser = new Newimage({ name, age, image });
        await newuser.save();

        resp.status(202).json({ msg: "your data is uploaded " });
    } catch (error) {
        resp.status(500).json({ msg: "internal server error ", error: error.message });
    }
}

async function getdata(req, resp) {
    try {
        const response = await Newimage.find();
        if (response.length === 0) {
            return resp.status(404).json({ msg: "data not found " });
        }
        resp.status(202).json({ data: response });
    } catch (error) {
        resp.status(500).json({ msg: "internal server error ", error: error.message });
    }
}

async function getdatabyid(req, resp) {
    try {
        const { id } = req.params;
        const userexist = await Newimage.findById(id);
        if (!userexist) {
            return resp.status(404).json({ msg: "data not found " });
        }
        resp.status(202).json({ data: userexist });
    } catch (error) {
        resp.status(500).json({ msg: "internal server error ", error: error.message });
    }
}

async function deleteuser(req, resp) {
    try {
        const { id } = req.params;
        const userexist = await Newimage.findById(id);
        if (!userexist) {
            return resp.status(404).json({ msg: "data not found" });
        }

        if (userexist.image) {
            const publicid = userexist.image.split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(publicid);
        }

        await Newimage.findByIdAndDelete(id);
        resp.status(200).json({ msg: "data deleted" });
    } catch (error) {
        resp.status(500).json({ msg: "internal server error", error: error.message });
    }
}

// ✅ Fixed updateuser function (Now it's outside deleteuser)
async function updateuser(req, resp) {
    try {
        const { id } = req.params;
        const { name, age } = req.body;

        const userExist = await Newimage.findById(id);
        if (!userExist) {
            return resp.status(404).json({ msg: "data not found" });
        }

        if (userExist.image) {
            const publicId = userExist.image.split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        const file = req.file;
        let image = userExist.image; // Keep existing image if no new file

        if (file) {
            const fileupload = await cloudinary.uploader.upload(file.path, {
                folder: 'new_user',
                use_filename: true,
                unique_filename: false
            });
            image = fileupload.secure_url;
        }

        const updatedUser = await Newimage.findByIdAndUpdate(
            id,
            { name, age, image },
            { new: true, runValidators: true }
        );

        resp.status(200).json({ msg: "user is updated successfully", data: updatedUser });

    } catch (error) {
        resp.status(500).json({ msg: "internal server error", error: error.message });
    }
}

module.exports = { savedata, getdata, getdatabyid, deleteuser, updateuser };
