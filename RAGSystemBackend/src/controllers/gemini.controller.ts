import mongoose from "mongoose";
import { io } from "../index.js";
import { runAgent } from "../services/gemini.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { genAI } from "../config/gemini.js";

export const askAgent = asyncHandler(async (req, res) => {
    const { query, socketId, history } = req.body

    if (!query) {
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
    const answer = await runAgent(query, socket, history);

    res
        .status(200)
        .json(
            new ApiResponse(200, answer, 'Get Response successfully!')
        )
})

export const showStatus = asyncHandler(async (req, res) => {
    let db = "down";
    let llm = "down";

    try {
        await mongoose?.connection?.db?.admin().ping();
        db = "ok";
    } catch { }

    try {
        await genAI.models.generateContent({
            model: "gemma-3-27b-it",
            contents: [{ role: "user", parts: [{ text: "ping" }] }],
        });
        llm = "ok";
    } catch { }

    res
    .status(200)
    .json(
        new ApiResponse(200, { backend: "ok", database: db, llm: llm }, "Get status of backend!")
    )
})