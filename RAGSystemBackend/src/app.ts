import express from "express"
import fileRouter from "./routes/file.route.js"
import geminiRouter from "./routes/gemini.route.js"

const app = express()

app.use(express.json())

app.use('/api/file', fileRouter)
app.use('/api/ai', geminiRouter)

export { app }