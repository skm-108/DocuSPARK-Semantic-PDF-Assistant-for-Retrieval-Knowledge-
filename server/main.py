import os
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from rag_pipeline import process_pdf, answer_query
from models.query_model import QueryRequest, QueryResponse
import shutil
from pypdf import PdfReader


app = FastAPI(title="Documind", version="1.0")

# Allow frontend (React) to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # change to ["http://localhost:3000"] in dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Documind backend is running 🚀"}


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        temp_path = f"./temp_{file.filename}"
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result = process_pdf(temp_path)

        os.remove(temp_path)

        return {"message": "PDF processed successfully", "details": result}

    except Exception as e:
        return {"error": str(e)}


@app.post("/query", response_model=QueryResponse)
async def query_pdf(request: QueryRequest):
    
    try:
        result = answer_query(request.question)
        if "error" in result:
            return {"answer": result["error"], "sources": []}

        return {"answer": result["answer"], "sources": result["sources"]}

    except Exception as e:
        return {"answer": f"Error: {str(e)}", "sources": []}
