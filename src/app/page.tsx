import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { ExperienceSection } from '@/components/sections/experience';
import { FeaturedSection } from '@/components/sections/featured-projects';
import { ProjectsGrid } from '@/components/sections/projects-grid';
import { ContactSection } from '@/components/sections/contact';
import { getJobs, getProjects, getFeatured } from '@/lib/content';

export default function Home() {
  const jobs = getJobs();
  const projects = getProjects();
  const featured = getFeatured();

  return (
    <main className="mx-auto min-h-screen w-full max-w-page px-6 md:px-12 lg:px-[150px]">
      <HeroSection />
      <AboutSection />
      <ExperienceSection jobs={jobs} />
      <FeaturedSection featured={featured} />
      <ProjectsGrid projects={projects} />
      <ContactSection />
    </main>
  );
}
