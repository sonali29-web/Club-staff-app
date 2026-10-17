
import { useEffect, useState,useMemo } from "react";
import {
  Search,
  Users,
  UserCheck,
  Phone,
  Sparkles,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";
import { getSellers } from "../../services/storage";
import type { Seller } from "../../types/types";
import type { ClubEvent } from "../../types/types";

export default function Sellers() {
  const [search, setSearch] = useState("");
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [events, setEvents] = useState<ClubEvent[]>([]);

useEffect(() => {
  fetch("http://localhost:3001/events")
    .then((res) => res.json())
    .then((data) => setEvents(data))
    .catch((error) => console.error(error));
}, []);

  useEffect(() => {
    getSellers()
      .then(setSellers)
      .catch(console.error);
  }, []);

  const filteredSellers = sellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(search.toLowerCase()) ||
      (seller.phone ?? "").includes(search)
  );

const { totalAssigned, remainingSellers } = useMemo(() => {
  const totalAssigned = events.reduce(
    (total, event) =>
      total + (event.onGroundAssignedUserIds?.length ?? 0),
    0
  );

  const assignedSellerIds = new Set(
    events.flatMap(
      (event) => event.onGroundAssignedUserIds ?? []
    )
  );

  const remainingSellers = sellers.filter(
    (seller) => !assignedSellerIds.has(seller.id)
  ).length;

  return {
    totalAssigned,
    remainingSellers,
  };
}, [events, sellers]);

  return (
    <main className="relative min-h-screen overflow-hidden  p-4 sm:p-6 lg:p-8">



      <div className="relative space-y-7">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
            Club Flow / Team
          </p>
          <h1 className="mt-2 text-2xl font-bold text-white sm:text-4xl">
            Sellers
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Manage your on-ground sales team.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="group rounded-2xl border border-white/15 bg-linear-to-br from-purple-500/20 to-white/4 p-5 backdrop-blur-2xl transition hover:border-purple-300/40 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="rounded-2xl border border-purple-300/20 bg-purple-400/15 p-3 text-purple-200">
                <Users size={25} />
              </div>
              <ArrowUpRight className="text-white/40 transition group-hover:text-purple-300" />
            </div>
            <p className="mt-5 text-sm text-white/60">Total Sellers</p>
            <h2 className="mt-1 text-4xl font-bold text-white">
              {sellers.length}
            </h2>
            <p className="mt-2 text-xs text-purple-200/80">
              Registered team members
            </p>
          </div>



          <div className="group rounded-2xl border border-white/15 bg-linear-to-br from-indigo-500/20 to-white/4 p-5 backdrop-blur-2xl transition hover:border-indigo-300/40 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="rounded-2xl border border-green-300/20 bg-green-400/15 p-3 text-green-300">
                <UserCheck size={25} />
              </div>
              <ArrowUpRight className="text-white/40 transition group-hover:text-green-300" />
            </div>
            <p className="mt-5 text-sm text-white/60">Assigned Sellers</p>
            <h2 className="mt-1 text-4xl font-bold text-white">
              {totalAssigned}
            </h2>
            <p className="mt-2 text-xs text-green-200/80">
              Sellers assigned to events
            </p>
          </div>

           <div className="group rounded-2xl border border-white/15 bg-linear-to-br from-purple-500/20 to-white/4 p-5 backdrop-blur-2xl transition hover:border-purple-300/40 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="rounded-2xl border border-purple-300/20 bg-purple-400/15 p-3 text-purple-200">
                <Users size={25} />
              </div>
              <ArrowUpRight className="text-white/40 transition group-hover:text-purple-300" />
            </div>
            <p className="mt-5 text-sm text-white/60">Remaning Sellers</p>
            <h2 className="mt-1 text-4xl font-bold text-white">
              {remainingSellers}
            </h2>
            <p className="mt-2 text-xs text-purple-200/80">
              Registered team members
            </p>
          </div>
        </div>


        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[0.75fr_1.65fr]">

          <div className="relative flex min-h-75 flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-linear-to-br from-[#6d28d9] via-[#432080] to-[#17112e] p-6 sm:min-h-85 sm:p-8">
            <div className="pointer-events-none absolute -right-12 top-12 h-48 w-48 rounded-full border border-white/10 bg-purple-300/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-pink-500/20 blur-3xl" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-xl">
                <Sparkles size={24} />
              </div>
              <h2 className="mt-6 text-2xl font-bold leading-snug text-white">
                Your Team,
                <br />
                Your Events.
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">
                Keep track of your sellers and manage event assignments in one place.
              </p>
            </div>

            <div className="relative mt-8 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white">
                  <CalendarDays size={22} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    On-ground Sales
                  </p>
                  <p className="mt-1 text-xs text-white/60">
                    Seller management
                  </p>
                </div>
              </div>
            </div>
          </div>


          <div className="min-w-0 space-y-5">

            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 shadow-lg shadow-black/5">
              <Search size={19} className="shrink-0 text-gray-400" />
              <input
                placeholder="Search seller or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-grey-800 outline-none placeholder:text-gray-400"
              />
            </div>


            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-black/10">
              <div className="border-b border-gray-100 px-5 py-5">
                <h2 className="font-bold text-gray-900">Seller List</h2>
                <p className="mt-1 text-sm text-gray-500">
                  View your registered sellers.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-107.5 text-left">
                  <thead className="bg-gray-50">
                    <tr className="text-xs uppercase tracking-wide text-gray-500">
                      <th className="px-5 py-4 font-semibold">Seller</th>
                      <th className="px-5 py-4 font-semibold">Contact</th>
                      <th className="px-5 py-4 font-semibold">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredSellers.map((seller) => (
                      <tr
                        key={seller.id}
                        className="border-t border-gray-100 transition hover:bg-purple-50/50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-purple-500 to-indigo-500 font-bold text-white">
                              {seller.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-gray-800">
                              {seller.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone size={15} className="text-gray-400" />
                            {seller.phone || "Not provided"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                            Available
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredSellers.length === 0 && (
                  <p className="p-8 text-center text-sm text-gray-500">
                    No sellers found.
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
                {filteredSellers.length} sellers displayed
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
