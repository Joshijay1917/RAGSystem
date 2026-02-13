import { FileEmbeddings } from "../model/FileEmbeddings.model.js";
import { generateVectorEmbeddings } from "../utils/vectorEmbeddings.js";
import cosineSimilarity from "compute-cosine-similarity";

function chunkText(text: string, size = 500) {
    const chunks: string[] = [];
    for (let i = 0; i < text.length; i += size) {
        chunks.push(text.slice(i, i + size));
    }
    return chunks;
}

export class FileService {
    static async saveFileEmbeddings(name: string, content: string) {
        try {
            const chunks = chunkText(content);

            const chunkDocs: { text: string; embedding: number[] }[] = [];

            for (const chunk of chunks) {
                const embedding = await generateVectorEmbeddings(chunk);

                chunkDocs.push({
                    text: chunk,
                    embedding: embedding ? embedding : [],
                });
            }

            const fileDoc = await FileEmbeddings.create({
                name,
                content,
                chunks: chunkDocs,
            });

            return fileDoc;
        } catch (error) {
            console.error("saveFileEmbeddings error:", error);
            throw error;
        }
    }

    static async getFileEmbeddings(question: string) {
        const embeddings = await generateVectorEmbeddings(question)

        if(!embeddings) {
            throw Error('Failed to get embeddings!')
        }

        const docs = await FileEmbeddings.find();

        let matches: {
            text: string;
            score: number;
            docName: string;
        }[] = [];

        // 3️⃣ compare with each chunk
        for (const doc of docs) {
            for (const chunk of doc.chunks) {
                const score = cosineSimilarity(
                    embeddings,
                    chunk.embeddings as number[]
                );

                matches.push({
                    text: chunk.text,
                    score: score ? score : 0,
                    docName: doc.name,
                });
            }
        }

        // 4️⃣ sort by similarity
        matches.sort((a, b) => b.score - a.score);

        // 5️⃣ return top 3
        return matches.slice(0, 3);
    }
}