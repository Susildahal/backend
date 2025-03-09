const mongoose=require("mongoose")

const userSchima=new mongoose.Schema({
    type: {type:String,required:true},
    id: {type:String,required:true},
    password: {type:String,required:true},
    date: {type:Date,default:Date.now},
    info: {type:String,required:false},
});

const Personal =new mongoose.model("personal",userSchima);
module.exports=Personal;