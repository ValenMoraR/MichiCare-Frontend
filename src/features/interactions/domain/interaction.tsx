export type InteractionType = "producto" | "michi";

export type Interaction = {
  id: number;
  userId: number;
  tipo: InteractionType;
  productId: number | null;
  nombreMichi: string;
  mensaje: string;
  createdAt: string;
  product?: { id: number; nombre: string } | null;
  // Solo la lista del administrador trae al usuario que escribió.
  user?: { id: number; nombre: string; email: string };
};

export type CreateInteractionRequest = {
  tipo: InteractionType;
  productId?: number;
  nombreMichi: string;
  mensaje: string;
};

export type CreateInteractionResponse = {
  mensaje: string;
  data: Interaction;
};