import type { User } from "../domain/auth";

const USER_KEY = "michicare_user";

// Guarda los datos públicos del usuario (nombre, rol) para pintar la barra
// de navegación sin esperar a la API. El token vive en common/http.ts.
export const userStorage = {
  get(): User | null {
    if (typeof window === "undefined") return null;

    try {
      const raw = window.localStorage.getItem(USER_KEY);
      if (!raw) return null;

      const parsed = JSON.parse(raw) as Partial<User>;

      if (
        typeof parsed.id === "number" &&
        typeof parsed.nombre === "string" &&
        typeof parsed.email === "string" &&
        (parsed.role === "admin" || parsed.role === "user")
      ) {
        return parsed as User;
      }
    } catch {
      // JSON dañado: se trata como si no hubiera sesión.
    }

    return null;
  },
  set(user: User): void {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear(): void {
    window.localStorage.removeItem(USER_KEY);
  },
};