import { Router } from "express";
import { askAgent, showStatus } from "../controllers/gemini.controller.js";

const router = Router()

router.route('/query').post(askAgent)
router.route('/status').get(showStatus)

export default router