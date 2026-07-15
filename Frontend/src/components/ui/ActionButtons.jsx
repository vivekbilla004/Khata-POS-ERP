import { Eye, Pencil, Trash2 } from "lucide-react";

export default function ActionButtons({
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-center gap-2">

      {onView && (
        <button
          onClick={onView}
          className="rounded-lg bg-blue-100 p-2 text-blue-700 transition hover:bg-blue-200"
        >
          <Eye size={18} />
        </button>
      )}

      {onEdit && (
        <button
          onClick={onEdit}
          className="rounded-lg bg-yellow-100 p-2 text-yellow-700 transition hover:bg-yellow-200"
        >
          <Pencil size={18} />
        </button>
      )}

      {onDelete && (
        <button
          onClick={onDelete}
          className="rounded-lg bg-red-100 p-2 text-red-700 transition hover:bg-red-200"
        >
          <Trash2 size={18} />
        </button>
      )}

    </div>
  );
}