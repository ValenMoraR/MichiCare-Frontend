import type { Metadata } from "next";
import RegisterForm from "../../src/features/auth/components/RegisterForm";

export const metadata: Metadata = { title: "Crear cuenta" };

export default function RegistroPage() {
  return (
    <main className="min-h-screen bg-[#fffaf7] px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <span className="text-5xl" role="img" aria-label="Huellas">
            🐾
          </span>
          <h1 className="mt-4 text-3xl font-bold text-[#62468d]">
            Crea tu cuenta
          </h1>
          <p className="mt-3 text-[#756f78]">
            Es rápido y es para consentir a tu michi.
          </p>
        </div>

        <section className="rounded-2xl border border-[#e5dfe8] bg-white p-6 shadow-sm sm:p-8">
          <RegisterForm />
        </section>
      </div>
    </main>
  );
}