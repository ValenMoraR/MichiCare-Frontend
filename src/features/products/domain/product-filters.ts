// Filtros combinados del catálogo: categoría, texto y rango de precio.
export type ProductFilters = {
  categoria?: string;
  q?: string;
  minPrecio?: number;
  maxPrecio?: number;
};