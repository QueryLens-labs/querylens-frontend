# QueryLens Frontend

The QueryLens web client is built with React, TypeScript, Vite, and Tailwind CSS.

## Requirements

- Node.js 20.19 or later and npm.

## Local development

From this directory:

```powershell
npm ci
npm run dev
```

Vite serves the application at <http://localhost:5173> and forwards `/api` requests to <http://localhost:8000>. To use all features, start the API and PostgreSQL from the sibling `querylens-backend` repository by following its README.

## Backend contract

The frontend calls `GET /api/health` and `POST /api/analyze`, using the schemas defined in the backend's `app/schemas.py`. During local development, Vite proxies `/api` to the local API. In Docker Compose, Nginx serves the frontend and proxies `/api` to the backend service on the internal network. Keep routes and schemas coordinated with `querylens-backend`; do not duplicate SQL validation in the client.

The project roadmap is maintained in the backend repository: [TODO.md on GitHub](https://github.com/querylens-labs/querylens-backend/blob/main/TODO.md). In the local workspace, it is available at `../querylens-backend/TODO.md`.

The image `docs/Interfaz.png` is retained as the original visual reference; it does not, by itself, represent the Phase 1 implementation.

## Build

```powershell
npm run build
```

Development instructions are in [AGENTS.md](AGENTS.md). Claude Code should read [CLAUDE.md](CLAUDE.md).
