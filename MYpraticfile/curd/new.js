const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose')
const app= express();
app.use(cors());
app.use(express.json())
const port=4001;

mongoose.connect('mongodb://localhost:27017/new')
.then(()=>console.log('databse is connected '))
.catch(()=>console.log("data base is not connected"))

const userSchema=mongoose.Schema({
    id:String,
    password:String
})
const usermodel=mongoose.model("new",userSchema)

 
app.post('/',async(req,resp)=>{
const{id,password}=req.body;
console.log(req.body)

const newuser = new usermodel({id,password})
try {

    const data = await newuser.save();
    
} catch (error) {
console.error("error is " ,error)
    
}

app.get('/', async(req,resp)=>{
    try {
       const data = await usermodel.find()
        resp.json(data)
        
    } catch (error) {
        console.log(error)
    }
})

   
});
app.listen(port, ()=>{
    console.log(`server is running is ${port}`)
})  