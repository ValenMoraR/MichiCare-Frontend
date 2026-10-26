import Image from "next/image";
import Link from "next/link";

const topics = [
  {
    image: "/images/gato-comiendo.png",
    alt: "Gato comiendo",
    title: "Alimentación",
    description:
      "Ofrece a tu gato una alimentación equilibrada y adecuada para su edad, peso y necesidades.",
    tips: [
      "Mantén agua fresca y limpia disponible.",
      "Elige alimentos apropiados para su etapa de vida.",
      "Consulta al veterinario si necesitas cambiar su dieta.",
    ],
  },
  {
    image: "/images/limpiando-arenero.png",
    alt: "Limpieza del arenero de un gato",
    title: "Higiene",
    description:
      "Un entorno limpio ayuda a que tu michi se sienta cómodo y a mantener buenos hábitos.",
    tips: [
      "Retira los desechos del arenero con frecuencia.",
      "Lava sus recipientes de comida y agua.",
      "Cepilla su pelaje según sus necesidades.",
    ],
  },
  {
    image: "/images/gimnasios-gatos.png",
    alt: "Gimnasio para gatos",
    title: "Juego y bienestar",
    description:
      "El juego, la exploración y los lugares para descansar contribuyen al bienestar de tu gato.",
    tips: [
      "Dedica tiempo diario al juego.",
      "Ofrece rascadores y lugares seguros para explorar.",
      "Respeta sus momentos de tranquilidad.",
    ],
  },
];

export default function CuidadosPage() {
  return (
    <main className="min-h-screen">

      <section className="bg-[#f3eafa] px-6 py-14 text-center">
        <p className="mb-3 font-semibold text-[#62468d]">
          Consejos para una vida más feliz 🐱
        </p>

        <h1 className="text-4xl font-bold text-[#3f3a43] sm:text-5xl">
          Cuida a tu michi
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[#756f78]">
          Aprende sobre alimentación, higiene, juego y bienestar para
          acompañar a tu compañero felino todos los días.
        </p>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-8 px-6 py-12 lg:grid-cols-3">
        {topics.map((topic) => (
          <article
            key={topic.title}
            className="overflow-hidden rounded-2xl border border-[#e5dfe8] bg-white shadow-[0_8px_25px_rgba(70,50,80,0.08)]"
          >
            <div className="flex h-56 items-center justify-center bg-[#fffaf7] p-4">
              <Image
                src={topic.image}
                alt={topic.alt}
                width={400}
                height={280}
                className="h-full w-full rounded-xl object-cover"
              />
            </div>

            <div className="p-6">
              <h2 className="mb-3 text-2xl font-bold text-[#62468d]">
                {topic.title}
              </h2>

              <p className="mb-5 text-[#756f78]">
                {topic.description}
              </p>

              <h3 className="mb-2 font-bold text-[#3f3a43]">
                Consejos prácticos
              </h3>

              <ul className="list-inside list-disc space-y-2 text-sm text-[#756f78]">
                {topic.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="px-6 pb-12 text-center">
        <h2 className="text-2xl font-bold text-[#3f3a43]">
          ¿Tienes dudas sobre el cuidado de tu gato?
        </h2>

        <p className="mt-3 text-[#756f78]">
          Escríbenos y estaremos encantados de ayudarte.
        </p>

        <Link
          href="/contacto"
          className="mt-5 inline-block rounded-full bg-[#7b5ea7] px-6 py-3 font-semibold text-white transition hover:bg-[#62468d]"
        >
          Contáctanos
        </Link>
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