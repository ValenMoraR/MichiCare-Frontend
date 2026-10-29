import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Cuidados" };

// Temas principales (con foto).
const topics = [
  {
    image: "/images/gato-comiendo.png",
    alt: "Gato comiendo",
    title: "Alimentación",
    description:
      "Ofrece a tu gato una alimentación equilibrada y adecuada para su edad, peso y necesidades.",
    tips: [
      "Mantén agua fresca y limpia disponible. Una fuente de agua suele animarlos a beber más.",
      "Elige alimentos apropiados para su etapa de vida: gatito, adulto, castrado o senior.",
      "Combinar croquetas con alimento húmedo ayuda a su hidratación.",
      "Mide las porciones: el sobrepeso es uno de los problemas más comunes.",
      "Si necesitas cambiar su dieta, hazlo poco a poco durante 7 a 10 días y consulta al veterinario.",
    ],
  },
  {
    image: "/images/limpiando-arenero.png",
    alt: "Limpieza del arenero de un gato",
    title: "Higiene",
    description:
      "Un entorno limpio ayuda a que tu michi se sienta cómodo y a mantener buenos hábitos.",
    tips: [
      "Retira los desechos del arenero todos los días y cambia la arena completa con regularidad.",
      "Lo ideal es un arenero por gato, más uno extra, en un lugar tranquilo.",
      "Lava sus recipientes de comida y agua a diario.",
      "Cepilla su pelaje según sus necesidades: más seguido si tiene el pelo largo.",
      "Revisa y corta sus uñas cuando haga falta.",
    ],
  },
  {
    image: "/images/gimnasios-gatos.png",
    alt: "Gimnasio para gatos",
    title: "Juego y bienestar",
    description:
      "El juego, la exploración y los lugares para descansar contribuyen al bienestar de tu gato.",
    tips: [
      "Dedica tiempo diario al juego, en sesiones cortas varias veces al día.",
      "Ofrece rascadores y lugares altos y seguros para explorar.",
      "Rota sus juguetes para que no se aburra.",
      "Respeta sus momentos de tranquilidad.",
    ],
  },
];

// Salud y convivencia (con emoji).
const healthTopics = [
  {
    icon: "🦷",
    title: "Salud dental",
    description:
      "Los problemas de dientes y encías son muy comunes en los gatos y muchas veces pasan desapercibidos.",
    tips: [
      "Cepilla sus dientes con un cepillo y una pasta hechos para gatos. Nunca uses pasta dental de personas.",
      "Empieza de a poco, con paciencia y premios, para que se acostumbre.",
      "Mal aliento, encías rojas o babeo son señales para ir al veterinario.",
      "El veterinario te dirá si necesita una limpieza dental profesional.",
    ],
  },
  {
    icon: "🩺",
    title: "Enfermedades frecuentes",
    description:
      "Los gatos también se enferman, y suelen disimular las molestias hasta que la enfermedad está avanzada.",
    tips: [
      "La diabetes también existe en gatos: más sed y más orina, o bajar de peso aunque coma bien, son señales de alerta. El sobrepeso aumenta el riesgo.",
      "La enfermedad renal y el hipertiroidismo son más comunes en gatos mayores.",
      "Cambios en el apetito, el peso, el ánimo o el uso del arenero merecen una consulta.",
    ],
  },
  {
    icon: "💉",
    title: "Prevención y chequeos",
    description:
      "Prevenir es más fácil, y más barato, que curar.",
    tips: [
      "Mantén al día las vacunas y la desparasitación, según el esquema que indique tu veterinario.",
      "Lleva a tu gato a chequeos periódicos; los gatos mayores necesitan revisiones más frecuentes.",
      "Habla con tu veterinario sobre la esterilización y la identificación (por ejemplo, el microchip).",
    ],
  },
  {
    icon: "🐾",
    title: "Compañía y socialización",
    description:
      "Algunos gatos son muy independientes, pero otros se aburren o se estresan si pasan muchas horas solos.",
    tips: [
      "A veces un segundo gato ayuda a que tenga compañía y juego, pero no a todos les gusta compartir.",
      "Si vas a presentarlos, hazlo poco a poco: espacios separados, intercambio de olores y encuentros cortos.",
      "Cada gato necesita su propio arenero, comedero y rincón de descanso.",
      "Si vive solo, dedícale tiempo de juego y atención todos los días.",
    ],
  },
  {
    icon: "🏠",
    title: "Un hogar seguro",
    description:
      "Algunas cosas cotidianas son peligrosas para los gatos.",
    tips: [
      "Los lirios son muy tóxicos para ellos. Evita también chocolate, cebolla, ajo, uvas y medicamentos de personas.",
      "Guarda hilos, cuerdas y gomas: si los tragan, pueden ser muy graves.",
      "Pon mallas de protección en ventanas y balcones para evitar caídas.",
      "Guarda los productos de limpieza fuera de su alcance.",
    ],
  },
  {
    icon: "😴",
    title: "Descanso y sueño",
    description:
      "Los gatos duermen muchas horas y necesitan un lugar propio para hacerlo con tranquilidad.",
    tips: [
      "Ofrece una cama cómoda en un rincón tranquilo y a una temperatura agradable.",
      "Evita despertarlo bruscamente.",
      "Un cambio notorio en cuánto duerme puede ser señal de que algo pasa.",
    ],
  },
];

