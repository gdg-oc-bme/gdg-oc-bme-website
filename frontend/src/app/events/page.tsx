import { fetchApi } from "@/lib/api";
import EventCard from "@/components/EventCard";

interface Event {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  imageUrl: string;
  category: string;
  checkInCode: string;
}

export default async function EventsPage() {
  let events: Event[] = [];
  try {
    events = await fetchApi<Event[]>("/events");
  } catch {}

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="mb-12">
        <span className="text-google-blue text-sm font-semibold uppercase tracking-wider">What&apos;s Next</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-google-dark mt-2">
          Events
        </h1>
        <p className="mt-3 text-google-gray max-w-lg">
          Workshops, hackathons, study jams, and meetups. Something for every developer.
        </p>
      </div>
      {events.length === 0 ? (
        <div className="text-center py-20 text-google-gray">
          <p className="text-lg">No events yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      )}
    </div>
  );
}
