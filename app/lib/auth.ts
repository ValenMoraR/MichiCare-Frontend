
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  role: "admin" | "user";
}

interface RespuestaRegistro {
  mensaje: string;
  usuario: Usuario;
}

interface RespuestaError {
  mensaje?: string;
}

export async function registrarUsuario(datos: {
  nombre: string;
  email: string;
  password: string;
}): Promise<RespuestaRegistro> {
  if (!API_URL) {
    throw new Error("No está configurada la URL del backend.");
  }

  const respuesta = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  const resultado = (await respuesta.json()) as
    | RespuestaRegistro
    | RespuestaError;

  if (!respuesta.ok) {
    throw new Error(
      "mensaje" in resultado && resultado.mensaje
        ? resultado.mensaje
        : "No fue posible registrar la cuenta.",
    );
  }

  return resultado as RespuestaRegistro;
}


interface RespuestaLogin {
  mensaje: string;
  token: string;
  usuario: Usuario;
}

export async function iniciarSesion(datos: {
  email: string;
  password: string;
}): Promise<RespuestaLogin> {
  if (!API_URL) {
    throw new Error("No está configurada la URL del backend.");
  }

  const respuesta = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  const resultado = (await respuesta.json()) as
    | RespuestaLogin
    | RespuestaError;

  if (!respuesta.ok) {
    throw new Error(
      "mensaje" in resultado && resultado.mensaje
        ? resultado.mensaje
        : "No fue posible iniciar sesión.",
    );
  }

  return resultado as RespuestaLogin;
}


interface RespuestaSesion {
  mensaje: string;
  usuario: {
    id: number;
    role: "admin" | "user";
  };
}

export async function obtenerSesion(token: string): Promise<RespuestaSesion> {
  if (!API_URL) {
    throw new Error("No está configurada la URL del backend.");
  }

  const respuesta = await fetch(`${API_URL}/api/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resultado = (await respuesta.json()) as
    | RespuestaSesion
    | RespuestaError;

  if (!respuesta.ok) {
    throw new Error(
      "mensaje" in resultado && resultado.mensaje
        ? resultado.mensaje
        : "No fue posible verificar la sesión.",
    );
  }

  return resultado as RespuestaSesion;
}