// Datos curiosos.
const funFacts = [
  {
    icon: "😴",
    text: "Duermen entre 12 y 16 horas al día; los gatitos y los gatos mayores, aún más.",
  },
  {
    icon: "😽",
    text: "Un parpadeo lento suele ser una muestra de confianza y cariño. Puedes devolvérselo.",
  },
  {
    icon: "🎶",
    text: "El ronroneo suele significar bienestar, pero también puede aparecer cuando sienten dolor o estrés.",
  },
  {
    icon: "🗣️",
    text: "Los gatos adultos maúllan sobre todo para comunicarse con las personas.",
  },
  {
    icon: "🍬",
    text: "No perciben el sabor dulce, así que no les atraen los dulces como a nosotros.",
  },
  {
    icon: "📏",
    text: "Sus bigotes les ayudan a medir espacios y a percibir cambios a su alrededor.",
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
          Aprende sobre alimentación, higiene, salud, compañía y bienestar para
          acompañar a tu compañero felino todos los días.
        </p>
      </section>

      {/* Lo esencial */}
      <section className="mx-auto max-w-[1200px] px-6 pt-12">
        <h2 className="text-center text-3xl font-bold text-[#3f3a43]">
          Lo esencial del día a día
        </h2>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-8 px-6 py-10 lg:grid-cols-3">
        {topics.map((topic) => (
          <article
            key={topic.title}
            className="overflow-hidden rounded-2xl border border-[#e5dfe8] bg-white shadow-[0_8px_25px_rgba(70,50,80,0.08)]"
          >
            <div className="relative h-56 w-full overflow-hidden bg-[#fffaf7]">
              <Image
                src={topic.image}
                alt={topic.alt}
                fill
                sizes="(min-width: 1024px) 380px, 90vw"
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="mb-3 text-2xl font-bold text-[#62468d]">
                {topic.title}
              </h3>

              <p className="mb-5 text-[#756f78]">{topic.description}</p>

              <h4 className="mb-2 font-bold text-[#3f3a43]">
                Consejos prácticos
              </h4>

              <ul className="list-outside list-disc space-y-2 pl-5 text-sm text-[#756f78]">
                {topic.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      {/* Salud y convivencia */}
      <section className="bg-[#f3eafa] px-6 py-14">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-center text-3xl font-bold text-[#3f3a43]">
            Salud, compañía y un hogar seguro
          </h2>
          <p className="mx-auto mb-10 mt-4 max-w-2xl text-center text-[#756f78]">
            Lo que no siempre se ve a simple vista, pero hace una gran
            diferencia en la vida de tu gato.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {healthTopics.map((topic) => (
              <article
                key={topic.title}
                className="rounded-2xl bg-white p-6 shadow-[0_8px_25px_rgba(70,50,80,0.08)]"
              >
                <div className="mb-3 text-4xl">{topic.icon}</div>
                <h3 className="mb-2 text-xl font-bold text-[#62468d]">
                  {topic.title}
                </h3>
                <p className="mb-4 text-sm text-[#756f78]">
                  {topic.description}
                </p>
                <ul className="list-outside list-disc space-y-2 pl-5 text-sm text-[#756f78]">
                  {topic.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Datos curiosos */}
      <section className="mx-auto max-w-[1200px] px-6 py-14">
        <h2 className="text-center text-3xl font-bold text-[#3f3a43]">
          Datos curiosos 😺
        </h2>
        <p className="mx-auto mb-10 mt-4 max-w-2xl text-center text-[#756f78]">
          Algunas cosas que quizás no sabías de tu michi.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {funFacts.map((fact) => (
            <article
              key={fact.text}
              className="flex items-start gap-4 rounded-2xl border border-[#e5dfe8] bg-white p-5"
            >
              <span className="text-3xl" aria-hidden="true">
                {fact.icon}
              </span>
              <p className="text-sm text-[#756f78]">{fact.text}</p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl rounded-2xl bg-[#f3eafa] px-5 py-4 text-center text-sm text-[#62468d]">
          Esta información es orientativa y no reemplaza la consulta con un
          veterinario. Si notas algo raro en tu gato, no esperes: llévalo a
          revisión.
        </p>
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
          style={{ color: "#ffffff" }}
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