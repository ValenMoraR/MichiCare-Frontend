import Link from "next/link";
import Image from "next/image";
import FeaturedProducts from "../src/features/products/components/FeaturedProducts";

const categories = [
  {
    icon: "🍗",
    title: "Alimentación",
    description: "Productos y opciones para una alimentación adecuada para tu gato.",
    href: "/catalogo?categoria=alimentacion",
  },
  {
    icon: "🧶",
    title: "Juguetes",
    description: "Opciones para mantener a tu michi activo, entretenido y feliz.",
    href: "/catalogo?categoria=juguetes",
  },
  {
    icon: "🧼",
    title: "Higiene",
    description: "Productos para mantener limpio y saludable a tu compañero.",
    href: "/catalogo?categoria=higiene",
  },
  {
    icon: "🛏️",
    title: "Descanso",
    description: "Todo lo necesario para que tu gato tenga un espacio cómodo para descansar.",
    href: "/catalogo?categoria=descanso",
  },
];

const careTopics = [
  {
    icon: "🍗",
    title: "Alimentación",
    description: "Aprende algunos aspectos importantes sobre la alimentación de tu gato.",
  },
  {
    icon: "🧼",
    title: "Higiene",
    description: "Conoce algunos consejos para mantener a tu michi limpio.",
  },
  {
    icon: "❤️",
    title: "Bienestar",
    description: "Descubre cómo ayudar a tu gato a tener una vida más feliz.",
  },
];

const buttonClass =
  "inline-flex items-center justify-center rounded-full bg-[#7b5ea7] px-7 py-3 font-semibold text-white transition hover:bg-[#62468d]";

// El color del texto se fija también en línea para que ninguna regla global de
// los enlaces lo pise (así el texto de los botones siempre se ve).
const whiteText = { color: "#ffffff" };
const purpleText = { color: "#62468d" };

export default function Home() {
  return (
    <main>
      <section className="mx-4 mt-6 grid max-w-[1200px] items-center gap-10 rounded-[40px] bg-[#f3eafa] px-6 py-12 sm:mx-6 sm:mt-8 sm:rounded-[60px] sm:px-12 lg:mx-auto lg:grid-cols-2 lg:px-16 lg:py-16">
        <div className="text-center lg:text-left">
          <p className="mb-4 font-semibold text-[#62468d]">
            Bienvenido a MichiCare 🐱
          </p>

          <h1 className="text-4xl font-bold leading-tight text-[#3f3a43] sm:text-5xl">
            Todo lo que tu michi necesita para estar feliz
          </h1>

          <p className="mx-auto mb-7 mt-5 max-w-xl text-[#756f78] lg:mx-0">
            Encuentra productos para consentir a tu gato y consejos para cuidar
            de él todos los días.
          </p>

          <Link href="/catalogo" className={buttonClass} style={whiteText}>
            Ver catálogo
          </Link>
        </div>

        <div className="flex justify-center">
          <div className="relative aspect-[46/38] w-full max-w-[460px] overflow-hidden rounded-[28px]">
            <Image
              src="/images/gato-descansando.png"
              alt="Gato descansando"
              fill
              priority
              sizes="(min-width: 1024px) 460px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <h2 className="text-center text-3xl font-bold text-[#3f3a43] sm:text-4xl">
          Todo para tu michi en un solo lugar
        </h2>

        <p className="mx-auto mb-10 mt-4 max-w-2xl text-center text-[#756f78]">
          En MichiCare encontrarás productos, recomendaciones y consejos
          pensados para el bienestar de tu gato.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.title}
              className="rounded-2xl border border-[#e5dfe8] bg-white p-6 text-center shadow-[0_8px_25px_rgba(70,50,80,0.08)] transition hover:-translate-y-1"
            >
              <div className="mb-3 text-4xl">{category.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-[#62468d]">
                {category.title}
              </h3>
              <p className="mb-5 text-sm text-[#756f78]">
                {category.description}
              </p>
              <Link
                href={category.href}
                className="font-semibold text-[#7b5ea7] hover:text-[#62468d]"
              >
                Ver productos →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f3eafa] px-6 py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-center text-3xl font-bold text-[#3f3a43] sm:text-4xl">
            Algunos de nuestros productos
          </h2>

          <p className="mx-auto mb-10 mt-4 max-w-2xl text-center text-[#756f78]">
            Conoce algunos de los productos que puedes encontrar en nuestro
            catálogo.
          </p>

          {/* Vienen de la API: no están escritos a mano en la página. */}
          <FeaturedProducts />

          <div className="mt-10 text-center">
            <Link href="/catalogo" className={buttonClass} style={whiteText}>
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <h2 className="text-center text-3xl font-bold text-[#3f3a43] sm:text-4xl">
          Aprende a cuidar mejor a tu michi
        </h2>

        <p className="mx-auto mb-10 mt-4 max-w-2xl text-center text-[#756f78]">
          No solo queremos ayudarte a encontrar productos. También queremos
          ayudarte a conocer mejor a tu gato.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {careTopics.map((topic) => (
            <article
              key={topic.title}
              className="rounded-2xl border border-[#e5dfe8] bg-white p-7 text-center"
            >
              <div className="mb-3 text-4xl">{topic.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-[#62468d]">
                {topic.title}
              </h3>
              <p className="text-[#756f78]">{topic.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-9 text-center">
          <Link href="/cuidados" className={buttonClass} style={whiteText}>
            Ver consejos de cuidado
          </Link>
        </div>
      </section>

      <section className="bg-[#7b5ea7] px-6 py-14 text-center">
        <h2 className="text-3xl font-bold text-white">¿Tienes alguna pregunta?</h2>
        <p className="mx-auto mb-7 mt-4 max-w-2xl text-white">
          Si necesitas más información sobre nuestros productos o servicios,
          puedes comunicarte con nosotros.
        </p>
        <Link
          href="/contacto"
          className="inline-flex rounded-full bg-white px-7 py-3 font-semibold text-[#62468d] transition hover:bg-[#f3eafa]"
          style={purpleText}
        >
          Contáctanos
        </Link>
      </section>

      <footer className="bg-[#302b35] px-6 py-10 text-white">
        <div className="mx-auto grid max-w-[1200px] gap-8 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 text-xl font-bold">🐾 MichiCare</h3>
            <p className="max-w-sm text-sm text-white/80">
              Cuidamos a quienes hacen de nuestra casa un hogar.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-bold">Enlaces</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/" className="hover:text-white">Inicio</Link></li>
              <li><Link href="/catalogo" className="hover:text-white">Catálogo</Link></li>
              <li><Link href="/cuidados" className="hover:text-white">Cuidados</Link></li>
              <li><Link href="/contacto" className="hover:text-white">Contáctanos</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}