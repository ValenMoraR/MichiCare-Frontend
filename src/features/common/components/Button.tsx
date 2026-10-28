import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function Button({
  loading = false,
  disabled,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className="w-full rounded-xl bg-[#7b5ea7] px-4 py-3 font-semibold text-white transition hover:bg-[#62468d] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Procesando..." : children}
    </button>
  );
}