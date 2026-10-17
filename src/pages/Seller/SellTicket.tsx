
import { useState } from "react";
import {
  CalendarDays,
  MapPin,
  Ticket,
  User,
  Phone,
  Mail,
  ArrowLeft,
  Link,
CreditCard,
Banknote
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import type { ClubEvent } from "../../types/types";


export default function SellTicket() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<
  "cash" | "payment_link"
>("cash");

const location = useLocation();
const event = location.state?.event as ClubEvent


  const [form, setForm] = useState({
    tickettype: "Normal",
    tickettypeid: "",
    ticketprice: "",
    coverAmount: "",
    noOfTicket: "1",
    buyername: "",
    buyerphone: "",
    buyeremail: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const totalAmount =Number(form.ticketprice || 0) * Number(form.noOfTicket || 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100";

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* Header */}
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-sm text-slate-400 hover:text-purple-700"
          >
            <ArrowLeft size={18} />
            Back to Assigned Events
          </button>

          <p className="text-sm font-medium text-purple-600">
            Club Flow / Sell Ticket
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-100 sm:text-3xl">
            Sell Ticket
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Enter ticket and customer details to create a sale.
          </p>
        </div>

        {/* Selected Event Details - Read Only */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-linear-to-r from-purple-700 to-indigo-600 px-5 py-4 text-white">
            <p className="text-sm text-purple-100">Selected Event</p>
            <h2 className="mt-1 text-xl font-bold">{event.title}</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs text-slate-500">Event ID</p>
              <p className="mt-1 font-semibold text-slate-800">
                {event.id}
              </p>
            </div>

            <div>
              <p className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin size={15} /> Club / Venue
              </p>
              <p className="mt-1 font-semibold text-slate-800">
                {event.title}
              </p>
            </div>

            <div>
              <p className="flex items-center gap-2 text-xs text-slate-500">
                <CalendarDays size={15} /> Event Date
              </p>
              <p className="mt-1 font-semibold text-slate-800">
                {event.startdatetime}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Location</p>
              <p className="mt-1 font-semibold text-slate-800">
                {event.venue}
              </p>
            </div>
          </div>
        </section>

        {/* Ticket Sale Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Ticket Details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-3 text-purple-700">
                <Ticket size={21} />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Ticket Details</h2>
                <p className="text-xs text-slate-500">
                  Enter ticket type and pricing.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Ticket Type
                </label>
                <select
                  name="tickettype"
                  value={form.tickettype}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="Normal">Normal</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Ticket Type ID
                </label>
                <input
                  name="tickettypeid"
                  value={form.tickettypeid}
                  onChange={handleChange}
                  placeholder="Enter assigned ticket type ID"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Ticket Price (₹)
                </label>
                <input
                  name="ticketprice"
                  type="number"
                  min="0"
                  value={form.ticketprice}
                  onChange={handleChange}
                  placeholder="Enter ticket price"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Cover Amount (₹)
                </label>
                <input
                  name="coverAmount"
                  type="number"
                  min="0"
                  value={form.coverAmount}
                  onChange={handleChange}
                  placeholder="Enter cover amount"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Number of Tickets
                </label>
                <input
                  name="noOfTicket"
                  type="number"
                  min="1"
                  value={form.noOfTicket}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-purple-50 p-4">
              <p className="text-sm text-slate-600">Total Ticket Amount</p>
              <p className="mt-1 text-2xl font-bold text-purple-700">
                ₹{totalAmount.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Ticket price × number of tickets. Cover amount is entered separately.
              </p>
            </div>
          </section>

          {/* Buyer Details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                <User size={21} />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Buyer Details</h2>
                <p className="text-xs text-slate-500">
                  Enter the customer's contact information.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Buyer Name
                </label>
                <input
                  name="buyername"
                  value={form.buyername}
                  onChange={handleChange}
                  placeholder="Enter buyer name"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Phone size={15} /> Buyer Phone
                </label>
                <input
                  name="buyerphone"
                  type="tel"
                  value={form.buyerphone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className={inputClass}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Mail size={15} /> Buyer Email (Optional)
                </label>
                <input
                  name="buyeremail"
                  type="email"
                  value={form.buyeremail}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className={inputClass}
                />
              </div>
            </div>
          </section>
{/* Payment Method */}
<div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
  <div className="mb-5 flex items-center gap-3">
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
      <CreditCard size={23} />
    </div>

    <div>
      <h2 className="text-lg font-bold text-gray-900">
        Payment Method
      </h2>
      <p className="text-sm text-gray-500">
        Select how the customer will pay
      </p>
    </div>
  </div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    {/* Cash Payment */}
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
        paymentMethod === "cash"
          ? "border-purple-500 bg-purple-50 ring-1 ring-purple-200"
          : "border-gray-200 hover:border-purple-300"
      }`}
    >
      <input
        type="radio"
        name="paymentMethod"
        value="cash"
        checked={paymentMethod === "cash"}
        onChange={() => setPaymentMethod("cash")}
        className="h-4 w-4 accent-purple-600"
      />

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
        <Banknote size={22} />
      </div>

      <div>
        <h3 className="font-semibold text-gray-900">
          Cash Payment
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          Collect payment directly
        </p>
      </div>
    </label>

    {/* Payment Link */}
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
        paymentMethod === "payment_link"
          ? "border-purple-500 bg-purple-50 ring-1 ring-purple-200"
          : "border-gray-200 hover:border-purple-300"
      }`}
    >
      <input
        type="radio"
        name="paymentMethod"
        value="payment_link"
        checked={paymentMethod === "payment_link"}
        onChange={() => setPaymentMethod("payment_link")}
        className="h-4 w-4 accent-purple-600"
      />

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
        <Link size={22} />
      </div>

      <div>
        <h3 className="font-semibold text-gray-900">
          Payment Link
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          Send link to customer
        </p>
      </div>
    </label>
  </div>
</div>


          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-linear-to-r from-purple-700 to-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Create Ticket Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
