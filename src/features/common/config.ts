// URL base de la API. Se lee de NEXT_PUBLIC_API_HOST (.env.local / Vercel).
export const API_BASE_URL: string = (
  process.env.NEXT_PUBLIC_API_HOST ?? "http://localhost:3000"
).replace(/\/$/, "");