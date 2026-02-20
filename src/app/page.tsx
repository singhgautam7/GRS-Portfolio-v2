import { getAllContent } from '@/lib/content';
import { HeroSection } from '@/components/sections/hero';
import { ResumeOverview } from '@/components/sections/resume-overview';
import { ProjectsTable } from '@/components/sections/projects-table';
import { BlogPreview } from '@/components/sections/blog-preview';
import { ContactSection } from '@/components/sections/contact';

export default function HomePage() {
  const { jobs, projects, featured, posts } = getAllContent();

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
      <HeroSection />
      <ResumeOverview jobs={jobs} />
      <ProjectsTable projects={allProjects} />
      <BlogPreview posts={posts} />
      <ContactSection />
    </main>
  );
}
