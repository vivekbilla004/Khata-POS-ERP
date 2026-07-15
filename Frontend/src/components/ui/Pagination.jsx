import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  setPage,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-between">

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 disabled:opacity-40"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <span className="font-medium">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 disabled:opacity-40"
      >
        Next
        <ChevronRight size={18} />
      </button>

    </div>
  );
}