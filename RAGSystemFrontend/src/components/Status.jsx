import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

export default function Status() {
    const { status, getStatus } = useUser()

    useEffect(() => {
        getStatus()
    }, [])
    

    const Badge = ({ label, value }) => (
        <div className="flex justify-between items-center bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <span>{label}</span>
            <span className={value === "ok" ? "text-green-400" : "text-red-400"}>
                {value === "ok" ? "● Healthy" : "● Down"}
            </span>
        </div>
    );

    return (
        <div className="min-h-screen w-full bg-zinc-950 text-white flex justify-center items-center p-6">
            <div className="w-full max-w-md space-y-4">

                <h1 className="text-2xl font-bold text-center mb-6">System Status</h1>

                {!status && <p className="text-center text-zinc-400">Checking...</p>}

                {status && (
                    <>
                        <Badge label="Backend" value={status.backend} />
                        <Badge label="Database" value={status.database} />
                        <Badge label="LLM" value={status.llm} />
                    </>
                )}

            </div>
        </div>
    );
}