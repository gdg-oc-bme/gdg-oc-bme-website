"use client";

import Link from "next/link";
import QRCodeModal from "./QRCodeModal";

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  imageUrl: string;
  category: string;
  checkInCode?: string;
}

const categoryStyle: Record<string, { bg: string; text: string }> = {
  Workshop: { bg: "bg-google-blue/10", text: "text-google-blue" },
  Hackathon: { bg: "bg-google-red/10", text: "text-google-red" },
  "Study Jam": { bg: "bg-google-green/10", text: "text-google-green" },
  Conference: { bg: "bg-google-yellow/10", text: "text-yellow-700" },
  Meetup: { bg: "bg-purple-50", text: "text-purple-600" },
};

export default function EventCard({
  id,
  title,
  description,
  dateTime,
  location,
  imageUrl,
  category,
  checkInCode,
}: EventCardProps) {
  const date = new Date(dateTime);
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = date.getDate();
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const style = categoryStyle[category] || categoryStyle.Workshop;

  return (
    <Link
      href={`/events#${id}`}
      className="group bg-white rounded-2xl border border-google-border overflow-hidden hover:border-transparent hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${style.bg} ${style.text}`}
        >
          {category}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <div className="flex-shrink-0 text-center bg-google-light rounded-xl p-2.5 min-w-[3.5rem]">
            <div className="text-[10px] text-google-gray font-semibold tracking-wider">
              {month}
            </div>
            <div className="text-xl font-bold text-google-dark leading-tight">
              {day}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-google-dark group-hover:text-google-blue transition-colors truncate text-[15px]">
              {title}
            </h3>
            <p className="text-sm text-google-gray mt-1.5 line-clamp-2 leading-relaxed">
              {description}
            </p>
            <div className="flex items-center gap-1.5 mt-2.5 text-xs text-google-gray">
              <svg
                className="w-3.5 h-3.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="truncate">{location}</span>
              <span className="text-google-border mx-0.5">|</span>
              <span>{time}</span>
            </div>
            {checkInCode && (
              <div className="mt-2.5" onClick={(e) => e.stopPropagation()}>
                <QRCodeModal checkInCode={checkInCode} eventTitle={title} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
