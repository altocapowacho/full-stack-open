# full-stack-open

Mis ejercicios del curso [Full Stack Open](https://fullstackopen.com/en/) de la Universidad de Helsinki.

Cada carpeta `partN/` corresponde a una parte del curso y tiene varios proyectos dentro. Cada proyecto tiene su propio `package.json` y se ejecuta de forma independiente con `npm install && npm run dev`.

## Partes

- **part0** — diagramas de la app de notas (sequence diagrams en Mermaid).
- **part1** — React básico: `courseinfo`, `unicafe` (feedback con stats), `anecdotes` (votación).
- **part2** — fetching de datos con axios, services, formularios:
  - `phonebook` con json-server, filtro y notificaciones
  - `countries` consumiendo restcountries + OpenWeatherMap
- **part3** — backend Express + MongoDB: `phonebook-backend` con Mongoose, validaciones, ESLint.
- **part4** — `bloglist` backend con tests (Node test runner + supertest), JWT auth, middleware de tokenExtractor / userExtractor.
- **part5** — `bloglist-frontend` con login JWT, Togglable, tests con Vitest + RTL, E2E con Playwright en `part5/tests/`.
- **part6** — state management:
  - `unicafe-redux` (Redux clásico)
  - `redux-anecdotes` (Redux Toolkit + thunks + json-server)
  - `query-anecdotes` (TanStack Query + useReducer/Context)
- **part7** — React Router, custom hooks y bloglist extendido:
  - `routed-anecdotes` con `useField`
  - `country-hook` y `ultimate-hook`
  - `bloglist` reescrito con Router + React Query + react-bootstrap + comentarios

## Cómo ejecutar

```bash
cd part1/courseinfo
npm install
npm run dev
```

Los proyectos que necesitan json-server traen un script `npm run server`. Los backends de part3 y part4 necesitan `MONGODB_URI` (ver `.env.example` en cada uno).

Para el bloglist extendido de part7 hay que tener corriendo el backend de part4 en `localhost:3001` (el frontend tiene un proxy `/api → :3001` configurado en `vite.config.js`).
