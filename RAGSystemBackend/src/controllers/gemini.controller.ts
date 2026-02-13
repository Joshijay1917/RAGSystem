import { io } from "../index.js";
import { runAgent } from "../services/gemini.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const askAgent = asyncHandler(async (req, res) => {
    const { query, socketId } = req.body

    if(!query) {
        throw new ApiError(400, 'Prompt is required!')
    }

    let socket = null;

    if (socketId) {
        socket = io.sockets.sockets.get(socketId);
    }

    if (!socket) {
        console.log("⚠️ Socket not found, running without realtime events");
    }

    // 🧠 run agent
    const answer = await runAgent(query, socket);

    res
    .status(200)
    .json(
        new ApiResponse(200, answer, 'Get Response successfully!')
    )
})