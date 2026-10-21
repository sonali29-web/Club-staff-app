import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  UserRound,
  ChevronDown,
  Sparkles,
  LogOut,
} from "lucide-react";



const navItems =[
  { name: "Events",
    path: "/manager",

   },

  { name: "Sellers",
    path: "/manager/sellers",


   },

  { name: "Reports",
    path: "/manager/reports",
   },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
 const [activeTab, setActiveTab] = useState("Events");
  const [menuOpen, setMenuOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  const logOut = () => {
    navigate("/");
    setOpen(false)
  };

  return (
    <header className="relative z-50 overflow-hidden border-b border-white/10 bg-linear-to-r from-[#19072f] via-[#5112a1] to-[#240747] text-white shadow-xl">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1800&q=80')",
        }}
      />

      <div className="absolute inset-0 bg-linear-to-r from-[#180526]/95 via-[#5b21b6]/80 to-[#1e0735]/95" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-19 items-center justify-between gap-3">
          <button
            onClick={() => handleNavigation("/manager")}
            className="flex shrink-0 items-center gap-3 text-left"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-md">
              <Sparkles size={25} className="text-purple-200" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-wide sm:text-2xl">
                Club<span className="text-purple-300">Flow</span>
              </h1>
              <p className="hidden text-[10px] uppercase tracking-[3px] text-purple-200 sm:block">
                On-ground sales
              </p>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive =location.pathname === item.path;;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 text-white shadow-inner ring-1 ring-white/20"
                      : "text-purple-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            <button className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 p-2 transition hover:bg-white/20 sm:px-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-400 to-purple-600 ring-2 ring-white/20">
                <UserRound size={17} />
              </div>

              <span
                className="hidden text-sm font-medium lg:block"
                onClick={() => setOpen(true)}
              >
                Manager
              </span>

              <ChevronDown size={15} className="hidden sm:block" />
            </button>
            {open && (
              <div className="absolute right-0 top-5 z-50 mt-2 w-30 rounded-lg border bg-white p-1 shadow-lg">
                <button
                  onClick={() => {
                    logOut();
                    navigate("/", { replace: true });
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              className="rounded-xl border border-white/15 bg-white/10 p-2.5 md:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>



         {menuOpen && (
          <nav className="space-y-1 border-t border-white/10 py-3 md:hidden">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  setMenuOpen(false);
                }}
                className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeTab === item.name
                    ? "bg-white/20 text-white"
                    : "text-purple-100 hover:bg-white/10"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
