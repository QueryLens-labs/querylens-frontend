# Instrucciones de desarrollo: QueryLens Frontend

## Alcance y tecnologías

Este repositorio contiene el cliente web de QueryLens: React, TypeScript, Vite y Tailwind CSS. No implementes funcionalidades nuevas ni rediseñes la aplicación salvo que la petición lo solicite. No cambies tecnologías, versiones ni dependencias sin necesidad justificada.

## Documentation language

Keep project documentation, including the roadmap in ../querylens-backend/TODO.md and both repositories' README.md files, entirely in English. When editing a README, write the complete document in English. Do not change the application UI language unless requested.

## Forma de trabajar

1. Inspecciona el código y las instrucciones antes de cambiarlo.
2. Limita los cambios a la petición concreta; consulta el roadmap general en ../querylens-backend/TODO.md cuando el workspace hermano esté disponible, pero no ejecutes sus tareas automáticamente.
3. Conserva la estructura y el estilo existentes, evita abstracciones innecesarias y no elimines capacidades actuales.
4. Investiga los errores antes de modificar código para corregirlos.
5. No añadas dependencias si la tarea puede resolverse con lo existente.
6. No incluyas secretos, archivos .env reales, node_modules, dist ni cachés en Git.
7. No hagas commits, push, despliegues ni operaciones destructivas sin autorización expresa.
8. Al terminar, informa qué cambió, los archivos principales, las verificaciones ejecutadas y los pendientes.

## Comunicación con la API

La API y sus esquemas viven en querylens-backend (app/main.py y app/schemas.py). El contrato actual usa GET /api/health y POST /api/analyze. El cliente usa rutas relativas /api; Vite las reenvía a http://localhost:8000 durante el desarrollo local. En Docker Compose, Nginx reenvía /api al servicio backend. Coordina cualquier cambio de rutas o tipos con el repositorio backend y no presentes métricas estimadas como mediciones reales.

Si está abierto el workspace Multi-root, lee también ../querylens-backend/AGENTS.md para los cambios que crucen la API, Docker o la base de datos. ../querylens-backend/.github/agents/querylens.agent.md contiene el agente personalizado de QueryLens para el workspace.

## Verificación

La compilación del frontend se ejecuta con npm run build; para instalar las dependencias fijadas usa npm ci. Ejecuta las comprobaciones pertinentes a la tarea y reporta su resultado con precisión.
