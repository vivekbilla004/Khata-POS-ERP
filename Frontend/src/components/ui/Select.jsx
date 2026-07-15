export default function Select({
  value,
  onChange,
  options = [],
  name,
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600"
    >
      {options.map((item) => (
        <option
          key={item.value}
          value={item.value}
        >
          {item.label}
        </option>
      ))}
    </select>
  );
}