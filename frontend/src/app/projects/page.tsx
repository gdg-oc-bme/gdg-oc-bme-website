import { fetchApi } from "@/lib/api";
import ProjectCard from "@/components/ProjectCard";

interface Project {
  id: number;
  title: string;
  description: string;
  githubLink: string;
  techStack: string;
  imageUrl: string;
}

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    projects = await fetchApi<Project[]>("/projects");
  } catch {}

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="mb-12">
        <span className="text-google-green text-sm font-semibold uppercase tracking-wider">Open Source</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-google-dark mt-2">
          Projects
        </h1>
        <p className="mt-3 text-google-gray max-w-lg">
          Open source projects built by our community. Contribute and learn by doing.
        </p>
      </div>
      {projects.length === 0 ? (
        <div className="text-center py-20 text-google-gray">
          <p className="text-lg">Projects coming soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      )}
    </div>
  );
}
