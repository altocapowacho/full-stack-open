# Bloglist E2E (Playwright)

End-to-end tests for the part 5 bloglist app.

## Setup

The backend must expose a `POST /api/testing/reset` endpoint that wipes
blogs and users (already implemented in `part4/bloglist/controllers/testing.js`
when running with `NODE_ENV=test`).

```bash
# in part4/bloglist
cross-env NODE_ENV=test npm start

# in part5/bloglist-frontend
npm run dev   # serves on http://localhost:5173

# in this folder
npm install
npx playwright install chromium
npm test
```

Override the frontend URL with `BASE_URL`. The backend host is hardcoded to
`http://localhost:3003` inside the test helpers.
