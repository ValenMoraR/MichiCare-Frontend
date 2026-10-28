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

export async function getMyInteractions(): Promise<Interaction[]> {
  const result = await http<Interaction[] | ListEnvelope>(
    "/api/interactions/mias",
  );

  // La API puede responder el arreglo directo o dentro de un objeto.
  if (Array.isArray(result)) return result;

  const list = result.data ?? result.interacciones ?? result.interactions;

  if (!Array.isArray(list)) {
    throw new Error("La respuesta del servidor no tiene el formato esperado.");
  }

  return list;
}