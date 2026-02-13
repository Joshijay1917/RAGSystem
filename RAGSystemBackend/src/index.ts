import { Server } from "socket.io";
import { app, server } from "./app.js";
import { connectToDB } from "./config/database.js";

const PORT = process.env.PORT || 3000
export const io = new Server(server, { cors: { origin: '*' } })

io.on('connection', (socket) => {
    console.log('User connected:', socket.id)
})

server.listen(PORT, () => {
    connectToDB()
    console.log(`Websocket is running on port ${PORT}`)
})