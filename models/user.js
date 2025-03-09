 const mongoose=require("mongoose")

 const userSChima=mongoose.Schema({
  name:{type:String},
email:{type:String,unique:true, lowercase: true,},
password: {type:String},
age: {type:Number},
 });
 const user =mongoose.model("newDB",userSChima)
 module.exports=user;




