import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { fileUpload } from "../controllers/file.controller.js";

const router = Router()

router.route('/upload').post(upload.array('files'), fileUpload)

export default router