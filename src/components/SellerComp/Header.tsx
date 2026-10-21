import { useState } from "react";
import { UserRound, ChevronDown, Sparkles,LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";



export default function Header() {
  const navigate = useNavigate();
  const [open,setopen]=useState(false)


   const logOut = () => {
    navigate("/");

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

          <a href="/" className="flex shrink-0 items-center gap-3">
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
          </a>

          <div className="relative flex shrink-0 items-center gap-2 sm:gap-3">

            <button className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 p-2 transition hover:bg-white/20 sm:px-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-400 to-purple-600 ring-2 ring-white/20">
                <UserRound size={17} />
              </div>
              <span className="hidden text-sm font-medium lg:block"
              onClick={() => setopen(true)}>
                Seller
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


          </div>
        </div>



      </div>
    </header>
  );
}
