const DEFAULT_BASE_URL = 'https://api.groq.com'
const DEFAULT_MODEL = 'llama-3.3-70b-versatile'

export const aiConfig = {
  apiKey: (import.meta.env.VITE_AI_API_KEY || '').trim(),
  baseUrl: (import.meta.env.VITE_AI_BASE_URL || DEFAULT_BASE_URL).trim(),
  model: (import.meta.env.VITE_AI_MODEL || DEFAULT_MODEL).trim(),
  unavailableMessage: 'AI service temporarily unavailable. Please try again later.',
}

export function isAiApiKeyConfigured(apiKey = aiConfig.apiKey) {
  return Boolean(apiKey) && !apiKey.includes('...') && !apiKey.startsWith('your_')
}

export function buildAiChatUrl(baseUrl = aiConfig.baseUrl) {
  return `${baseUrl.replace(/\/$/, '')}/openai/v1/chat/completions`
}

export function getAiHeaders(apiKey = aiConfig.apiKey) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  }
}

export function getAiFallbackErrorMessage() {
  return aiConfig.unavailableMessage
}

export function getAiErrorMessage(status, body) {
  const detail = body?.error?.message || body?.message || ''

  if (status === 401) {
    return 'AI authentication failed. Please set a valid VITE_AI_API_KEY in your environment and redeploy.'
  }

  if (status === 429) {
    return 'AI service is rate limited right now. Please try again later.'
  }

  if (status >= 500) {
    return getAiFallbackErrorMessage()
  }

  return detail || getAiFallbackErrorMessage()
}