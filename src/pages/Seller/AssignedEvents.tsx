
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import AssignedEventCard from "../../components/SellerComp/AssignedEventCard";
import type { ClubEvent } from "../../types/types";

function AssignedEvents() {
  const [assignedEvents, setAssignedEvents] = useState<ClubEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const sellerId = localStorage.getItem("sellerId");
      if (!sellerId) return;

      const response = await fetch("http://localhost:3001/events");
      const events = await response.json();

      const filteredEvents = events.filter((event: any) =>
        event.onGroundAssignedUserIds?.some(
          (id: string) => String(id) === String(sellerId)
        )
      );

      setAssignedEvents(filteredEvents);
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-violet-700">
            <CalendarDays size={17} />
            Seller Workspace
          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Assigned Events
          </h1>

          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Select your assigned event to sell tickets or tables.
          </p>
        </div>

        <div className="mt-7 mb-4">
          <h2 className="text-base font-semibold text-white">
            Your Events
          </h2>
        </div>

        {assignedEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
            {assignedEvents.map((event) => (
              <AssignedEventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <CalendarDays
              size={38}
              className="mx-auto mb-3 text-gray-400"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              No events found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Check your assigned events.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default AssignedEvents;
