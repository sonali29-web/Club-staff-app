import {useState} from "react"
import { NavLink } from "react-router-dom";
import {
  CalendarDays,
  Users,
  ChartNoAxesCombined,
  ChevronRight,
  ChevronLeft

} from "lucide-react";

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ size?: number }>;
  end: boolean;
}

const navItems: NavItem[] = [
  {
    name: "Events",
    path: "/manager",
    icon: CalendarDays,
    end: true,
  },
  {
    name: "Sellers",
    path: "/manager/sellers",
    icon: Users,
    end: false,
  },
  {
    name: "Reports",
    path: "/manager/reports",
    icon: ChartNoAxesCombined,
    end: false,
  },
];

export default function Sidebar() {

const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`relative w-full md:shrink-0 md:rounded-2xl border md:border-white/10 bg-[#190d27]/95 p-3 text-white shadow-xl transition-all duration-300 ${
    isOpen ? "md:w-56" : "md:w-18"
  }`}>
      <div className="hidden md:block mb-5 border-b border-white/10 px-2 pb-4">
       <button
    onClick={() => setIsOpen(!isOpen)}
    className="rounded-lg  text-purple-200 hover:bg-white/10"
    aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
  >
    {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
  </button>
        {isOpen && (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[2px] text-purple-300">
        Manager Panel
      </h2>

      <p className="mt-1 text-xs text-gray-400">
        Manage your club
      </p>
    </div>
  )}


      </div>

      <nav className="flex flex-row justify-around gap-1 md:flex-col md:justify-start md:gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-medium transition-all duration-200 md:flex-row md:justify-between md:gap-3 md:px-3 md:py-3 md:text-sm ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/30"
                    : "text-purple-100 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="flex flex-col items-center justify-center gap-1 md:flex-row md:gap-3">
                    <Icon size={19} />
                      {isOpen && <span className="text-[10px] md:text-sm">
                     {item.name}
                    </span>}

                  </span>

                  {isActive && <ChevronRight size={16} className="hidden md:block" />}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
