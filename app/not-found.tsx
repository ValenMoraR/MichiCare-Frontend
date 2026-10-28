import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#fffaf7] px-6 py-16 text-center">
      <p className="text-7xl" role="img" aria-label="Gato asustado">
        🙀
      </p>

      <h1 className="mt-6 text-4xl font-bold text-[#62468d]">
        404 · Esta página no existe
      </h1>

      <p className="mt-3 max-w-md text-[#756f78]">
        Parece que este michi se escapó. La página que buscas no está o el
        enlace es incorrecto.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-[#7b5ea7] px-6 py-3 font-semibold text-white transition hover:bg-[#62468d]"
        >
          Volver al inicio
        </Link>
        <Link
          href="/catalogo"
          className="rounded-full border border-[#7b5ea7] px-6 py-3 font-semibold text-[#62468d] transition hover:bg-[#f3eafa]"
        >
          Ver el catálogo
        </Link>
      </div>
    </main>
  );
}