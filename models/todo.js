const mongoose =require("mongoose")

const userSchima= mongoose.Schema({
    name:{type:String},
    title:{type:String},
    desc:{type:String},
})
const todo = mongoose.model("Mytodo",userSchima);
module.exports=todo;