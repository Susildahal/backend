const todo= require('../models/todo')

async function savedata(req,resp){
    try {
        const { name,title,desc} =req.body
        console.log(req.body)
        const newtodo= new todo({name,title,desc})
        await newtodo.save()
        resp.status(201) .json({message:"data is saved to the database "})
        
    } catch (error) {
         resp.status(500).json({message:"internal server error ", error:error.message})
    }
 
} 
 async function getdata(req,resp) {
    try {
        const user= await todo.find();
        resp.status(201).json(user)
    } catch (error) {
        resp.status(500) .json({message:"internal server error "})        
    }
    
 }

 async function deletedata (req,resp){
    try {
        const id =req.params.id;
        const userexsist =await todo.findById(id)
        if(!userexsist){
            resp.status(400).json({message:"data is not found "})
        }
        await todo.findByIdAndDelete(id)
         resp.status(202).json({message:"data is deleted succesfuly"})
    } catch (error) {
        resp.status(500).json({message:"internal server error"})
        
    }
 }


 async function update(req,resp) {
    try {
        const id=req.params.id;
        const userExists=await todo.findById(id)
        if(!userExists){
     return resp.status(400).json({message:"data is not found "})
        }
        const updatedata=await todo.findByIdAndUpdate(id,req.body ,{new:true} )
        resp.status(200).json({message:'update   succesfuly' ,data:updatedata} )
         
    } catch (error) {
        resp.status(500).json({message:"internal server error "})
    }

    
 }

 async function getonedatabyid(req,resp) {
  try {
    const id=req.params.id;
    const userExists= await todo.findById(id)
    if(!userExists){
        resp.status(400).json({message:"data is not found "})
    }
    const data =await todo.findById(id)
    resp.status(202).json({message:"data is found bt id ",data:data})
  } catch (error) {
    
  }
    
 }
module.exports={savedata,getdata,deletedata,getonedatabyid, update }