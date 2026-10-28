import { notFound } from "next/navigation";
import ProductDetail from "../../../src/features/products/components/ProductDetail";

type Props = {
  params: Promise<{ id: string }>;
};

// La página solo compone: la carga de datos vive en features/products.
export default async function ProductoPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId < 1) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-12">
      <div className="mx-auto max-w-5xl">
        <ProductDetail id={productId} />
      </div>
    </main>
  );
}