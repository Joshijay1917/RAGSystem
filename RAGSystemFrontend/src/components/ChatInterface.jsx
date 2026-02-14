import { useState } from "react";
import { useChat } from "../context/ChatContext";

export default function ChatInterface() {
    const { messages, setMessages } = useChat()
    const [input, setInput] = useState("");

    function sendMessage() {
        if (!input.trim()) return;

        setMessages((prev) => [
            ...prev,
            { role: "user", text: input },
            { role: "ai", text: "Thinking..." }, // placeholder
        ]);

        setInput("");
    }

    return (
        <div className="flex flex-col h-full w-full max-w-3xl mx-auto">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 py-6 px-2">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={` max-w-[70%] px-4 py-3 rounded-2xl text-sm
                                        ${msg.role === "user"
                                                    ? "bg-indigo-600 text-white rounded-br-md"
                                                    : "bg-zinc-800 text-zinc-200 rounded-bl-md"
                                        }
                                    `}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="border-t border-zinc-800 p-4 bg-zinc-950">
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl px-3 py-2">

                    {/* input */}
                    <input
                        type="text"
                        placeholder="Ask something..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-sm"
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />

                    {/* send */}
                    <button
                        onClick={sendMessage}
                        className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-sm font-medium"
                    >
                        Send
                    </button>
                </div>
            </div>

        </div>
    );
}