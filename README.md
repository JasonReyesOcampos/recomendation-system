# Recomendation System

Sistema de recomendaciones de películas basado en IA: el usuario describe lo que se le antoja ver y un backend NestJS consulta a un LLM para devolver entre 3 y 5 películas con sus pósters generados.

## Stack

- **Backend:** NestJS 11 + OpenAI SDK (apuntando a OpenCode Zen) + class-validator
- **LLM:** OpenCode Zen — modelo `opencode/deepseek-v4-flash-free` (gratis)
- **Imágenes:** Pollinations.ai (gratis, sin API key)
- **Frontend:** React 19 + Vite + Tailwind CSS 4 + TanStack Query + axios
- **Gestor de paquetes:** pnpm 10 (workspaces)
- **Node:** >= 22

## Estructura

```
.
├── backend/      App NestJS (puerto 3000)
├── frontend/     App React + Vite (puerto 5173)
├── package.json  Workspace raíz + scripts comunes
└── pnpm-workspace.yaml
```

## Arrancar el sistema

```bash
# 1. Instalar dependencias de ambos paquetes
pnpm install

# 2. Copiar y completar variables de entorno
cp backend/.env.example backend/.env
# editar backend/.env y poner tu OPENCODE_API_KEY (https://opencode.ai/auth)

cp frontend/.env.example frontend/.env.local
# si el backend corre en otro host/puerto, editar VITE_API_URL

# 3. Levantar ambos en paralelo (en dos terminales)
pnpm dev:backend
pnpm dev:frontend
```

Backend en http://localhost:3000 — frontend en http://localhost:5173.

## Scripts del workspace

| Script                | Qué hace                                    |
| --------------------- | ------------------------------------------- |
| `pnpm dev:backend`    | NestJS en watch mode                        |
| `pnpm dev:frontend`   | Vite dev server                             |
| `pnpm build`          | Build de ambos paquetes                     |
| `pnpm lint`           | ESLint en ambos                             |
| `pnpm test`           | Tests del backend (Jest)                    |
| `pnpm format`         | Prettier write en todo el repo              |
| `pnpm format:check`   | Verifica formato sin escribir               |

## Endpoint

```
POST /recommendations
Content-Type: application/json

{ "prompt": "una película de ciencia ficción con un giro filosófico" }
```

Respuesta:

```json
{
  "recommendations": [
    {
      "title": "...",
      "year": 2014,
      "genre": "Sci-Fi",
      "synopsis": "...",
      "justification": "...",
      "imageUrl": "https://..."
    }
  ]
}
```

## Convenciones

- Code style: Prettier centralizado en `.prettierrc` raíz.
- EOL: LF en todo el repo (forzado por `.gitattributes`).
- Branching: PRs a `main`. CI corre lint + build automáticamente.
- TypeScript en strict mode tanto en backend como frontend.
