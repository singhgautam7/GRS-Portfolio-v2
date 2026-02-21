import { getAllContent } from '@/lib/content';
import HomePageClient from './page-client';

export default function HomePage() {
  const { jobs, projects } = getAllContent();

  return <HomePageClient jobs={jobs} projects={projects} />;
}
