## 🤖 AI Prompts Used During Development

This project was built with the help of AI-assisted development.
Below are the key prompts used to design architecture, debug issues, and implement features.

---

### 🏗 Architecture & Setup

* Create a full-stack MERN app with Socket.IO running on the same port
* Design a RAG (Retrieval Augmented Generation) system using Node.js and React
* How to structure a real-time AI agent system with planning → search → answer flow
* Best folder structure for scalable MERN backend
* How to deploy MERN + Socket.IO on Render

---

### 📂 File Upload + RAG Pipeline

* Create Express route for multiple file uploads using multer
* How to process uploaded documents and store chunks in MongoDB
* Build document search system for AI agent
* How to send search results to frontend via WebSocket
* Show sources used in AI response

---

### 🤖 AI Agent Logic

* Create recursive AI agent loop (plan → search → generate)
* Stream AI responses using Socket.IO
* Send intermediate agent events (planning, searching, results, final)
* How to manage agent state in React chat UI
* Show sources in final AI message

---

### 💬 Chat UI

* Build ChatGPT-like interface in React + Tailwind
* Maintain chat message state with streaming updates
* Show AI typing / thinking states
* Attach sources to final response message
* Scroll to latest message automatically

---

### 🌐 Real-time Communication

* Setup Socket.IO client + server
* Handle reconnect issues
* Debug WebSocket errors on production
* Share session ID between REST and socket
* Emit agent events from backend to frontend

---

### 🧪 Debugging Prompts

* Why is socket connection closing before established?
* Fix Render deployment build errors
* Fix missing package.json in Render build path
* Handle CORS with Socket.IO
* Fix infinite refresh loop in auth context

---

### 📊 Status Page

* Create system status API endpoint
* Check MongoDB connection health
* Check LLM API availability
* Show backend health in React UI
* Auto-refresh status every few seconds

---

### 🎨 UI/UX

* Create simple home page with steps
* Sidebar layout for chat + uploads
* Show uploaded files list
* Add loading states for AI
* Minimal dark theme UI

---

### 🚀 Deployment

* Deploy backend on Render
* Deploy frontend on Vercel
* Connect frontend to deployed backend
* Handle environment variables
* Fix production socket URL issues

---

### 🧠 Learning Goals

* Understand real-time AI systems
* Build production-ready MERN apps
* Implement RAG pipeline
* Deploy full-stack AI project