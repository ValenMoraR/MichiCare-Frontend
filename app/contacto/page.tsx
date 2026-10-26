"use client";
import Link from "next/link";

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
        </div>

        <form
          className="rounded-2xl border border-[#e5dfe8] bg-white p-6 shadow-[0_8px_25px_rgba(70,50,80,0.08)]"
          onSubmit={(event) => {
            event.preventDefault();
            alert("¡Gracias por escribirnos! Tu mensaje ha sido recibido.");
          }}
        >
          <div className="mb-5">
            <label
              htmlFor="nombre"
              className="mb-2 block font-semibold text-[#3f3a43]"
            >
              Tu nombre
            </label>

            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              minLength={3}
              placeholder="Escribe tu nombre"
              className="w-full rounded-xl border border-[#e5dfe8] px-4 py-3 outline-none transition focus:border-[#7b5ea7]"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block font-semibold text-[#3f3a43]"
            >
              Correo electrónico
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="tunombre@correo.com"
              className="w-full rounded-xl border border-[#e5dfe8] px-4 py-3 outline-none transition focus:border-[#7b5ea7]"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="michi"
              className="mb-2 block font-semibold text-[#3f3a43]"
            >
              Nombre de tu michi
            </label>

            <input
              id="michi"
              name="michi"
              type="text"
              required
              placeholder="¿Cómo se llama tu gato?"
              className="w-full rounded-xl border border-[#e5dfe8] px-4 py-3 outline-none transition focus:border-[#7b5ea7]"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="mensaje"
              className="mb-2 block font-semibold text-[#3f3a43]"
            >
              Tu mensaje
            </label>

            <textarea
              id="mensaje"
              name="mensaje"
              required
              minLength={10}
              rows={5}
              placeholder="Cuéntanos cómo podemos ayudarte..."
              className="w-full resize-y rounded-xl border border-[#e5dfe8] px-4 py-3 outline-none transition focus:border-[#7b5ea7]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#7b5ea7] px-6 py-3 font-semibold text-white transition hover:bg-[#62468d]"
          >
            Enviar mensaje
          </button>
        </form>
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