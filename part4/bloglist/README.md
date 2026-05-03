# Bloglist backend (part 4)

REST API for blog posts with users + JWT authentication.

## Setup

```bash
cp .env.example .env
# fill MONGODB_URI, TEST_MONGODB_URI, SECRET
npm install
npm run dev
```

## Endpoints

- `GET    /api/blogs`
- `GET    /api/blogs/:id`
- `POST   /api/blogs`        — requires `Authorization: Bearer <jwt>`
- `PUT    /api/blogs/:id`
- `DELETE /api/blogs/:id`    — only creator (Bearer token)
- `GET    /api/users`
- `POST   /api/users`        — `{ username, name, password }`
- `POST   /api/login`        — returns `{ token, username, name }`

## Tests

Uses Node's built-in test runner. Requires `TEST_MONGODB_URI` pointing to a
separate database (the suite wipes it).

```bash
npm test
```
