export type Role = "admin" | "user";

export type User = {
  id: number;
  nombre: string;
  email: string;
  role: Role;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  nombre: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  mensaje: string;
  token: string;
  usuario: User;
};

export type RegisterResponse = {
  mensaje: string;
  usuario: User;
};

export type SessionResponse = {
  mensaje: string;
  usuario: { id: number; role: Role };
};