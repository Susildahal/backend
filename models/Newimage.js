const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{require:true,type:String},
    age:{require:true,type:Number},
    image:{type:String}
})
const Newimage =mongoose.model("newimage",userSchema)
module.exports=Newimage