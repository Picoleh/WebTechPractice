# BioMaterials CRUD

Full-stack CRUD application for biomaterials using:
- Backend: FastAPI + SQLAlchemy (raw SQL execution)
- Frontend: React + TypeScript + Vite + Tailwind
- Database: PostgreSQL (configured via environment variable)

## Project Structure

```text
bioMatvenv/
  backend/
    main.py
  frontend/
    src/
    package.json
  .gitignore
```

## Features

- List biomaterials with pagination
- Search biomaterials by name or type
- Get biomaterial by ID
- Create biomaterials
- Update biomaterials
- Delete biomaterials

## Prerequisites

- Python 3.12+ (recommended)
- Node.js 20+ and npm
- PostgreSQL database with schema/table:
  - `biomaterials_db.biomaterials`

## Backend Setup (FastAPI)

From the project root:

```powershell
cd backend
```

Install dependencies (if needed):

```powershell
pip install -r requirements.txt
```

### Environment Variable

The backend expects this file path:

```text
.env/dbInfo.env
```

Inside that file, define:

```env
DB_PATH=postgresql+psycopg2://USER:PASSWORD@HOST:5432/DB_NAME
```

Example:

```env
DB_PATH=postgresql+psycopg2://postgres:postgres@localhost:5432/biomaterials_db
```

### Run Backend

```powershell
fastapi dev main.py
```

Backend default URL:

```text
http://localhost:8000
```

## Frontend Setup (React + Vite)

From the project root:

```powershell
cd frontend
npm install
```

Run development server:

```powershell
npm run dev
```

Frontend default URL:

```text
http://localhost:5173
```

CORS is enabled in the backend for `http://localhost:5173`.

## API Endpoints

- `GET /` - health check
- `GET /biomaterials?page=<number>` - paginated list (3 items per page)
- `GET /biomaterials/search?q=<term>` - search by name or type
- `GET /biomaterials/{id}` - get one record by ID
- `POST /biomaterials` - create record
- `PUT /biomaterials/{id}` - update record
- `DELETE /biomaterials/{id}` - delete record

## Notes

- Current SQL in `backend/main.py` is built using string formatting. For production use, switch to parameterized queries to avoid SQL injection.
- Keep secret credentials out of git (already protected by `.gitignore`).

## Quick Start (Two Terminals)

Terminal 1:

```powershell
cd backend
fastapi dev main.py
```

Terminal 2:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## License

Add your preferred license (MIT, Apache-2.0, etc.) in this repository.
