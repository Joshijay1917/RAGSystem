import { runAgent } from "../services/gemini.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const askAgent = asyncHandler(async (req, res) => {
    const query = req.body.query

    if(!query) {
        throw new ApiError(400, 'Prompt is required!')
    }

    const answer = await runAgent(query)

    res
    .status(200)
    .json(
        new ApiResponse(200, answer, 'Get Response successfully!')
    )
})