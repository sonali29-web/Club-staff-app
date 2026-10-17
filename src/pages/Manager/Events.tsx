import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Plus,
  Search,
  LoaderCircle,
} from "lucide-react";

import { getEvents } from "../../services/storage";
import type { ClubEvent } from "../../types/types";

type EventTab = "All" | "Upcoming" | "Active";

export default function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [activeTab, setActiveTab] = useState<EventTab>("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        setError("");

        const data = await getEvents();
        setEvents(data);
      } catch {
        setError("Unable to load events. Please check the API server.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === "All") return true;

    const startDate = event.startdatetime
      ? new Date(event.startdatetime)
      : null;

    if (!startDate || Number.isNaN(startDate.getTime())) {
      return false;
    }

    const now = new Date();

    if (activeTab === "Upcoming") {
      return startDate > now;
    }

    if (activeTab === "Active") {
      const endDate = event.enddatetime
        ? new Date(event.enddatetime)
        : startDate;

      return startDate <= now && endDate >= now;
    }

    return true;
  });

  function formatDate(date?: string) {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function getStatus(event: ClubEvent) {
    const now = new Date();
    const start = event.startdatetime ? new Date(event.startdatetime) : null;
    const end = event.enddatetime ? new Date(event.enddatetime) : start;

    if (!start || Number.isNaN(start.getTime())) {
      return "Upcoming";
    }

    if (start > now) return "Upcoming";
    if (end && end >= now) return "Active";

    return "Ended";
  }

  return (
    <main className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-purple-600">
            Club Management
          </p>

          <h1 className="text-2xl font-bold text-white-100 sm:text-3xl">
            Events
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage your club events and ticket sales.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/manager/create")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:from-purple-700 hover:to-indigo-700"
        >
          <Plus size={18} />
          Create Event
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-500 bg-black/30 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="w-full rounded-xl border border-white-500 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(["All", "Upcoming", "Active"] as EventTab[]).map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex min-h-60 items-center justify-center gap-3 text-purple-600">
          <LoaderCircle size={24} className="animate-spin" />
          <span className="text-sm font-medium">Loading events...</span>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-medium text-red-700">{error}</p>
          <p className="mt-2 text-sm text-red-500">
            Make sure the API server is running on port 3001.
          </p>
        </div>
      )}

      {!loading && !error && filteredEvents.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
          <CalendarDays size={38} className="mx-auto mb-3 text-purple-400" />

          <h2 className="text-lg font-semibold text-slate-800">
            No events found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            No events match your search or selected filter.
          </p>
        </div>
      )}

      {!loading && !error && filteredEvents.length > 0 && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-white-100">All Events</h2>

            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
              {filteredEvents.length} events
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => {
              const status = getStatus(event);

              return (
                <article
                  key={event._id ?? event.id ?? event.title}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden bg-linear-to-br from-purple-700 via-indigo-700 to-slate-900">
                    {event.image ? (
                      <img
                        src={String(event.image)}
                        alt={event.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <CalendarDays size={52} className="text-white/50" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />

                    <span
                      className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                        status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : status === "Ended"
                            ? "bg-slate-200 text-slate-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {status}
                    </span>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">
                        {event.title}
                      </h3>

                      <p className="mt-1 text-sm text-white/80">Club Event</p>
                    </div>
                  </div>

                  <div className="space-y-4 p-5 ">
                    <div className="flex  items-start gap-3 text-sm text-slate-600">
                      <CalendarDays
                        size={18}
                        className="mt-0.5 shrink-0 text-purple-600"
                      />

                      <div>
                        <p className="font-medium text-slate-800">
                          {formatDate(event.startdatetime)}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Event date
                        </p>
                      </div>

                      <div>
                        <p className="font-medium text-slate-800 ">
                          {formatDate(event.enddatetime)}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">End date</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <Clock3
                        size={18}
                        className="mt-0.5 shrink-0 text-purple-600"
                      />

                      <div>
                        <p className="font-medium text-slate-800">
                          {event.time}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Start time
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <MapPin
                        size={18}
                        className="mt-0.5 shrink-0 text-purple-600"
                      />

                      <div>
                        <p className="font-medium text-slate-800">
                          {event.location
                            ? String(event.location)
                            : event.clubid
                              ? `Club ID: ${event.clubid}`
                              : "Location unavailable"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Event location
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}
