import { http } from "../../common/http";
import type { Product, ProductInput, ProductsResponse } from "../domain/product";
import type { ProductFilters } from "../domain/product-filters";

export function getProducts(
  page: number,
  limit: number,
  filters: ProductFilters = {},
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (filters.categoria) params.set("categoria", filters.categoria);
  if (filters.q) params.set("q", filters.q);
  if (filters.minPrecio !== undefined) {
    params.set("minPrecio", String(filters.minPrecio));
  }
  if (filters.maxPrecio !== undefined) {
    params.set("maxPrecio", String(filters.maxPrecio));
  }

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
  const result = await http<Product | ProductEnvelope>(`/api/products/${id}`, {
    auth: false,
  });

  // La API puede responder el producto directo o dentro de un objeto.
  const envelope = result as ProductEnvelope;
  const product =
    envelope.data ?? envelope.producto ?? envelope.product ?? (result as Product);

  if (!product || typeof product.categoria !== "string") {
    throw new Error("La respuesta del servidor no tiene el formato esperado.");
  }

  return product;
}

// Las tres siguientes son solo para el administrador:
// el backend responde 401 sin token y 403 si el rol no es admin.
export function createProduct(data: ProductInput) {
  return http<{ mensaje: string; producto: Product }>("/api/products", {
    method: "POST",
    body: data,
  });
}

export function updateProduct(id: number, data: ProductInput) {
  return http<{ mensaje: string; producto: Product }>(`/api/products/${id}`, {
    method: "PUT",
    body: data,
  });
}

export function deleteProduct(id: number) {
  return http<unknown>(`/api/products/${id}`, { method: "DELETE" });
}