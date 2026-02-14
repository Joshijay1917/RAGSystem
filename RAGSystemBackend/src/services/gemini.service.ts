import { genAI } from "../config/gemini.js";
import { SYS_PROMPT } from "../utils/SYS_PROMPT.js";
import { FileService } from "./file.service.js";

const tools = {
    searchDB: async (query: string) => await FileService.getFileEmbeddings(query)
}
export type ChatResult =
    | { action: "search"; query: string }
    | { action: "answer"; response: string };

export async function chat(query: string, history: any[]): Promise<ChatResult | null> {
    const isGemma = true
    try {
        const chat = genAI.chats.create({
            model: 'gemma-3-27b-it',
            history: history.map((msg, index) => {
                let content = msg.text;
                if (isGemma && index === 0) {
                    content = `INSTRUCTIONS:\n${SYS_PROMPT}\n\nUSER MESSAGE:\n${msg.text}`;
                }
                return {
                    role: msg.role,
                    parts: [{ text: content }]
                }
            })
        })
        const res = await chat.sendMessage({
            message: query
        });
        const responseText = res.text || "";

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

export async function runAgent(userPrompt: string, socket: any, history: any[]) {
    socket.emit("agent:event", {
        type: "planning",
        message: "Thinking..."
    });

    const aiResponse = await chat(userPrompt, history);
    const act = aiResponse?.action;
    // let history = [];

    if (act === 'answer') {
        socket.emit("agent:event", {
            type: "final",
            message: aiResponse?.response
        });

        console.log(`🤖 Plan: ${aiResponse?.response}`);
        return aiResponse?.response;
    }

    socket.emit("agent:event", {
        type: "searching",
        message: `Searching for: ${aiResponse?.query}`
    });

    const args = aiResponse?.query

    if (args) {
        const r = await tools.searchDB(args)

        socket.emit("agent:event", {
            type: "results",
            message: `Found ${r.length} relevant chunks`,
            data: r
        });

        history.push({
            role: "model",
            text: JSON.stringify({
                action: "search_results",
                data: r
            })
        });

        socket.emit("agent:event", {
            type: "thinking",
            message: "Generating answer..."
        });

        console.log(`✅ action from ${act} with args ${args}: Success`);
        const context = r.map(r => `From ${r.docName}: ${r.text}`).join("\n\n");
        runAgent(`{"action": "search", "query": ${context}}`, socket, history)
    } else {
        socket.emit("agent:event", {
            type: "error",
            message: "Agent failed"
        });
        console.error(`❌ args ${args} not found.`);
    }
}