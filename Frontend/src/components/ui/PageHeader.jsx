import { Plus } from "lucide-react";

export default function PageHeader({
  title,
  subtitle,
  buttonText,
  onClick,
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">

      <div>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-slate-500 mt-1">
            {subtitle}
          </p>
        )}

      </div>

      {buttonText && (
        <button
          onClick={onClick}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition"
        >
          <Plus size={18} />

          {buttonText}
        </button>
      )}

    </div>
  );
}