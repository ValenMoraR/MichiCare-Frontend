import type { Metadata } from "next";
import AdminShell from "../../src/features/admin/components/AdminShell";

export const metadata: Metadata = { title: "Administración" };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}