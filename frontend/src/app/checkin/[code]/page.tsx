"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { postApi, fetchApi } from "@/lib/api";

interface EventData {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  imageUrl: string;
  category: string;
  checkInCode: string;
}

export default function CheckInPage() {
  const params = useParams();
  const code = params.code as string;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [event, setEvent] = useState<EventData | null>(null);
  const [eventLoaded, setEventLoaded] = useState(false);
  const [eventError, setEventError] = useState(false);

  const loadEvent = async () => {
    try {
      const events = await fetchApi<EventData[]>("/events");
      const found = events.find((e) => e.checkInCode === code);
      if (found) {
        setEvent(found);
      } else {
        setEventError(true);
      }
    } catch {
      setEventError(true);
    }
    setEventLoaded(true);
  };

  if (!eventLoaded) {
    loadEvent();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await postApi<{
        message?: string;
        error?: string;
        eventTitle?: string;
        memberName?: string;
      }>(`/checkin/${code}`, { name, email });

      if (res.error) {
        setResult({ success: false, message: res.error });
      } else {
        setResult({
          success: true,
          message: res.message || "Check-in successful!",
        });
      }
    } catch {
      setResult({ success: false, message: "Something went wrong. Please try again." });
    }
    setLoading(false);
  };

  if (eventError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-google-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-google-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-google-dark">Invalid QR Code</h1>
          <p className="text-google-gray mt-2">This check-in link is not valid.</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-google-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (result?.success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-google-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-google-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-google-dark">You&apos;re In!</h1>
          <p className="text-google-gray mt-2">{result.message}</p>
          <p className="text-google-gray text-sm mt-1">
            {event.title}
          </p>
          <a
            href="/leaderboard"
            className="inline-block mt-6 text-google-blue font-medium text-sm hover:underline"
          >
            View Leaderboard
          </a>
        </div>
      </div>
    );
  }

  const date = new Date(event.dateTime);
  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-google-border overflow-hidden shadow-sm">
          <div className="relative h-36">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <h1 className="text-xl font-bold text-white">{event.title}</h1>
              <p className="text-white/80 text-sm mt-0.5">{dateStr} at {timeStr}</p>
            </div>
          </div>

          <div className="p-6">
            {result && !result.success && (
              <div className="bg-google-red/5 border border-google-red/20 text-google-red text-sm rounded-xl px-4 py-3 mb-4">
                {result.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-google-dark mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-google-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-google-blue"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-google-dark mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-google-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-google-blue"
                  placeholder="your.email@bme.hu"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-google-blue text-white py-2.5 rounded-xl font-medium text-sm hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? "Checking in..." : "Check In"}
              </button>
            </form>

            <p className="text-xs text-google-gray text-center mt-4">
              Your attendance will be recorded for this event.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
