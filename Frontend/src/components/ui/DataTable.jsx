import EmptyState from "./EmptyState";

export default function DataTable({ columns, data, renderRow, emptyTitle }) {
  if (!data.length) return <EmptyState title={emptyTitle} />;

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-3 text-center">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="px-4 py-3 text-center">
          {data.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
}
