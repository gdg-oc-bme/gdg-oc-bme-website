import { fetchApi } from "@/lib/api";
import OpportunityCard from "@/components/OpportunityCard";

interface Opportunity {
  id: number;
  title: string;
  company: string;
  description: string;
  link: string;
  deadline: string;
  location: string;
}

export default async function OpportunitiesPage() {
  let opportunities: Opportunity[] = [];
  try {
    opportunities = await fetchApi<Opportunity[]>("/opportunities");
  } catch {}

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="mb-12">
        <span className="text-google-yellow text-sm font-semibold uppercase tracking-wider">Careers</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-google-dark mt-2">
          Internships &amp; Opportunities
        </h1>
        <p className="mt-3 text-google-gray max-w-lg">
          Companies looking to hire from BME. Your next career move starts here.
        </p>
      </div>
      {opportunities.length === 0 ? (
        <div className="text-center py-20 text-google-gray">
          <p className="text-lg">No opportunities available right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opp) => (
            <OpportunityCard key={opp.id} {...opp} />
          ))}
        </div>
      )}
    </div>
  );
}
