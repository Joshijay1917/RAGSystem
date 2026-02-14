import { createContext, useContext, useEffect, useRef, useState } from "react";
import { socket } from "../utils/socket";
import { apiHandler } from "../utils/apiHandler";
import { askAI } from "../services/agent.service";

const ChatContext = createContext(null)

export const useChat = () => useContext(ChatContext)

export const ChatContextProvider = ({ children }) => {
    const [getSocketId, setGetSocketId] = useState()
    const [query, setQuery] = useState("")
    const aiMsgIndexRef = useRef(null);
    const [messages, setMessages] = useState([
        { role: "model", text: "Hello 👋 Ask anything from your documents." },
    ]);
    const sourceRef = useRef([]);
    const [loading, setLoading] = useState()
    const [error, seterror] = useState()

    const askAgent = async () => {
        const res = await apiHandler(() => askAI(query, getSocketId, messages), setLoading, seterror)
        console.log(res)
        return res.data.data
    }

    useEffect(() => {
        socket.on("connect", () => {
            setGetSocketId(socket.id);
        });
    }, []);

    // 🔥 LISTEN AGENT EVENTS HERE
    useEffect(() => {
        socket.on("agent:event", (event) => {
            console.log("EVENT:", event);

            setMessages(prev => {
                const updated = [...prev];
                const idx = aiMsgIndexRef.current;

                if (idx === null) return prev;

                if (event.type === "planning") {
                    updated[idx] = { role: "model", text: "🧠 Thinking..." };
                }

                if (event.type === "searching") {
                    updated[idx] = { role: "model", text: "🔎 Searching docs..." };
                }

                if (event.type === "results") {
                    sourceRef.current = event.data;
                    console.log('Source:', sourceRef.current)
                    updated[idx] = {
                        role: "model",
                        text: `📄 Found ${event.data.length} matches`
                    };
                }

                if (event.type === "final") {
                    console.log('Final Source:', sourceRef.current)
                    updated[idx] = {
                        role: "model",
                        text: event.message,
                        sources: sourceRef.current
                    };
                    sourceRef.current = [];
                }

                return updated;
            })
        });

        return () => socket.off("agent:event");
    }, [])

    const values = {
        socket,
        query,
        setQuery,
        askAgent,
        messages,
        setMessages,
        aiMsgIndexRef
    }

    return (
        <ChatContext.Provider value={values}>
            {children}
        </ChatContext.Provider>
    )
}