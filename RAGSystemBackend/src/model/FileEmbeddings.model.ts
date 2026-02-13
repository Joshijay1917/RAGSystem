import mongoose from "mongoose";

type Chunk = {
    text: string;
    embeddings: Number[];
}

export interface FileEmbeddingsI {
    name: string,
    content: string,
    chunks: Chunk[]
}

const ChunkSchema = new mongoose.Schema({
    text: { type: String, required: true },
    embedding: { type: [Number], required: true }
});

const FileEmbeddingsSchema = new mongoose.Schema<FileEmbeddingsI>({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    chunks: [ChunkSchema]
}, { timestamps: true })

export const FileEmbeddings = mongoose.model('FileEmbedding', FileEmbeddingsSchema)