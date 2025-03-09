const { savedata, getdata, getdatabyid, deleteuser, updateuser } = require('../Controllers/newimage');
const upload = require('../middlewares/uploadMiddleware');
const express = require('express');
const router = express.Router();

router.post('/', upload.single("image"), savedata);
router.get("/", getdata);
router.get('/:id', getdatabyid);
router.delete('/:id', deleteuser);
router.put('/:id', upload.single("image"), updateuser); // ✅ Added upload middleware

module.exports = router;
