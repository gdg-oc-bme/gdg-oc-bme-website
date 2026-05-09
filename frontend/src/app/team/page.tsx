import { fetchApi } from "@/lib/api";
import TeamCard from "@/components/TeamCard";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  linkedinUrl: string;
  githubUrl: string;
}

const teamGroups = [
  { prefix: "Tech Team", label: "Tech Team", color: "border-google-red" },
  { prefix: "Solutions Team", label: "Solutions Team", color: "border-google-green" },
  { prefix: "Event Team", label: "Event Team", color: "border-google-yellow" },
  { prefix: "Social Media Team", label: "Social Media Team", color: "border-purple-400" },
];

export default async function TeamPage() {
  let team: TeamMember[] = [];
  try {
    team = await fetchApi<TeamMember[]>("/team");
  } catch {}

  const lead = team.filter((m) => m.role === "Lead");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="mb-12">
        <span className="text-google-green text-sm font-semibold uppercase tracking-wider">Our People</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-google-dark mt-2">
          Core Team
        </h1>
        <p className="mt-3 text-google-gray max-w-lg">
          The people behind GDG on Campus BME. Dedicated students making tech happen at BME.
        </p>
      </div>

      {lead.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-google-dark mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-google-blue" /> Lead
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {lead.map((m) => (
              <TeamCard key={m.id} {...m} />
            ))}
          </div>
        </div>
      )}

      {teamGroups.map((group) => {
        const members = team.filter((m) => m.role.startsWith(group.prefix));
        if (members.length === 0) return null;
        return (
          <div key={group.prefix} className="mb-10">
            <h2 className={`text-lg font-semibold text-google-dark mb-4 flex items-center gap-2 border-l-4 ${group.color} pl-3`}>
              {group.label}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {members.map((m) => (
                <TeamCard key={m.id} {...m} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
