import { genAI } from "../config/gemini.js";
import { ApiError } from "./ApiError.js";

export async function generateVectorEmbeddings(text: string) {
    const response = await genAI.models.embedContent({
        model: 'gemini-embedding-001',
        contents: text,
        config: {
            taskType: 'SEMANTIC_SIMILARITY',
        }
    });

    const embedding = response.embeddings;
    if(!embedding || !embedding[0]) {
        throw new ApiError(500, 'Failed to generate embeddings!')
    }
    return embedding[0].values;
}