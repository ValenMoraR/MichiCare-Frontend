
import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  title: {
    default: "MichiCare | Todo para tu michi",
    template: "%s | MichiCare",
  },
  description:
    "Encuentra productos, consejos y recomendaciones para cuidar a tu gato y hacerlo feliz todos los días.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <WishlistProvider>
            <SiteHeader />
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
