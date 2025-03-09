const express=require("express")
const router=express.Router()
const{saveData, getdata, getdatabyid, updateuser, deleteuser }=require("../Controllers/datawithimage")
const upload=require("../middlewares/uploadMiddleware")

router.post('/upload',upload.single('image'),saveData)
router.get("/",getdata)
router.get("/:id",getdatabyid)
router.delete("/:id",deleteuser)
router.put("/:id",updateuser)

module.exports=router;