import { Server } from "socket.io";
import { app, server } from "./app.js";
import { connectToDB } from "./config/database.js";

const PORT = process.env.PORT || 3000
export const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://my-ragsystem-app.vercel.app"
        ],
        methods: ["GET", "POST"]
    },
    transports: ["websocket", "polling"]
})

io.on('connection', (socket) => {
    console.log('User connected:', socket.id)
})

server.listen(PORT, () => {
    connectToDB()
    console.log(`Websocket is running on port ${PORT}`)
})