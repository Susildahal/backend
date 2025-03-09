const express=require("express")
const{savedata,getdata , deletedata,getonedatabyid,update }=require('../Controllers/todo')
const router=express.Router()
router.post('/',savedata);
router.get('/',getdata);
router.get('/:id',getonedatabyid);
router.delete('/:id',deletedata);
router.put('/:id',update);




module.exports=router