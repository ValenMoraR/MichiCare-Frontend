import Link from "next/link";
import { Suspense } from "react";
import ProductCatalog from "../../src/features/products/components/ProductCatalog";

function ProductsLoading() {
  return (
    <p className="py-12 text-center text-[#756f78]">Cargando productos...</p>
  );
}

// La página solo compone: la carga de datos vive en features/products.
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
          <ProductCatalog />
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