import os
import shutil
from pathlib import Path
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import PromptTemplate
from langchain_classic.chains import RetrievalQA

ENV_PATH = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=ENV_PATH, override=False)


def _get_google_api_key() -> str:
    key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
    if not key:
        raise RuntimeError(
            "Missing Gemini API key. Create server/.env with GOOGLE_API_KEY=your_key (or GEMINI_API_KEY=your_key)."
        )
    return key

# Initialize global variables (persistent across API calls)
CHROMA_DB_DIR = "./chroma_db"
vectordb = None
custom_qa = None
embeddings = None
llm = None

QA_PROMPT = PromptTemplate(
    input_variables=["context", "question"],
    template=(
        "You are Documind, an assistant that answers only from the provided PDF context. "
        "If the answer is not present in the context, say: 'The document does not contain enough information to answer that.'\n\n"
        "Context:\n{context}\n\n"
        "Question: {question}\n"
        "Answer in a clear, concise way."
    ),
)


def process_pdf(pdf_path: str):
    """
    Load a PDF, split into chunks, embed, and store in ChromaDB.
    """
    global vectordb, custom_qa, embeddings, llm

    # Reset the persisted database so the app only answers from the latest uploaded PDF.
    if os.path.exists(CHROMA_DB_DIR):
        shutil.rmtree(CHROMA_DB_DIR)

    loader = PyPDFLoader(pdf_path)
    documents = loader.load()
    print(f"Loaded {len(documents)} pages from PDF")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100
    )
    chunks = splitter.split_documents(documents)
    print(f"Total chunks created: {len(chunks)}")

    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    vectordb = Chroma(
    embedding_function=embeddings,
    persist_directory=CHROMA_DB_DIR
    )

    vectordb.add_documents(chunks)
    vectordb.persist()


    print("ChromaDB initialized with", vectordb._collection.count(), "embeddings")

    api_key = _get_google_api_key()

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=api_key
    )

    retriever = vectordb.as_retriever(search_kwargs={"k": 3})

    custom_qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True
        ,
        chain_type_kwargs={"prompt": QA_PROMPT}
    )

    return {"status": "PDF processed and stored successfully", "chunks": len(chunks)}


def _build_qa_chain(vectorstore: Chroma):
    """Create the retrieval QA chain for a given vector store."""
    global llm

    if llm is None:
        api_key = _get_google_api_key()
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            google_api_key=api_key,
        )

    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

    return RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": QA_PROMPT},
    )


def load_existing_qa():
    """Load an already processed PDF from disk if available."""
    global vectordb, custom_qa, embeddings

    if custom_qa is not None:
        return custom_qa

    if not os.path.exists(CHROMA_DB_DIR):
        return None

    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectordb = Chroma(
        embedding_function=embeddings,
        persist_directory=CHROMA_DB_DIR,
    )

    if vectordb._collection.count() == 0:
        return None

    custom_qa = _build_qa_chain(vectordb)
    return custom_qa


def answer_query(question: str):
    """
    Query the processed PDF using Gemini and return answer + sources.
    """
    global custom_qa

    if custom_qa is None:
        load_existing_qa()

    if custom_qa is None:
        return {"error": "No PDF processed yet. Upload and process a PDF first."}

    result = custom_qa.invoke({"query": question})

    answer = result["result"]
    sources = [doc.page_content[:200] for doc in result["source_documents"]]

    return {"answer": answer, "sources": sources}
