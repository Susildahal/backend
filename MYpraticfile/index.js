const express=require('express')
const Routes=express.Router();

Routes.use('/',(req,resp)=>{
    resp.send('server is running')
})

module.exports=Routes;