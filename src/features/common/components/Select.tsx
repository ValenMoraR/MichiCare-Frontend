import type { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  error?: string;
};

export default function Select({
  id,
  label,
  error,
  children,
  ...props
}: Props) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-[#3f3a43]"
      >
        {label}
      </label>

      <select
        {...props}
        id={id}
        name={props.name ?? id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition focus:border-[#7b5ea7] focus:ring-2 focus:ring-[#f3eafa] ${
          error ? "border-[#c0392b]" : "border-[#e5dfe8]"
        }`}
      >
        {children}
      </select>

      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-[#a14b4b]">
          {error}
        </p>
      )}
    </div>
  );
}