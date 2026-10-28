import { http } from "../../common/http";
import type {
  CreateInteractionRequest,
  CreateInteractionResponse,
  Interaction,
} from "../domain/interaction";

// El usuario se toma del token (lo agrega http.ts), nunca del body.
export function createInteraction(data: CreateInteractionRequest) {
  return http<CreateInteractionResponse>("/api/interactions", {
    method: "POST",
    body: data,
  });
}

type ListEnvelope = {
  data?: Interaction[];
  interacciones?: Interaction[];
  interactions?: Interaction[];
};

// La API puede responder el arreglo directo o dentro de un objeto.
function extractList(result: Interaction[] | ListEnvelope): Interaction[] {
  if (Array.isArray(result)) return result;

  const list = result.data ?? result.interacciones ?? result.interactions;

  if (!Array.isArray(list)) {
    throw new Error("La respuesta del servidor no tiene el formato esperado.");
  }

  return list;
}

// Consultas del usuario con sesión.
export async function getMyInteractions(): Promise<Interaction[]> {
  return extractList(
    await http<Interaction[] | ListEnvelope>("/api/interactions/mias"),
  );
}

// Todas las consultas: solo el administrador (el backend responde 403 a los demás).
export async function getAllInteractions(): Promise<Interaction[]> {
  return extractList(
    await http<Interaction[] | ListEnvelope>("/api/interactions"),
  );
}