Environment variables

Purpose: Store secret API keys and configuration (not committed to git).

How to use: copy `.env.example` to `.env` and set your key:

```bash
cp .env.example .env
# then edit .env and replace the placeholder with your real key
```

Key name: `VITE_AI_API_KEY` — accessed in code with `import.meta.env.VITE_AI_API_KEY`.

Optional base URL: `VITE_AI_BASE_URL` — defaults to `https://api.groq.com`.

Vercel deployment: add the same variables in the project Settings > Environment Variables, then redeploy.

Important: Keep `.env` out of version control (this repo already ignores `.env`). If the key was previously committed, rotate it.
