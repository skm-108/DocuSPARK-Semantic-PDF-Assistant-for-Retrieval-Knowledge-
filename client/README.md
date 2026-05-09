# DocuSPARK Client

The DocuSPARK client is the React + TypeScript frontend for uploading PDFs, asking questions, and reading grounded answers from the document.

## Highlights

- Clean upload flow for PDF documents
- Natural-language question input
- Source-aware answer cards
- Fast Vite-based development experience

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Radix UI
- Lucide icons

## Local Development

### Prerequisites

- Node.js 18+
- npm
- The DocuSPARK backend running on `http://127.0.0.1:8000`

### Install dependencies

```powershell
cd D:\DocuSpark\DocuSPARK\client
npm install
```

### Start the app

```powershell
npm run dev
```

Then open:

- Frontend: `http://localhost:5173`

## Environment

Create `client/.env` if you want to override the backend URL:

```env
VITE_BACKEND_URL=http://127.0.0.1:8000
```

If this variable is missing, the client falls back to `http://127.0.0.1:8000`.

## How It Works

1. Upload a PDF from the upload card.
2. The file is sent to the FastAPI backend.
3. The backend indexes the PDF into Chroma.
4. Ask a question in the query box.
5. The app displays the answer and source snippets.

## Development Notes

- The root page renders the full DocuSPARK experience.
- The upload and query components are visible on the homepage.
- If you restart the backend, upload the PDF again before querying.

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - type-check and build for production
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build
