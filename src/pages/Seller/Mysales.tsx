import { useMemo, useState, useEffect } from "react";
import { Ticket, Armchair, IndianRupee, Search, Eye } from "lucide-react";

import type { SaleRecord } from "../../types/types";

export default function MySales() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [sales, setSales] = useState<SaleRecord[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      const sellerId = localStorage.getItem("sellerId");
      if (!sellerId) return;

      const response = await fetch(
        `http://localhost:3001/sales?sellerId=${sellerId}`,
      );

      const data: SaleRecord[] = await response.json();
      setSales(data);
      console.log(data);
    };

    fetchSales();
  }, []);

  const ticketsSold = sales.reduce(
    (total, sale) =>
      sale.saleType === "ticket" ? total + (sale.noOfTicket ?? 0) : total,
    0,
  );

  const tablesSold = sales.filter((sale) => sale.saleType === "table").length;

  const totalCoverAmount = sales.reduce(
    (total, sale) =>
      sale.saleType === "ticket"
        ? total + (sale.coverAmount ?? 0) * (sale.noOfTicket ?? 0)
        : total,
    0,
  );

  const summaryCards = [
    {
      title: "Total TicketSold",
      value: ticketsSold,
      icon: Ticket,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Total TableSold",
      value: tablesSold,
      icon: Armchair,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Amount",
      value: totalCoverAmount,
      icon: IndianRupee,
      color: "bg-green-100 text-green-600",
    },
  ];

  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const matchesSearch =
        sale.buyername.toLowerCase().includes(search.toLowerCase()) ||
        sale.event.toLowerCase().includes(search.toLowerCase()) ||
        sale.buyerphone.includes(search);

      const matchesType =
        typeFilter === "All" || sale.tickettype === typeFilter;

      const matchesStatus =
        statusFilter === "All" || sale.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, typeFilter, statusFilter]);

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <p className="text-sm font-medium text-purple-600">
            Club Flow / Sales
          </p>

          <h1 className="mt-2 text-2xl font-bold text-white-100 sm:text-3xl">
            My Sales
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Track your ticket and table sales in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {card.title}
                    </p>

                    <h2 className="mt-3 text-2xl font-bold text-slate-900">
                      {card.value}
                    </h2>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}
                  >
                    <Icon size={23} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">My Sales</h2>
              <p className="mt-1 text-sm text-slate-500">
                View and manage your sales transactions.
              </p>
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search buyer or event..."
                className="w-full text-purple-600 rounded-xl border border-white-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-b border-slate-100 p-5">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-lg border border-white-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-purple-500"
            >
              <option value="All">All Sale Types</option>
              <option value="Ticket">Ticket</option>
              <option value="Table">Table</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-white-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-purple-500"
            >
              <option value="All">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>

            <span className="ml-auto self-center text-sm text-slate-500">
              {filteredSales.length} transactions
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-212.5 text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4 font-semibold">Event / Buyer</th>
                  <th className="px-5 py-4 font-semibold">Phone</th>
                  <th className="px-5 py-4 font-semibold">Sale Type</th>
                  <th className="px-5 py-4 font-semibold">Quantity</th>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Payment</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {sales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="transition hover:bg-purple-50/40"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {sale.event}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {sale.sellername}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {sale.sellerphone}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                          sale.tickettype === "Ticket"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {sale.tickettype}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {sale.noOfTicket}
                    </td>

                    <td className="px-5 py-4 text-sm font-bold text-slate-800">
                      ₹{sale.ticketprice.toLocaleString("en-IN")}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          sale.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                      {sale.createdAt}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          window.alert(
                            `Event: ${sale.event}\nBuyer: ${sale.buyername}\nPhone: ${sale.buyerphone}\nType: ${sale.tickettype}\nAmount: ₹${sale.ticketprice}\nPayment: ${sale.status}`,
                          )
                        }
                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredSales.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      No sales found. Try changing your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
