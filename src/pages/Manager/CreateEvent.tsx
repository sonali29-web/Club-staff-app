import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { createEvent } from "../../services/storage";
import type { ClubEvent } from "../../types/types";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    clubid: "",
    startdatetime: "",
    enddatetime: "",
    bookingstart: "",
    bookingend: "",
    time: "",
    image: "",
    language: "",
    genreid: "",
    categoryid: "",
    organizerid: "",
    artists: "",
    tableBookingEnabled: false,
    tableBookingLayoutId: "",
    tableBookingSlotKey: "",
    onGroundAssignedUserIds: [] as string[],
  });

  const [tickets, setTickets] = useState([
    { tickettype: "", ticketprice: "", coverAmount: "" },
  ]);

  const [sellers, setSellers] = useState<{ id: string; name: string }[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

useState(() => {
    fetch("http://localhost:3001/sellers")
      .then((res) => res.json())
      .then((data) => setSellers(data))
      .catch(() => setSellers([]));
  });

const inputClass =
    "w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur-xl transition focus:border-purple-300 focus:ring-2 focus:ring-purple-400/30";

const labelClass = "mb-2 block text-sm font-medium text-white/90";

const updateForm = (field: string, value: string | boolean | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const eventData = {
        ...form,
        artists: form.artists
          .split(",")
          .map((artist) => artist.trim())
          .filter(Boolean),
        tickets: tickets
          .filter((ticket) => ticket.tickettype.trim() !== "")
          .map((ticket) => ({
            _id: crypto.randomUUID(),
            tickettype: ticket.tickettype,
            ticketprice: Number(ticket.ticketprice),
            coverAmount: Number(ticket.coverAmount || 0),
          })),
      };

      await createEvent(eventData as Omit<ClubEvent, "id">);

      navigate("/manager");
    } catch {
      setError("Failed to create event. Please check the API server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#100b24] via-[#241044] to-[#111827] px-4 py-10 sm:px-8">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-purple-600/30 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-indigo-500/30 blur-[100px]" />

      <div className="relative mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="mb-8">
          <p className="text-sm font-medium tracking-widest text-purple-300">
            CLUB FLOW / EVENTS
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Create Event
          </h1>
          <p className="mt-3 text-sm text-white/60">
            Add the details to create your club event.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-white/20 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8"
        >
          {error && (
            <p className="rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">
              {error}
            </p>
          )}

          <div>
            <label className={labelClass}>Event Name *</label>
            <input
              className={inputClass}
              placeholder="e.g. Neon Night"
              value={form.title}
              onChange={(e) => updateForm("title", e.target.value)}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Club ID *</label>
            <input
              className={inputClass}
              placeholder="Enter club ID"
              value={form.clubid}
              onChange={(e) => updateForm("clubid", e.target.value)}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Language *</label>
            <input
              className={inputClass}
              placeholder="e.g. Hindi"
              value={form.language}
              onChange={(e) => updateForm("language", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              ["Event Start *", "startdatetime"],
              ["Event End *", "enddatetime"],
              ["Booking Start *", "bookingstart"],
              ["Booking End *", "bookingend"],
            ].map(([label, field]) => (
              <div key={field}>
                <label className={labelClass}>{label}</label>
                <input
                  type="date-local"
                  className={inputClass}
                  value={form[field as keyof typeof form] as string}
                  onChange={(e) => updateForm(field, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Genre ID *</label>
              <input
                className={inputClass}
                placeholder="Enter genre ID"
                value={form.genreid}
                onChange={(e) => updateForm("genreid", e.target.value)}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Category ID *</label>
              <input
                className={inputClass}
                placeholder="Enter category ID"
                value={form.categoryid}
                onChange={(e) => updateForm("categoryid", e.target.value)}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Organizer ID *</label>
              <input
                className={inputClass}
                placeholder="Enter organizer ID"
                value={form.organizerid}
                onChange={(e) => updateForm("organizerid", e.target.value)}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Artists</label>
              <input
                className={inputClass}
                placeholder="DJ Akash, DJ Rahul"
                value={form.artists}
                onChange={(e) => updateForm("artists", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Event Time</label>
              <input
                className={inputClass}
                placeholder="8 PM"
                value={form.time}
                onChange={(e) => updateForm("time", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Image URL</label>
              <input
                className={inputClass}
                placeholder="http//image"
                value={form.image}
                onChange={(e) => updateForm("image", e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className={labelClass}>Ticket Details *</label>
              <button
                type="button"
                onClick={() =>
                  setTickets([
                    ...tickets,
                    { tickettype: "", ticketprice: "", coverAmount: "" },
                  ])
                }
                className="text-sm font-semibold text-purple-300 hover:text-white"
              >
                + Add Ticket
              </button>
            </div>

            {tickets.map((ticket, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-1 gap-4 rounded-xl border border-white/15 p-4 sm:grid-cols-3"
              >
                <input
                  className={inputClass}
                  placeholder="VIP / Normal"
                  value={ticket.tickettype}
                  onChange={(e) =>
                    setTickets((prev) =>
                      prev.map((item, i) =>
                        i === index
                          ? { ...item, tickettype: e.target.value }
                          : item,
                      ),
                    )
                  }
                  required={index === 0}
                />
                <input
                  type="number"
                  min="0"
                  className={inputClass}
                  placeholder="Ticket Price"
                  value={ticket.ticketprice}
                  onChange={(e) =>
                    setTickets((prev) =>
                      prev.map((item, i) =>
                        i === index
                          ? { ...item, ticketprice: e.target.value }
                          : item,
                      ),
                    )
                  }
                  required={index === 0}
                />
                <input
                  type="number"
                  min="0"
                  className={inputClass}
                  placeholder="Cover Amount"
                  value={ticket.coverAmount}
                  onChange={(e) =>
                    setTickets((prev) =>
                      prev.map((item, i) =>
                        i === index
                          ? { ...item, coverAmount: e.target.value }
                          : item,
                      ),
                    )
                  }
                />
              </div>
            ))}
          </div>

          <div className="space-y-4 rounded-xl border border-white/15 p-4">
            <label className="flex items-center gap-3 text-sm text-white">
              <input
                type="checkbox"
                checked={form.tableBookingEnabled}
                onChange={(e) =>
                  updateForm("tableBookingEnabled", e.target.checked)
                }
                className="h-4 w-4 accent-purple-500"
              />
              Enable Table Booking
            </label>

            {form.tableBookingEnabled && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  className={inputClass}
                  placeholder="Table Booking Layout ID"
                  value={form.tableBookingLayoutId}
                  onChange={(e) =>
                    updateForm("tableBookingLayoutId", e.target.value)
                  }
                  required
                />
                <input
                  className={inputClass}
                  placeholder="Table Booking Slot Key"
                  value={form.tableBookingSlotKey}
                  onChange={(e) =>
                    updateForm("tableBookingSlotKey", e.target.value)
                  }
                  required
                />
              </div>
            )}
          </div>

          <div>
            <label className={labelClass}>Assign Sellers</label>
            <div className="space-y-3 rounded-xl border border-white/15 p-4">
              {sellers.map((seller) => (
                <label
                  key={seller.id}
                  className="flex items-center gap-3 text-sm text-white"
                >
                  <input
                    type="checkbox"
                    checked={form.onGroundAssignedUserIds.includes(seller.id)}
                    onChange={(e) => {
                      const ids = e.target.checked
                        ? [...form.onGroundAssignedUserIds, seller.id]
                        : form.onGroundAssignedUserIds.filter(
                            (id) => id !== seller.id,
                          );

                      updateForm("onGroundAssignedUserIds", ids);
                    }}
                    className="h-4 w-4 accent-purple-500"
                  />
                  {seller.name}
                </label>
              ))}
              {sellers.length === 0 && (
                <p className="text-sm text-white/60">
                  No sellers found. Start JSON Server and check db.json.
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-purple-900/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus size={19} />
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </main>
  );
}
