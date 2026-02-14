import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { fileUpload, GetAllFiles } from "../controllers/file.controller.js";

const router = Router()

router.route('/getAll').get(GetAllFiles)
router.route('/upload').post(upload.array('files'), fileUpload)

export default router