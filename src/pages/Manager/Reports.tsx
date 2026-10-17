import {
  IndianRupee,
  Ticket,
  Armchair,
  Clock3,
  TrendingUp,
Eye,
Search
} from "lucide-react";
import { useState,useEffect,useMemo } from "react";
import type { SaleRecord } from "../../types/types";
import { API_URL } from "../../services/storage";


const Reports = () => {


  const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    const [sales, setSales] = useState<SaleRecord[]>([]);

useEffect(() => {
  const fetchSales = async () => {
    try {
      const response = await fetch(`${API_URL}/sales`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data: SaleRecord[] = await response.json();

      console.log("Fetched sales:", data);
      setSales(data);
    } catch (error) {
      console.error("Sales fetch failed:", error);
    }
  };

  fetchSales();
}, []);


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


const { ticketsSold, tablesSold, totalCoverAmount, salescount } =
  useMemo(() => {
    const ticketsSold = sales.reduce(
      (total, sale) =>
        sale.saleType === "ticket"
          ? total + (sale.noOfTicket ?? 0)
          : total,
      0
    );

    const tablesSold = sales.filter(
      (sale) => sale.saleType === "table"
    ).length;

    const totalCoverAmount = sales.reduce(
      (total, sale) =>
        sale.saleType === "ticket"
          ? total +
            (sale.coverAmount ?? 0) * (sale.noOfTicket ?? 0)
          : total,
      0
    );

    const salescount = sales.length;

    return {
      ticketsSold,
      tablesSold,
      totalCoverAmount,
      salescount,
    };
  }, [sales]);



  return (
    <div className="space-y-8 p-5 ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white-100">
            Reports
          </h1>

          <p className="text-gray-400 mt-1">
            Track your club's on-ground sales performance.
          </p>
        </div>


      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <IndianRupee size={22} />
            </div>

            <span className="text-xs font-semibold text-green-600">
              +15%
            </span>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Total Income
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            {totalCoverAmount}
          </h2>
        </div>


        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Ticket size={22} />
            </div>

            <span className="text-xs font-semibold text-purple-600">
              Tickets
            </span>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Tickets Sold
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            {ticketsSold}
          </h2>
        </div>


        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Armchair size={22} />
            </div>

            <span className="text-xs font-semibold text-blue-600">
              Tables
            </span>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Tables Sold
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            {tablesSold}
          </h2>
        </div>


        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <Clock3 size={22} />
            </div>

            <span className="text-xs font-semibold text-yellow-600">
             sales
            </span>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Total Sales
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            {salescount}
          </h2>
        </div>
      </div>


      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-purple-700 via-purple-600 to-pink-500 p-6 md:p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
            <TrendingUp size={18} />
            Sales Performance
          </div>

          <h2 className="mt-3 text-2xl md:text-3xl font-bold">
            Your club is performing well!
          </h2>

          <p className="mt-2 max-w-2xl text-sm md:text-base text-white/80">
            On-ground sales are increasing across your upcoming events.
            Keep monitoring seller performance and pending payments.
          </p>
        </div>

        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 right-20 h-48 w-48 rounded-full bg-white/10" />
      </div>


        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Sales History
              </h2>
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
                className="w-full rounded-xl border text-purple-600 border-white-200 bg-slate-50 text-grey-100 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
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
                            `Event: ${sale.event}\nBuyer: ${sale.buyername}\nPhone: ${sale.buyerphone}\nType: ${sale.tickettype}\nAmount: ₹${sale.ticketprice}\nPayment: ${sale.status}`
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

  );
};

export default Reports;