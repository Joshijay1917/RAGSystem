import express from "express"
import fileRouter from "./routes/file.route.js"
import geminiRouter from "./routes/gemini.route.js"
import http from 'http'
import cors from 'cors'

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())

app.use('/api/file', fileRouter)
app.use('/api/ai', geminiRouter)

export { app, server }