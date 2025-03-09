const mongoose = require('mongoose');

const todoSchema=mongoose.Schema({
    name: {type:String,required:true},
    lname: {type:String,required:true},
    email:{type:String,required:true}, 
    createAt: {type:String,required:true},
    updateat: {type:String,required:false},
    priority: {type:String,required:true},
    status: {type:String,required:true},
    description: {type:String,required:true},
    Title: {type:String,required:true},
    completedDate:{type:String,required:false}
})

const Satodo = mongoose.model(' SaTodo', todoSchema);

module.exports = Satodo;