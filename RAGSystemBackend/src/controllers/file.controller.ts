import { FileService } from "../services/file.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "node:fs"

export const fileUpload = asyncHandler(async (req, res) => {
    const file = req.file

    if(!file) {
        throw new ApiError(400, 'File not found!')
    }

    const content = fs.readFileSync(file.path, "utf-8")

    const result = await FileService.saveFileEmbeddings(file.originalname, content)

    res
    .status(200)
    .json(
        new ApiResponse(200, result, "File Saved!")
    )
})