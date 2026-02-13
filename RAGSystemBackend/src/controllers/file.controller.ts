import { FileService } from "../services/file.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "node:fs"

export const fileUpload = asyncHandler(async (req, res) => {
    let files: Express.Multer.File[] = [];

    if (Array.isArray(req.files)) {
        files = req.files;
    } else if (req.files && typeof req.files === "object") {
        files = Object.values(req.files).flat();
    }

    if (!files) {
        throw new ApiError(400, 'File not found!')
    }

    let results = [];
    for (const file of files) {
        const content = fs.readFileSync(file.path, "utf-8")
        const result = await FileService.saveFileEmbeddings(file.originalname, content)
        results.push(result)
    }

    res
        .status(200)
        .json(
            new ApiResponse(200, results, "File Saved!")
        )
})