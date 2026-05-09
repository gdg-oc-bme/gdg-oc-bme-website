import { fetchApi } from "@/lib/api";
import EventCard from "@/components/EventCard";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  imageUrl: string;
  category: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  linkedinUrl: string;
  githubUrl: string;
}

export default async function HomePage() {
  let events: Event[] = [];
  let team: TeamMember[] = [];
  try {
    events = await fetchApi<Event[]>("/events");
    team = await fetchApi<TeamMember[]>("/team");
  } catch {}

  const featuredEvents = events.slice(0, 3);
  const teamHeads = team.filter((m) => m.role.includes("Head") || m.role === "Lead");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-google-dark min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[10%] w-96 h-96 bg-google-blue/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-google-green/15 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-google-red/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
          <div className="flex flex-col items-center text-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/70 text-sm mb-8">
                <span className="font-mono text-google-blue font-bold text-xs">&lt;/&gt;</span>
                Google Developer Groups on Campus
              </div>
            </div>

            <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl lg:text-8xl font-bold text-white tracking-tight leading-[1.05]">
              GDGoC
              <span className="gradient-text"> BME</span>
            </h1>

            <p className="animate-fade-up delay-200 mt-6 text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed">
              Budapest University of Technology and Economics. Build, learn, and grow with Google technologies.
            </p>

            <div className="animate-fade-up delay-300 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://gdg.community.dev/gdg-on-campus-budapest-university-of-technology-and-economics/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white text-google-dark px-8 py-3.5 rounded-full font-semibold hover:shadow-xl hover:shadow-white/10 transition-all text-sm flex items-center gap-2"
              >
                Join the Community
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link
                href="/events"
                className="border border-white/20 text-white/80 px-8 py-3.5 rounded-full font-semibold hover:bg-white/5 hover:border-white/30 transition-all text-sm"
              >
                View Events
              </Link>
            </div>

            <div className="animate-fade-up delay-500 mt-16 flex items-center gap-8 text-white/30 text-xs font-medium uppercase tracking-wider">
              <span>Workshops</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>Hackathons</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>Study Jams</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>Meetups</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-white border-b border-google-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "20+", label: "Core Members", color: "text-google-blue" },
              { value: "6", label: "Events This Semester", color: "text-google-red" },
              { value: "4", label: "Active Projects", color: "text-google-green" },
              { value: "100+", label: "Community Members", color: "text-google-yellow" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-3xl sm:text-4xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-google-gray mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-google-blue text-sm font-semibold uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-google-dark mt-3">
              What is GDG on Campus?
            </h2>
            <p className="mt-5 text-google-gray text-lg leading-relaxed">
              A community for BME students who want to grow as developers. We host workshops, hackathons, and study jams to help you learn Google technologies and connect with the developer community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "Workshops",
                desc: "Hands-on sessions on the latest Google technologies and tools.",
                color: "text-google-blue",
                bg: "bg-blue-50",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Hackathons",
                desc: "Build projects from scratch in high-energy coding marathons with prizes.",
                color: "text-google-red",
                bg: "bg-red-50",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Community",
                desc: "Connect with fellow developers and industry professionals at BME.",
                color: "text-google-green",
                bg: "bg-green-50",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ),
                title: "Cloud Jams",
                desc: "Free hands-on labs with Google Cloud Platform and earn skill badges.",
                color: "text-google-yellow",
                bg: "bg-yellow-50",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group p-6 rounded-2xl border border-google-border hover:border-transparent hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  {item.icon}
                </div>
                <h3 className="font-semibold text-google-dark mt-4 text-[15px]">
                  {item.title}
                </h3>
                <p className="text-sm text-google-gray mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="py-20 sm:py-28 bg-google-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-google-blue text-sm font-semibold uppercase tracking-wider">What&apos;s Next</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-google-dark mt-2">
                  Upcoming Events
                </h2>
              </div>
              <Link
                href="/events"
                className="hidden sm:flex items-center gap-1.5 text-google-blue hover:gap-2.5 text-sm font-medium transition-all"
              >
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
            <div className="sm:hidden mt-6 text-center">
              <Link href="/events" className="text-google-blue text-sm font-medium">
                View all events &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Team Preview */}
      {teamHeads.length > 0 && (
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-google-green text-sm font-semibold uppercase tracking-wider">Our People</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-google-dark mt-2">
                  Core Team
                </h2>
              </div>
              <Link
                href="/team"
                className="hidden sm:flex items-center gap-1.5 text-google-blue hover:gap-2.5 text-sm font-medium transition-all"
              >
                Meet everyone
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {teamHeads.map((member) => (
                <div
                  key={member.id}
                  className="group text-center p-5 rounded-2xl border border-google-border hover:border-transparent hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
                >
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-2 ring-google-border/50 group-hover:ring-google-blue/30 transition-all">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-google-dark mt-4 text-sm">
                    {member.name}
                  </h3>
                  <p className="text-xs text-google-gray mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-google-dark py-20 sm:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-[20%] w-64 h-64 bg-google-blue/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-[20%] w-72 h-72 bg-google-green/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-white/50 text-xs mb-6 font-mono">
            &lt;/&gt; open community
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Ready to level up?
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-md mx-auto">
            Join students at BME learning, building, and growing together with Google technologies.
          </p>
          <a
            href="https://gdg.community.dev/gdg-on-campus-budapest-university-of-technology-and-economics/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-white text-google-dark px-8 py-3.5 rounded-full font-semibold hover:shadow-xl hover:shadow-white/10 transition-all text-sm"
          >
            Join GDGoC BME
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
