import { http } from "../../common/http";
import type { Product, ProductsResponse } from "../domain/product";

export function getProducts(page: number, limit: number, categoria?: string) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (categoria) params.set("categoria", categoria);

  return http<ProductsResponse>(`/api/products?${params.toString()}`, {
    auth: false,
  });
}

type ProductEnvelope = {
  data?: Product;
  producto?: Product;
  product?: Product;
};

export async function getProductById(id: number): Promise<Product> {
  const result = await http<Product | ProductEnvelope>(
    `/api/products/${id}`,
    { auth: false },
  );

  // La API puede responder el producto directo o dentro de un objeto.
  const envelope = result as ProductEnvelope;
  const product =
    envelope.data ?? envelope.producto ?? envelope.product ?? (result as Product);

  if (!product || typeof product.categoria !== "string") {
    throw new Error("La respuesta del servidor no tiene el formato esperado.");
  }

  return product;
}