import { NavLink } from "react-router-dom";

import {
  X,
  LayoutDashboard,
  Factory,
  Users,
  Package,
  ClipboardList,
  FileText,
  Wallet,
  IndianRupee,
  Boxes,
} from "lucide-react";

const menus = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Loom Master", icon: Factory, path: "/looms" },
  { name: "Party Master", icon: Users, path: "/parties" },
  { name: "Beam Entry", icon: Package, path: "/beams" },
  { name: "Beam Bharai", icon: ClipboardList, path: "/bharai" },
  { name: "Loom Allocation", icon: Boxes, path: "/allocation" },
  { name: "Daily Challan", icon: FileText, path: "/challan" },
  { name: "Payments", icon: IndianRupee, path: "/payments" },
  { name: "Expenses", icon: Wallet, path: "/expenses" },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        fixed lg:static
        z-40
        w-64
        h-full
        bg-slate-900
        text-white
        transform
        transition-transform
        duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-700">

          <h1 className="font-bold text-xl">
            KHATA ERP
          </h1>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>

        </div>

        <nav className="mt-4">

          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-3 transition-all hover:bg-slate-800 ${
                    isActive ? "bg-blue-600" : ""
                  }`
                }
              >
                <Icon size={20} />

                {menu.name}
              </NavLink>
            );
          })}

        </nav>

      </aside>
    </>
  );
}