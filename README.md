# BioMaterials CRUD

Full-stack CRUD application for biomaterials using:
- Backend: FastAPI
- Frontend: React + TypeScript + Vite + Tailwind
- Database: PostgreSQL

This project is intended to run with Docker Compose.

## Features

- List biomaterials with pagination
- Search biomaterials by name or type
- Get biomaterial by ID
- Create biomaterials
- Update biomaterials
- Delete biomaterials

## Docker Services

The `docker-compose.yml` file defines 3 services:
- `frontend`: Vite app exposed on port `5173`
- `backend`: FastAPI app exposed on port `8000`
- `db`: PostgreSQL 15 exposed on port `5432`

Named volume:
- `postgres_data`: persists PostgreSQL data

## Prerequisites

- Docker Desktop (or Docker Engine + Docker Compose)

Verify installation:

```powershell
docker --version
docker compose version
```

## Environment Configuration

The backend service uses this env file:

```text
.env/dbInfo.env
```

Create it if missing, then add:

```env
DB_PATH=postgresql+psycopg2://postgres:root@db:5432/postgres
```

Important:
- Use host `db` (the Docker service name), not `localhost`, for container-to-container DB access.

## Run With Docker Compose

From the project root (`bioMatvenv`):

```powershell
docker compose up --build
```

Run detached:

```powershell
docker compose up --build -d
```

Stop services:

```powershell
docker compose down
```

Stop and remove volumes (deletes DB data):

```powershell
docker compose down -v
```

## Access URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API docs (Swagger): http://localhost:8000/docs

## Common Docker Commands

View running containers:

```powershell
docker compose ps
```

View logs for all services:

```powershell
docker compose logs -f
```

View logs for one service:

```powershell
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```

Rebuild a single service:

```powershell
docker compose build backend
docker compose up -d backend
```

## Optional: Load SQL Dump

If you want to import `dump.sql` into the database:

```powershell
Get-Content .\dump.sql | docker exec -i postgres_db psql -U postgres -d postgres
```

Run this after the `db` service is up.

## API Endpoints

- `GET /` - health check
- `GET /biomaterials?page=<number>` - paginated list
- `GET /biomaterials/search?q=<term>` - search by name or type
- `GET /biomaterials/{id}` - get one record by ID
- `POST /biomaterials` - create record
- `PUT /biomaterials/{id}` - update record
- `DELETE /biomaterials/{id}` - delete record

## License

Add your preferred license (MIT, Apache-2.0, etc.) in this repository.
