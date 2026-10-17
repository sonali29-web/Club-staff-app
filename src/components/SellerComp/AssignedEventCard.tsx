import { CalendarDays, MapPin, Clock, Ticket, Armchair } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ClubEvent } from "../../types/types";

interface AssignedEventCardProps {
  event: ClubEvent;
}

function AssignedEventCard({ event }: AssignedEventCardProps) {
  const navigate = useNavigate();

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div
        className="relative flex min-h-57.5 items-end bg-cover bg-center"
        style={{ backgroundImage: `url("${event.image}")` }}
      >

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/10" />


        <div className="relative z-10 w-full p-5 text-white">
          <span className="mb-3 inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            {event.status}
          </span>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {event.title}
          </h2>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-100">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} />
              {event.startdatetime}
            </span>

            <span className="flex items-center gap-2">
              <Clock size={16} />
              {event.time}
            </span>
          </div>

          <p className="mt-2 flex items-center gap-2 text-sm text-gray-200">
            <MapPin size={16} className="shrink-0" />
            {event.venue}
          </p>

          <div className="grid grid-cols-2 gap-3 p-4">
            <button
              type="button"
              onClick={() =>
                navigate("/seller/sellticket", {
                  state: { event },
                })
              }
              className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-purple-600 to-pink-500 px-3 py-3 text-sm font-semibold text-white transition hover:from-violet-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
            >
              <Ticket size={17} />
              Sell Ticket
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/seller/selltable", {
                  state: { event },
                })
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
            >
              <Armchair size={17} />
              Sell Table
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default AssignedEventCard;
