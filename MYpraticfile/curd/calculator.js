const express=require("express")
const cors=require("cors")
const app=express()
const port=4001;
app.use(cors())
app.use(express.json())
const mongoose=require('mongoose')


mongoose.connect('mongodb://localhost:27017/newdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));


app.get('/',(req,resp)=>{
    resp.send('server is running ')
})

app.listen(port,()=>{
    console.log(`server is running in ${port}`)
})