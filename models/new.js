const mongoose =require("mongoose")
const userschima= mongoose.Schema({
    name:{type:String,require:true},
    age: {type:Number,require:true ,min:0},
    address: {type:String ,require:true ,min:5},
    phone: {type:Number ,require:true ,unique:true ,match: /^[0-9]{10}$/},
    email:{type:String,require:true,unique:true,lowercase:true}
});
const newuser =mongoose.model("new",userschima)

module.exports=newuser