# QueryLens Frontend

Frontend de QueryLens, construido con React, TypeScript, Vite y Tailwind CSS.

## Requisitos

- Node.js 20.19 o posterior y npm.

## Desarrollo local

Desde este directorio:

    npm ci
    npm run dev

Vite publica la aplicación en http://localhost:5173 y reenvía las solicitudes /api a http://localhost:8000. Para usar todas las funciones, arranca la API y PostgreSQL desde el repositorio hermano querylens-backend siguiendo su README.

## Contrato con el backend

El frontend llama GET /api/health y POST /api/analyze, con el formato definido por el backend en app/schemas.py. En desarrollo local, Vite hace proxy de /api a la API local. En Docker Compose, Nginx sirve el frontend y hace proxy de /api al servicio backend en la red interna. Mantén las rutas y los esquemas coordinados con querylens-backend; no dupliques validaciones SQL en el cliente.

El roadmap general está en el repositorio backend: [TODO.md en GitHub](https://github.com/QueryLens/querylens-backend/blob/main/TODO.md). En el workspace local se encuentra en ../querylens-backend/TODO.md.

La imagen docs/Interfaz.png se conserva como referencia visual original; no representa por sí misma la interfaz implementada en la Fase 1.

## Compilación

    npm run build

Las instrucciones de desarrollo están en [AGENTS.md](AGENTS.md). Claude Code debe leer [CLAUDE.md](CLAUDE.md).