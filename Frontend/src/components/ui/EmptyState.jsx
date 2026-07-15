import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "No Data Found",
  subtitle = "Nothing to display",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-14">

      <Inbox
        size={60}
        className="text-slate-300"
      />

      <h2 className="mt-4 text-xl font-semibold">
        {title}
      </h2>

      <p className="text-slate-500">
        {subtitle}
      </p>

    </div>
  );
}