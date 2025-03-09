const express=require("express")
const router=express.Router()
const {savedata,getalldata,getdatabyid ,deletedata,updatedata}=require('../Controllers/new')

router.post('/',savedata)
router.get("/", getalldata)
router.get("/:id", getdatabyid)
router.delete("/:id",deletedata)
router.put("/:id",updatedata)


module.exports= router