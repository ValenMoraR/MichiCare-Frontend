export type Interaction = {
  id: number;
  userId: number;
  productId: number | null;
  nombreMichi: string;
  mensaje: string;
  createdAt: string;
  product?: { id: number; nombre: string } | null;
};

export type CreateInteractionRequest = {
  productId: number;
  nombreMichi: string;
  mensaje: string;
};

export type CreateInteractionResponse = {
  mensaje: string;
  data: Interaction;
};