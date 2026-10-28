import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ContactForm from "../../src/features/interactions/components/ContactForm";

export const metadata: Metadata = { title: "Contáctanos" };

export default function ContactoPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-[#f3eafa] px-6 py-14 text-center">
        <p className="mb-3 font-semibold text-[#62468d]">
          Estamos aquí para ayudarte 🐱
        </p>

        <h1 className="text-4xl font-bold text-[#3f3a43] sm:text-5xl">
          Contáctanos
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[#756f78]">
          ¿Tienes preguntas sobre nuestros productos o sobre el cuidado de tu
          michi? Déjanos un mensaje.
        </p>
      </section>

      <section className="mx-auto grid max-w-[1000px] gap-10 px-6 py-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-[#62468d]">
            ¡Nos encanta saber de ti!
          </h2>

          <p className="mt-4 text-[#756f78]">
            En MichiCare queremos acompañarte en el cuidado de tu compañero
            felino. Cuéntanos cómo podemos ayudarte y déjanos tus preguntas o
            sugerencias.
          </p>

          <div className="mt-8 rounded-2xl bg-[#f3eafa] p-6">
            <h3 className="text-lg font-bold text-[#62468d]">
              🐾 Un espacio para los amantes de los gatos
            </h3>

            <p className="mt-2 text-sm text-[#756f78]">
              Tus comentarios nos ayudan a mejorar la experiencia de MichiCare.
            </p>
          </div>

          <Link
            href="/mis-consultas"
            className="mt-6 inline-block text-sm font-semibold text-[#7b5ea7] hover:underline"
          >
            Ver mis consultas anteriores →
          </Link>
        </div>

        <Suspense
          fallback={<p className="text-[#756f78]">Cargando formulario...</p>}
        >
          <ContactForm />
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