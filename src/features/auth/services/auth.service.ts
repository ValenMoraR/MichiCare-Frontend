import { http } from "../../common/http";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  SessionResponse,
} from "../domain/auth";

// Login y registro son públicos: no mandan token ni cierran sesión ante un 401.
export function login(data: LoginRequest) {
  return http<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: data,
    auth: false,
  });
}

export function register(data: RegisterRequest) {
  return http<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: data,
    auth: false,
  });
}

// Protegido: http.ts agrega el token automáticamente.
export function getSession() {
  return http<SessionResponse>("/api/auth/me");
}