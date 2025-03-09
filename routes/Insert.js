const express=require("express")
const router=express.Router();
const {getdata,getalldata,deletedata, updatedata,findbyid} =require('../Controllers/Insert')

router.post('/',getdata);
router.get('/',getalldata);
router.delete('/:id',deletedata);
router.put("/:id",updatedata)
router.get("/:id",findbyid)

module.exports = router;