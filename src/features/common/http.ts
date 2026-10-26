import { API_BASE_URL } from "./config";

const TOKEN_KEY = "michicare_token";

export const tokenStorage = {
  get(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(TOKEN_KEY);
  },
  set(token: string): void {
    window.localStorage.setItem(TOKEN_KEY, token);
  },
  clear(): void {
    window.localStorage.removeItem(TOKEN_KEY);
  },
};

export class ApiError extends Error {
  status: number;
  fields?: Record<string, string>;

  constructor(status: number, message: string, fields?: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  // false = endpoint público de sesión (login/register): no manda token
  // y un 401 NO cierra sesión ni redirige.
  auth?: boolean;
};

export async function http<T>(
  path: string,
  { method = "GET", body, auth = true }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";

  const token = auth ? tokenStorage.get() : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "No se pudo conectar con el servidor.");
  }

  // Sesión vencida o token inválido: cerrar sesión y volver a /login.
  if (response.status === 401 && auth && token) {
    tokenStorage.clear();
    window.dispatchEvent(new Event("auth:logout"));
    window.location.assign("/login");
    throw new ApiError(401, "Tu sesión expiró. Inicia sesión de nuevo.");
  }

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const payload = (data ?? {}) as {
      mensaje?: string;
      message?: string;
      errores?: Record<string, string>;
    };
    throw new ApiError(
      response.status,
      payload.mensaje ?? payload.message ?? "Ocurrió un error inesperado.",
      payload.errores,
    );
  }

  return data as T;
}