const Insert = require('../models/Insert');

async function getdata(req, resp) {
    try {
        const { name, address, age, phonenumber } = req.body;
        console.log(req.body);
        
        const newUser = new Insert({ name, address, age, phonenumber });
        await newUser.save();
        
        resp.status(201).json({ message: "Data is saved to the database" });
    } catch (error) {
        resp.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function getalldata(req, resp) {
    try {
        const data = await Insert.find();
        resp.status(200).json(data);
    } catch (error) {
        resp.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function deletedata(req, resp) {
    try {
        const id = req.params.id; // Fix: Correct the spelling of `params`
        
        const userExists = await Insert.findById(id);
        if (!userExists) {
            return resp.status(404).json({ message: "Data not found" });
        }

        await Insert.findByIdAndDelete(id); // Fix: Pass `id` as an argument
        resp.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
        resp.status(500).json({ message: "Internal server error", error: error.message });
    }
}
async function updatedata(req,resp){
    try {
        const id =req.params.id;
        const userExists=await Insert.findById(id)
        if(!userExists){
            return resp.status(404).json({message:"data  not found "})
        }
         const updateusar=await Insert.findByIdAndUpdate(id,req.body ,{new:true});
        resp.status(200).json( updateusar )
    } catch (error) {
        resp.status(500).json({mesage:"internal server error "})
    }

}

async function findbyid(req,resp){
    try {
        const id=req.params.id;
        const userExists= await Insert.findById(id)
        if(!userExists){
            return resp.status(404).json({message:"data is not found "})
        }
        resp.status(200).json(userExists)
    } catch (error) {
        resp.status(500).json({mesage:"internal server error "})
    }
}
module.exports = { getdata, getalldata, deletedata ,updatedata,findbyid }; // Fix: Rename `delete` to `deletedata` since `delete` is a reserved keyword
 