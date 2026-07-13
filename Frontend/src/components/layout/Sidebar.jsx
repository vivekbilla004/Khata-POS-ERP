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
  {
    title: "Dashboard",
    items: [
      {
        name: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "Production",
    items: [
      {
        name: "Beam Receipt",
        path: "/beam-receipts",
        icon: Package,
      },
      {
        name: "Beam Bharai",
        path: "/beam-bharai",
        icon: ClipboardList,
      },
      {
        name: "Loom Allocation",
        path: "/allocation",
        icon: Factory,
      },
      {
        name: "Daily Challan",
        path: "/challan",
        icon: FileText,
      },
    ],
  },

  {
    title: "Masters",
    items: [
      {
        name: "Loom Master",
        path: "/looms",
        icon: Factory,
      },
      {
        name: "Party Master",
        path: "/parties",
        icon: Users,
      },
    ],
  },

  {
    title: "Accounts",
    items: [
      {
        name: "Salary",
        path: "/salary",
        icon: Wallet,
      },
      {
        name: "Payments",
        path: "/payments",
        icon: IndianRupee,
      },
      {
        name: "Expenses",
        path: "/expenses",
        icon: Wallet,
      },
    ],
  },
];
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
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
        w-72
        h-full
        bg-[#111827]
        text-white
        transform
        transition-transform
        duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h1 className="font-bold text-xl">KHATA ERP</h1>

          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="mt-4 overflow-y-auto h-[calc(100vh-80px)]">
          {menus.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="px-5 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {section.title}
              </h3>

              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `mx-2 flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-slate-800"
                      }`
                    }
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
