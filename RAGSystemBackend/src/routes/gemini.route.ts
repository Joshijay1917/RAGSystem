import { Router } from "express";
import { askAgent } from "../controllers/gemini.controller.js";

const router = Router()

router.route('/query').post(askAgent)

export default router