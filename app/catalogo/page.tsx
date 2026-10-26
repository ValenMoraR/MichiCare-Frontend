
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import CategoryFilter from "./CategoryFilter";

type Product = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
};

type ProductsResponse = {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: Product[];
};

function getImagePath(image: string) {
  const filename = image.split("/").pop();
  return `/images/${filename}`;
}

async function ProductsSection() {
  let products: Product[] = [];
  let error = false;

  try {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error(
        "La variable NEXT_PUBLIC_API_URL no está configurada."
      );
    }

    const response = await fetch(
      `${apiUrl}/api/products?page=1&limit=100`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("No fue posible obtener los productos.");
    }

    const result: ProductsResponse = await response.json();

    if (!Array.isArray(result.data)) {
      throw new Error("La respuesta del backend no es válida.");
    }

    products = result.data;
  } catch (err) {
    console.error("Error al cargar el catálogo:", err);
    error = true;
  }

  if (error) {
    return (
      <p className="py-12 text-center text-[#756f78]">
        No pudimos cargar los productos. Verifica que el backend esté
        funcionando e inténtalo de nuevo.
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="py-12 text-center text-[#756f78]">
        No hay productos disponibles por el momento.
      </p>
    );
  }

  return <CategoryFilter products={products} />;
}

function ProductsLoading() {
  return (
    <p className="py-12 text-center text-[#756f78]">
      Cargando productos...
    </p>
  );
}

export default function CatalogoPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-[#f3eafa] px-6 py-14 text-center">
        <p className="mb-3 font-semibold text-[#62468d]">
          Todo para tu compañero felino 🐱
        </p>

        <h1 className="text-4xl font-bold text-[#3f3a43] sm:text-5xl">
          Nuestro catálogo
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[#756f78]">
          Encuentra productos para consentir, cuidar y acompañar a tu michi
          todos los días.
        </p>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-12">
        <Suspense fallback={<ProductsLoading />}>
          <ProductsSection />
        </Suspense>
      </section>

      <footer className="bg-[#302b35] px-6 py-8 text-center text-sm text-white">
        <p>
          🐾 MichiCare — Cuidamos a quienes hacen de nuestra casa un hogar.
        </p>

        <Link
          href="/"
          className="mt-3 inline-block text-white/80 hover:text-white"
        >
          Volver al inicio
        </Link>
      </footer>
    </main>
  );
}
