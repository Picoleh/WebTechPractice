# BioMaterials CRUD Frontend

React + TypeScript frontend for managing biomaterials.

## Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds production assets
- `npm run preview`: Serves the production build locally
- `npm run lint`: Runs ESLint checks

## Setup

1. Install dependencies:

```powershell
npm install
```

2. Start the app:

```powershell
npm run dev
```

Default app URL:

```text
http://localhost:5173
```

## Backend Connection

This frontend is intended to work with the FastAPI backend running at:

```text
http://localhost:8000
```

If your backend URL changes, update API calls in the source files under `src/Menu` and related utility components.

## Main Folders

```text
src/
  Menu/    # Form, listing, and feature components
  Util/    # Shared helpers/utilities
  assets/  # Static frontend assets
```

## Notes

- Run frontend and backend together for full functionality.
- Ensure backend CORS includes `http://localhost:5173`.
