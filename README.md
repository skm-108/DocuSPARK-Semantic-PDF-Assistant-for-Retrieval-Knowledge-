# DocuSPARK

DocuSPARK is an AI-powered document assistant for uploading PDFs, asking questions in natural language, and getting grounded answers from the document itself.

## What it does

- Upload PDF documents through a simple React interface.
- Split and index the document into searchable chunks.
- Ask questions and get answers powered by a RAG pipeline.
- View source snippets from the uploaded document.

## Architecture

DocuSPARK uses a lightweight Retrieval-Augmented Generation flow:

1. A PDF is uploaded from the browser.
2. The backend extracts text from the file.
3. The text is split into chunks and embedded with `sentence-transformers/all-MiniLM-L6-v2`.
4. The chunks are stored in Chroma.
5. A Gemini model generates answers using the retrieved context.

## Tech Stack

- Frontend: React, TypeScript, Vite
- Backend: FastAPI, Python
- AI: LangChain, Chroma, Gemini API, Hugging Face embeddings

## Project Structure

- `client/` - React frontend
- `server/` - FastAPI backend and RAG pipeline

## Setup

### Prerequisites

- Node.js 18+
- Python 3.13+
- A Gemini API key from Google AI Studio

### Backend

1. Open the server folder:
  ```powershell
  cd D:\DocuSpark\DocuSPARK\server
  ```

2. Create `server/.env` and add your key:
  ```env
  GOOGLE_API_KEY=your_real_gemini_api_key
  ```

3. Install dependencies:
  ```powershell
  d:\DocuSpark\.venv\Scripts\python.exe -m pip install -r requirements.txt
  ```

4. Start the backend:
  ```powershell
  d:\DocuSpark\.venv\Scripts\python.exe -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
  ```

### Frontend

1. Open the client folder:
  ```powershell
  cd D:\DocuSpark\DocuSPARK\client
  ```

2. Install dependencies:
  ```powershell
  npm install
  ```

3. Start the frontend:
  ```powershell
  npm run dev
  ```

## Run the app

Once both servers are running, open:

- Frontend: `http://localhost:5173`
- Backend: `http://127.0.0.1:8000`

## How to use

1. Upload a PDF.
2. Wait for the document to be processed.
3. Type a question about the PDF.
4. Press Enter and review the answer and sources.

## Notes

- The backend keeps the latest processed PDF in Chroma storage.
- If you restart the backend and want to query again, upload the PDF again.
- If the app shows no answer, confirm the PDF was processed successfully and the Gemini key is present in `server/.env`.

## License

This project is licensed under the MIT License.
