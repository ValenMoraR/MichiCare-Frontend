import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    icon: "🍗",
    title: "Alimentación",
    description: "Productos y opciones para una alimentación adecuada para tu gato.",
  },
  {
    icon: "🧶",
    title: "Juguetes",
    description: "Opciones para mantener a tu michi activo, entretenido y feliz.",
  },
  {
    icon: "🧼",
    title: "Higiene",
    description: "Productos para mantener limpio y saludable a tu compañero.",
  },
  {
    icon: "🛏️",
    title: "Descanso",
    description: "Todo lo necesario para que tu gato tenga un espacio cómodo para descansar.",
  },
];

const products = [
  {
    image: "/images/comida-premium.png",
    alt: "Alimento premium para gatos",
    category: "Alimentación",
    name: "Alimento Premium",
    description: "Una opción nutritiva para tu michi.",
    price: "$48.000",
  },
  {
    image: "/images/ratones-tela.png",
    alt: "Ratón de tela para gatos",
    category: "Juguetes",
    name: "Ratón de Tela",
    description: "Ideal para mantenerlo entretenido.",
    price: "$12.000",
  },
  {
    image: "/images/rascador-de-carton.png",
    alt: "Rascador para gatos",
    category: "Juguetes",
    name: "Rascador para Gatos",
    description: "Para que pueda jugar y afilar sus uñas.",
    price: "$75.000",
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

export default function Home() {
  return (
    <main>
      <section className="mx-auto mt-6 grid max-w-[1200px] items-center gap-10 rounded-[40px] bg-[#f3eafa] px-7 py-12 sm:mx-6 sm:mt-8 sm:rounded-[60px] sm:px-12 lg:mx-auto lg:grid-cols-2 lg:px-16 lg:py-16">
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

          <a href="/catalogo" className={buttonClass}>
            Ver catálogo
          </a>
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/gato-descansando.png"
            alt="Gato descansando"
            width={460}
            height={380}
            className="max-h-[380px] w-full max-w-[460px] rounded-[28px] object-cover"
          />
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
              <a
                href="/catalogo"
                className="font-semibold text-[#7b5ea7] hover:text-[#62468d]"
              >
                Ver productos →
              </a>
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

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.name}
                className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_25px_rgba(70,50,80,0.08)]"
              >
                <Image
                  src={product.image}
                  alt={product.alt}
                  width={400}
                  height={300}
                  className="h-56 w-full object-contain p-5"
                />

                <div className="p-6">
                  <span className="text-sm font-semibold text-[#7b5ea7]">
                    {product.category}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-[#3f3a43]">
                    {product.name}
                  </h3>
                  <p className="my-3 text-[#756f78]">
                    {product.description}
                  </p>
                  <strong className="text-lg text-[#62468d]">
                    {product.price}
                  </strong>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="/catalogo" className={buttonClass}>
              Ver catálogo completo
            </a>
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
          <a href="/cuidados" className={buttonClass}>
            Ver consejos de cuidado
          </a>
        </div>
      </section>

      <section className="bg-[#7b5ea7] px-6 py-14 text-center text-white">
        <h2 className="text-3xl font-bold">¿Tienes alguna pregunta?</h2>
        <p className="mx-auto mb-7 mt-4 max-w-2xl">
          Si necesitas más información sobre nuestros productos o servicios,
          puedes comunicarte con nosotros.
        </p>
        <a
          href="/contacto"
          className="inline-flex rounded-full bg-white px-7 py-3 font-semibold text-[#62468d] transition hover:bg-[#f3eafa]"
        >
          Contáctanos
        </a>
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
              <li><a href="/catalogo" className="hover:text-white">Catálogo</a></li>
              <li><a href="/cuidados" className="hover:text-white">Cuidados</a></li>
              <li><a href="/contacto" className="hover:text-white">Contáctanos</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
