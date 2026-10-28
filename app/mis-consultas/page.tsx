import type { Metadata } from "next";
import Link from "next/link";
import MyInteractions from "../../src/features/interactions/components/MyInteractions";

export const metadata: Metadata = { title: "Mis consultas" };

export default function MisConsultasPage() {
  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/contacto"
          className="text-sm font-semibold text-[#7b5ea7] hover:underline"
        >
          ← Hacer una nueva consulta
        </Link>

        <h1 className="mt-5 text-3xl font-bold text-[#3f3a43]">
          Mis consultas 💬
        </h1>

        <p className="mt-2 text-[#756f78]">
          Estas son las consultas que le has enviado a MichiCare.
        </p>

        <MyInteractions />
      </div>
    </main>
  );
}