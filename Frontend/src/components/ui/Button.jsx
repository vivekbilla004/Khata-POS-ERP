export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
}