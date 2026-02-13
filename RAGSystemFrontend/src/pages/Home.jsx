import { useState } from "react";
import { useChat } from "../context/ChatContext";
import { useUser } from "../context/UserContext";

export default function Home() {
    const { uploadFiles, setFile } = useUser()
    const { query, setQuery, askAgent, messages, setMessages, aiMsgIndexRef } = useChat()

    function handleChange(e) {
        const selected = Array.from(e.target.files);
        if (!selected.length) return;

        setFile(selected);
        uploadFiles(selected)

        setMessages((prev) => [
            ...prev,
            { role: "ai", text: `Uploaded ${selected.length} file(s)` },
        ]);
    }

    async function send() {
        if (!query.trim()) return;

        setMessages((prev) => {
            const newMsgs = [
                ...prev,
                { role: "user", text: query },
                { role: "ai", text: "🧠 Thinking..." }
            ];

            aiMsgIndexRef.current = newMsgs.length - 1;

            return newMsgs;
        });

        setQuery("");

        const res = await askAgent();
        setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
                role: "ai",
                text: res || "No response",
            };
            return updated;
        });
    }

    return (
        <div className="min-h-screen w-full bg-zinc-950 text-white flex flex-col">

            {/* Header */}
            <div className="w-full border-b border-zinc-800 px-6 py-4">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-2xl font-bold">🧠 ChatAI</h1>
                    <p className="text-sm text-zinc-400">
                        Upload documents and ask questions from your private knowledge base
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 flex justify-center">
                <div className="w-full max-w-3xl space-y-4">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm ${m.role === "user"
                                ? "bg-indigo-600 text-white rounded-br-md"
                                : "bg-zinc-800 text-zinc-200 rounded-bl-md"}`}>{m.text}</div>
                        </div>
                    ))}
                    {/* Title */}
                    {/* <h2 className="text-xl text-center font-semibold">
                        Ask anything from your documents
                    </h2> */}

                    {/* Input Box */}
                    <div className="border-t border-zinc-800 p-4 bg-zinc-950 flex justify-center">
                        <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl p-2 flex items-center gap-3">

                            {/* Upload Button */}
                            <label
                                htmlFor="fileInput"
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-xl"
                            >
                                +
                            </label>
                            <input
                                id="fileInput"
                                onChange={handleChange}
                                type="file"
                                multiple
                                className="hidden"
                            />

                            {/* Text */}
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ask something from your knowledge base..."
                                className="flex-1 bg-transparent outline-none text-sm px-2"
                                onKeyDown={(e) => e.key === "Enter" && send()}
                            />

                            {/* Send */}
                            <button
                                onClick={send}
                                className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-xl font-medium text-sm"
                            >
                                Ask
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
