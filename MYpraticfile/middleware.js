module.exports = (req,resp,next)=>{
    if(req.query.age){
    next();
    }
    else{
        resp.send("please provide the age to continue ")
    }
    }