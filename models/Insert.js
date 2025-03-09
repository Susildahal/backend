const mongoose = require ("mongoose")
const userSchema=mongoose.Schema({
    name:{type:String},
    address: {type:String},
    age: {type:Number},
    phonenumber:{type:Number}

});
const Insert=mongoose.model("todo",userSchema)
module.exports=Insert;