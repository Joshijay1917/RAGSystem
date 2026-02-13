import { genAI } from "../config/gemini.js";
import { SYS_PROMPT } from "../utils/SYS_PROMPT.js";
import { FileService } from "./file.service.js";

const tools = {
    searchDB: async (query: string) => await FileService.getFileEmbeddings(query)
}
export type ChatResult =
    | { action: "search"; query: string }
    | { action: "answer"; response: string };

export async function chat(query: string): Promise<ChatResult | null> {
    try {
        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: 'user', parts: [{ text: query }] }],
            config: {
                systemInstruction: SYS_PROMPT,
                temperature: 0.2
            },
        })
        const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        console.log("RAW AI:", responseText);

        const cleanJson = responseText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        try {
            const parsed = await JSON.parse(cleanJson);
            return parsed;
        } catch (error) {
            console.log("JSON parse failed");

            // fallback → treat as final answer
            return {
                action: "answer",
                response: cleanJson,
            };
        }
    } catch (error) {
        console.error("Chat error:", error);
        return null;
    }
}

export async function runAgent(userPrompt: string) {
    const aiResponse = await chat(userPrompt);
    const act = aiResponse?.action;
    let history = [];

    if(act === 'answer') {
        console.log(`🤖 Plan: ${aiResponse?.response}`);
        return aiResponse?.response;
    }

    const args = aiResponse?.query

    if(args) {
        const result = await tools.searchDB(args)
        history.push({
            action: name,
            response: result
        });
        console.log(`✅ action from ${act} with args ${args}: Success`);
        runAgent(`{"action": "search", "query": ${result}}`)
    } else {
        console.error(`❌ args ${args} not found.`);
    }
}