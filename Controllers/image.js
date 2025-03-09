const cloudinary = require('../config/cloudinary')
const User=require("../models/image")

async function saveuser(req, resp) {
  try {
    const { name, address, phone } = req.body;
    const file = req.file;

    if (!file) {
      return resp.status(400).json({ msg: "Image is required" });
    }

    // Upload to Cloudinary with folder
    const imageupload = await cloudinary.uploader.upload(file.path, {
      folder: 'new_userfolder',
      use_filename: true,
      unique_filename: false
    });

    // Delete the local file after upload
 
     let imageurl= imageupload.secure_url 
    // Create user with Cloudinary URL
    const newuser = new User({ 
      name, 
      address, 
      phone, 
      imageurl
    });
    await newuser.save();

    resp.status(201).json({ msg: "New user created", data: newuser });
  } catch (error) {
    console.error("Error saving user:", error);
    resp.status(500).json({ msg: "Internal server error" });
  }
}
async function getdata(req,resp){
    try {
        const response =await User.find()  
        if(response.length==0){
         return resp.status(400).json({msg:"data is not found "})
        }
        resp.status(200).json({data:response})
        
    } catch (error) {
        resp.status(500).json({msg:"internal server error "})
        
    }
}
async function getdatabyid(req,resp) {
    try {
        const {id}=req.params;
        const response= await User.findById(id)
        if(!response){
            return resp.status(400).json({msg:"data is not found "})
        }
        resp.status(200).json({data:response})
    } catch (error) {
        resp.status(500).json({msg:"internal server error "})
        
    }
   
    
}
async function deleteuser(req,resp) {
    try {
        const {id} =req.params
        const response= await User.findById(id)
        if(!response){
            return resp.status(400).json({msg:"data is not found "})
        }
        if(response.imageurl){
            const publicId = response.imageurl.split("/").pop().split(".")[0]; 
            await cloudinary.uploader.destroy(`new_userfolder/${publicId}`)
        }

        await User.findByIdAndDelete(id)
    resp.status(200).json({msg:"user has been deleted  "})
        
    } catch (error) {
        resp.status(500).json({msg:"internal server error"})
        
    }  
}
async function updateuser(req, resp) {
    try {
        const { id } = req.params;
        const { name, age, address } = req.body;
        // Check if user exists
        const userExist = await User.findById(id);
        if (!userExist) return resp.status(404).json({ msg: "Data Not Found" });

        let imageurl = userExist.imageurl;

        // If a new image is provided, delete the old one and upload the new one
        if (req.file) {
            if (userExist.imageurl) {
                // Extract public ID from old image URL and delete it
                const publicId = userExist.imageurl.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(`new_userfolder/${publicId}`);
            }
          
            // Upload new image
            const { secure_url } = await cloudinary.uploader.upload(req.file.path,{
                folder: "new_userfolder",
                use_filename: true,
                unique_filename: false
            });

            imageurl = secure_url;
        }

        // Update user in database
        const updatedUser = await User.findByIdAndUpdate(
            id, { name, age, address, imageurl }, { new: true, runValidators: true }
        );

        return resp.status(200).json({ msg: "User updated successfully", data: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        return resp.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports={saveuser, getdata,getdatabyid,deleteuser,updateuser}