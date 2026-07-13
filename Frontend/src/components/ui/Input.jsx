export default function Input({
  label,
  ...props
}) {
  return (
    <div className="space-y-2">

      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}

      <input
        {...props}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
      />

    </div>
  );
}