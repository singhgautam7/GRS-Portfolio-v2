'use client';

import { useEffect } from 'react';
import { HeroResumeSection } from '@/components/sections/hero-resume';
import { WhyMeSection } from '@/components/sections/why-me';
import { ExperienceSection } from '@/components/sections/experience';
import { ProjectsTable } from '@/components/sections/projects-table';
import { ContactSection } from '@/components/sections/contact';
import { NowSection } from '@/components/sections/now-section';
import { PostsSection } from '@/components/sections/posts-section';
import { type NowContent } from '@/lib/timeline';
import type { Job, Project, Post } from '@/lib/content';

interface HomePageClientProps {
  jobs: Job[];
  projects: Project[];
  posts: Post[];
  nowContent: NowContent | null;
}

export default function HomePageClient({ jobs, projects, posts, nowContent }: HomePageClientProps) {
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          const newUrl = `/#${entry.target.id}`;
          if (window.location.hash !== newUrl && window.location.pathname === '/') {
            window.history.replaceState(null, '', newUrl);
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section hits the vertical middle
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <HeroResumeSection />
      <WhyMeSection />
      <ExperienceSection jobs={jobs} />
      <ProjectsTable projects={projects} />
      <PostsSection posts={posts} />
      <NowSection data={nowContent} />
      <ContactSection />
    </main>
  );
}
