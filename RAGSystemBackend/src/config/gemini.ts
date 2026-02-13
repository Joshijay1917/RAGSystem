import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY
if(!apiKey) {
    throw Error('Gemini Api Key not found!')
}

const genAI = new GoogleGenAI({apiKey});

export { genAI }