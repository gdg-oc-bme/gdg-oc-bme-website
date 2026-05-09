interface OpportunityCardProps {
  title: string;
  company: string;
  description: string;
  link: string;
  deadline: string;
  location: string;
}

export default function OpportunityCard({
  title,
  company,
  description,
  link,
  deadline,
  location,
}: OpportunityCardProps) {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const daysLeft = Math.ceil(
    (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isExpiringSoon = daysLeft > 0 && daysLeft < 14;

  return (
    <div className="bg-white rounded-2xl border border-google-border p-6 hover:border-transparent hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-google-dark text-[15px]">{title}</h3>
          <p className="text-sm text-google-blue font-medium mt-0.5">{company}</p>
        </div>
        {isExpiringSoon && (
          <span className="flex-shrink-0 text-[11px] bg-google-red/10 text-google-red px-2.5 py-1 rounded-full font-semibold">
            {daysLeft}d left
          </span>
        )}
      </div>
      <p className="text-sm text-google-gray mt-3 line-clamp-2 leading-relaxed">
        {description}
      </p>
      <div className="flex items-center gap-3 mt-4 text-xs text-google-gray">
        <span className="flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5"
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
          {location}
        </span>
        <span className="flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Due{" "}
          {new Date(deadline).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 mt-4 text-sm text-google-blue hover:gap-2.5 font-medium transition-all"
      >
        Apply Now
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </div>
  );
}
