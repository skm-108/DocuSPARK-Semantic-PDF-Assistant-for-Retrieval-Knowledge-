# ✨ DocuSPARK

<div align="center">

# 📄⚡ DocuSPARK  
### *AI-Powered PDF Question Answering Assistant*

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3N6bWtxM2h1N2F5N3R1d2NmdmV2MnB4a2FxdWl0aDF3d2M3ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0HlNaQ6gWfllcjDO/giphy.gif" width="850"/>

<br/>

![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react)
![Gemini](https://img.shields.io/badge/Google-Gemini-orange?style=for-the-badge&logo=google)
![LangChain](https://img.shields.io/badge/LangChain-RAG-success?style=for-the-badge)
![ChromaDB](https://img.shields.io/badge/ChromaDB-VectorDB-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-red?style=for-the-badge)

</div>

---

# 🚀 Overview

**DocuSPARK** is a modern AI-powered document assistant that allows users to upload PDF documents and ask questions in natural language.

Using an advanced **Retrieval-Augmented Generation (RAG)** pipeline, the system retrieves relevant document chunks and generates intelligent grounded answers using **Google Gemini AI**.

---

# ✨ Features

✅ Upload PDF Documents  
✅ AI-Powered Question Answering  
✅ Source-Aware Responses  
✅ Semantic Search  
✅ FastAPI Backend  
✅ Beautiful React Frontend  
✅ Chroma Vector Database  
✅ Gemini-Powered AI Generation  
✅ Fast & Lightweight Architecture  

---

# 🧠 How It Works

```text
          ┌──────────────────┐
          │   Upload PDF     │
          └────────┬─────────┘
                   ↓
          ┌──────────────────┐
          │ Text Extraction  │
          └────────┬─────────┘
                   ↓
          ┌──────────────────┐
          │  Chunk Creation  │
          └────────┬─────────┘
                   ↓
          ┌──────────────────┐
          │ Generate Vectors │
          └────────┬─────────┘
                   ↓
          ┌──────────────────┐
          │   Chroma Store   │
          └────────┬─────────┘
                   ↓
          ┌──────────────────┐
          │ Semantic Search  │
          └────────┬─────────┘
                   ↓
          ┌──────────────────┐
          │ Gemini Response  │
          └──────────────────┘
```

---

# 🛠 Tech Stack

## 🎨 Frontend
- React
- TypeScript
- Vite

## ⚙ Backend
- FastAPI
- Python

## 🤖 AI Stack
- LangChain
- ChromaDB
- Google Gemini API
- Sentence Transformers
- Hugging Face Embeddings

---

# 📂 Project Structure

```text
DocuSPARK/
│
├── client/                # React Frontend
│
├── server/                # FastAPI Backend
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── main.py
│
├── chroma_db/             # Vector Database
│
├── requirements.txt
│
└── README.md
```

---

# ⚙ Installation Guide

# 📌 Prerequisites

- Node.js 18+
- Python 3.11 Recommended
- Google Gemini API Key

---

# 🔧 Backend Setup

## 1️⃣ Navigate to Backend

```powershell
cd D:\DocuSpark\DocuSPARK\server
```

---

## 2️⃣ Create `.env`

```env
GOOGLE_API_KEY=your_real_gemini_api_key
```

---

## 3️⃣ Install Dependencies

```powershell
d:\DocuSpark\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

---

## 4️⃣ Run Backend Server

```powershell
d:\DocuSpark\.venv\Scripts\python.exe -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

---

# 🎨 Frontend Setup

## 1️⃣ Navigate to Frontend

```powershell
cd D:\DocuSpark\DocuSPARK\client
```

---

## 2️⃣ Install Packages

```powershell
npm install
```

---

## 3️⃣ Start Frontend

```powershell
npm run dev
```

---

# 🌐 Run Application

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://127.0.0.1:8000 |

---

# 📸 UI Preview

<div align="center">

<img src="https://media.giphy.com/media/coxQHKASG60HrHtvkt/giphy.gif" width="850"/>

</div>

---

# 🔥 Why DocuSPARK?

✨ Lightning-fast semantic retrieval  
✨ Human-like grounded responses  
✨ Clean developer architecture  
✨ Easy deployment & setup  
✨ Modern AI workflow  
✨ Optimized RAG pipeline  

---

# 🚀 Future Improvements

- ✅ Multi-PDF Chat
- ✅ Authentication System
- ✅ Cloud Deployment
- ✅ OCR Support
- ✅ PDF Highlighting
- ✅ Conversation Memory
- ✅ Drag & Drop Upload
- ✅ Dark Mode UI

---

# 🧩 Common Issues

## ❌ `ModuleNotFoundError: No module named 'pyaudioop'`

Python 3.13 removed support for `audioop`.

### ✅ Recommended Fix

Use Python 3.11:

```powershell
py -3.11 -m venv .venv
```

Then reinstall requirements:

```powershell
pip install -r requirements.txt
```

---

# 📄 License

Licensed under the MIT License.

---

# ⭐ Support

If you like this project:

🌟 Star the repository  
🍴 Fork the project  
📢 Share with developers  

---

<div align="center">

# 💙 Built with AI + Innovation

### Made using FastAPI, React, LangChain & Gemini

</div>
