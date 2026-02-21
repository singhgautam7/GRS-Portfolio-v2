import { getAllContent } from '@/lib/content';
import { getNowContent } from '@/lib/timeline';
import HomePageClient from './page-client';

export default function HomePage() {
  const { jobs, projects } = getAllContent();
  const nowContent = getNowContent();

  return <HomePageClient jobs={jobs} projects={projects} nowContent={nowContent} />;
}
