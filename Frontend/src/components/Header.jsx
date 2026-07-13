import { Menu } from "lucide-react";

export default function Header({ setSidebarOpen }) {
  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 md:px-6">

      <div className="flex items-center gap-3">

        <button
          className="lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu />
        </button>

        <h1 className="text-xl font-bold">
          KHATA ERP
        </h1>

      </div>

      <div className="text-sm text-gray-500">
        Textile ERP
      </div>

    </header>
  );
}