export const CATEGORIES = [
  { label: "Todos", value: "todos" },
  { label: "Alimentación", value: "alimentacion" },
  { label: "Higiene", value: "higiene" },
  { label: "Juguetes", value: "juguetes" },
  { label: "Descanso", value: "descanso" },
];

// Nombre bonito (con tilde) de una categoría a partir de su valor en la base de datos.
export function getCategoryLabel(value: string): string {
  const found = CATEGORIES.find((c) => c.value === value.toLowerCase());
  return found ? found.label : value;
}

export function isValidCategory(value: string | null): value is string {
  return CATEGORIES.some((c) => c.value === value);
}