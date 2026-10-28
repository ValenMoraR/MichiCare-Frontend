import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
};

export default function Input({ id, label, error, ...props }: Props) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-[#3f3a43]"
      >
        {label}
      </label>

      <input
        {...props}
        id={id}
        name={props.name ?? id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#7b5ea7] focus:ring-2 focus:ring-[#f3eafa] ${
          error ? "border-[#c0392b]" : "border-[#e5dfe8]"
        }`}
      />

      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-[#a14b4b]">
          {error}
        </p>
      )}
    </div>
  );
}