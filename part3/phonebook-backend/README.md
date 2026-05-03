# Phonebook backend (part 3)

Express + Mongoose backend for the phonebook frontend (part 2).

## Setup

```bash
cp .env.example .env
# fill in MONGODB_URI from MongoDB Atlas
npm install
npm run dev
```

Endpoints:

- `GET    /api/persons`
- `GET    /api/persons/:id`
- `POST   /api/persons` — `{ name, number }`
- `PUT    /api/persons/:id` — `{ name, number }`
- `DELETE /api/persons/:id`
- `GET    /info`

## Production build of the frontend

Copy the `dist/` produced by `part2/phonebook` (`npm run build`) into this
directory and the backend will serve it as static files at `/`.

## Deploy

Deployable to Fly.io, Render, or Railway. The server reads `PORT` from env.
