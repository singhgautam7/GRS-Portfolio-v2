import { getAllContent } from '@/lib/content';
import { HeroResumeSection } from '@/components/sections/hero-resume';
import { ExperienceSection } from '@/components/sections/experience';
import { ProjectsTable } from '@/components/sections/projects-table';
import { ContactSection } from '@/components/sections/contact';
import { NowSection } from '@/components/sections/now-section';

export default function HomePage() {
  const { jobs, projects, featured } = getAllContent();

  // Merge featured + projects for the unified table, deduplicating by slug
  const allProjects = [...projects];
  for (const f of featured) {
    if (!allProjects.find((p) => p.slug === f.slug)) {
      allProjects.push({
        ...f,
        company: undefined,
        showInProjects: true,
        tech: f.tech,
        slug: f.slug,
        content: f.content,
        date: f.date,
        title: f.title,
      });
    }
  }

  return (
    <main>
      <HeroResumeSection />
      <ExperienceSection jobs={jobs} />
      <ProjectsTable projects={allProjects} />
      <NowSection />
      <ContactSection />
    </main>
  );
}
