import { fetchApi } from "@/lib/api";

interface LeaderboardEntry {
  name: string;
  email: string;
  checkIns: number;
}

export default async function LeaderboardPage() {
  let leaderboard: LeaderboardEntry[] = [];
  try {
    leaderboard = await fetchApi<LeaderboardEntry[]>("/checkin/leaderboard");
  } catch {}

  const medalColors = ["text-yellow-500", "text-gray-400", "text-amber-600"];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="mb-12">
        <span className="text-google-yellow text-sm font-semibold uppercase tracking-wider">Attendance Tracker</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-google-dark mt-2">
          Leaderboard
        </h1>
        <p className="mt-3 text-google-gray max-w-lg">
          Check in at events using QR codes to climb the leaderboard. Top attendees get recognized.
        </p>
      </div>

      {leaderboard.length === 0 ? (
        <div className="text-center py-20 text-google-gray">
          <div className="w-16 h-16 bg-google-light rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-google-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-lg font-medium">No check-ins yet</p>
          <p className="text-sm mt-1">Attend events and scan QR codes to appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-google-border overflow-hidden">
          <div className="grid grid-cols-[3rem_1fr_5rem] sm:grid-cols-[4rem_1fr_7rem] items-center px-5 py-3 bg-google-light border-b border-google-border text-xs font-semibold text-google-gray uppercase tracking-wider">
            <span>Rank</span>
            <span>Member</span>
            <span className="text-right">Events</span>
          </div>
          {leaderboard.map((entry, i) => (
            <div
              key={entry.email}
              className={`grid grid-cols-[3rem_1fr_5rem] sm:grid-cols-[4rem_1fr_7rem] items-center px-5 py-4 border-b border-google-border last:border-b-0 hover:bg-google-light/50 transition-colors ${
                i < 3 ? "bg-white" : ""
              }`}
            >
              <span className={`font-bold text-lg ${i < 3 ? medalColors[i] : "text-google-gray"}`}>
                {i < 3 ? (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <div>
                <p className="font-medium text-google-dark">{entry.name}</p>
                <p className="text-xs text-google-gray">{entry.email}</p>
              </div>
              <span className="text-right font-bold text-google-blue">
                {entry.checkIns}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
