const{ savedata,getdata,getdataById,updateuser,deleteuser } =require('../Controllers/Satodo') 
const express =require('express')
const router =express.Router()

router.post('/',savedata)
router.get('/',getdata)
router.get('/:id',getdataById)      
router.put('/:id',updateuser)
router.delete('/:id',deleteuser)
 module.exports=router