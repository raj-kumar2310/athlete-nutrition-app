Environment variables

Purpose: Store secret API keys and configuration (not committed to git).

How to use: copy `.env.example` to `.env` and set your key:

```bash
cp .env.example .env
# then edit .env and replace the placeholder with your real key
```

Key name: `VITE_GROQ_API_KEY` — accessed in code with `import.meta.env.VITE_GROQ_API_KEY`.

Important: Keep `.env` out of version control (this repo already ignores `.env`). If the key was previously committed, rotate it.
