import { getPosts } from '@/lib/content';
import type { Metadata } from 'next';
import BlogList from '@/components/blog-list';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts, tutorials, and insights about software engineering.',
};

export default function BlogsPage() {
  const posts = getPosts();

  return (
    <main className="mx-auto min-h-screen w-full max-w-page px-6 pt-[120px] pb-section lg:px-12">
      <section className="mx-auto max-w-content">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Blog</h1>
          <p className="mt-3 text-muted-foreground">
            Thoughts, tutorials, and insights about software engineering.
          </p>
        </header>

        <BlogList posts={posts} />
      </section>
    </main>
  );
}
