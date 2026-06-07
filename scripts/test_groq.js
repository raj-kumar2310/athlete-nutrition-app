// Read API key from environment variable to avoid committing secrets
const key = process.env.VITE_AI_API_KEY || process.env.GROQ_API_KEY || '';
const payload = {
  model: 'llama-3.3-70b-versatile',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Reply with a short JSON object {"ok":true}' }
  ],
  temperature: 0.2
};

(async () => {
  try {
    if (!key) {
      throw new Error('Missing API key. Set VITE_AI_API_KEY or GROQ_API_KEY in your environment.');
    }
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key
      },
      body: JSON.stringify(payload)
    });

    console.log('STATUS', res.status);
    const text = await res.text();
    console.log(text);
  } catch (err) {
    console.error('ERROR', err);
  }
})();
