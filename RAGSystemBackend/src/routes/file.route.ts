import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route('/upload').post(upload.single('file'))

export default router