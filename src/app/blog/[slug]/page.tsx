import { getPosts, getPost } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-page px-6 pt-[150px] md:px-12 lg:px-[150px]">
      <article className="mx-auto max-w-[700px]">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-green transition-colors hover:text-green/80"
        >
          <ArrowLeft size={16} />
          All Posts
        </Link>

        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
            <time>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
            {post.tags.length > 0 && (
              <>
                <span>·</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="text-green">
                    #{tag}
                  </span>
                ))}
              </>
            )}
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Render markdown content as simple HTML for now */}
          <div
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                .replace(/^- (.*$)/gm, '<li>$1</li>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`(.*?)`/g, '<code>$1</code>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/^(?!<[hlu])/gm, (match) => (match ? `<p>${match}` : match))
            }}
          />
        </div>
      </article>
    </main>
  );
}
