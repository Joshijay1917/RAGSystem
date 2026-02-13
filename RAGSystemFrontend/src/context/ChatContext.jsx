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
        { role: "ai", text: "Hello 👋 Ask anything from your documents." },
    ]);
    const [loading, setLoading] = useState()
    const [error, seterror] = useState()

    const askAgent = async () => {
        const res = await apiHandler(() => askAI(query, getSocketId), setLoading, seterror)
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
                    updated[idx] = { role: "ai", text: "🧠 Thinking..." };
                }

                if (event.type === "searching") {
                    updated[idx] = { role: "ai", text: "🔎 Searching docs..." };
                }

                if (event.type === "results") {
                    updated[idx] = {
                        role: "ai",
                        text: `📄 Found ${event.data.length} matches`
                    };
                }

                if (event.type === "final") {
                    updated[idx] = {
                        role: "ai",
                        text: event.message
                    };
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