const mongoose=require("mongoose")
const userSchima=new mongoose.Schema({
    name:{require:true ,type:String},
    address: {require:true,type:String},
    phone: {require:true,type:Number},
    imageurl: {require:true,type:String}
})
const User=mongoose.model("image",userSchima)
module.exports=User

