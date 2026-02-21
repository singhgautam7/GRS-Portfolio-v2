import { getPosts, getPost } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { TableOfContents } from '@/components/table-of-contents';
import { siteConfig } from '@/lib/config';
import { TechTag } from '@/components/ui/tech-tag';
import { MDXPre } from '@/components/ui/mdx-pre';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

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
    title: `${post.title} - ${siteConfig.name}`,
    description: post.tldr || post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const dateObj = new Date(post.date);
  const dateDisplay = isNaN(dateObj.getTime())
    ? post.date
    : dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  const getText = (node: any): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return node.toString();
    if (Array.isArray(node)) return node.map(getText).join('');
    if (node && node.props && node.props.children) return getText(node.props.children);
    return '';
  };

  const mdxComponents = {
    h2: (props: any) => {
      const text = getText(props.children);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return <h2 id={id} className="scroll-mt-24 group flex items-center" {...props} />;
    },
    h3: (props: any) => {
      const text = getText(props.children);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return <h3 id={id} className="scroll-mt-24 group flex items-center" {...props} />;
    },
    a: (props: any) => (
      <a {...props} target={props.href?.startsWith('http') ? '_blank' : undefined} rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-primary hover:underline underline-offset-4 decoration-primary/50" />
    ),
    table: (props: any) => (
      <div className="my-8 w-full overflow-x-auto rounded-xl border border-border/60 bg-card/20 shadow-sm">
        <table className="w-full text-sm text-left m-0 border-collapse" {...props} />
      </div>
    ),
    th: (props: any) => <th className="bg-muted/50 px-4 py-3.5 first:pl-6 font-semibold text-foreground border-b border-border/60 text-left whitespace-nowrap" {...props} />,
    td: (props: any) => <td className="px-4 py-3.5 first:pl-6 border-b border-border/40 last:border-0 align-top leading-relaxed text-muted-foreground" {...props} />,
    pre: MDXPre,
  };

  const mdxOptions: MDXRemoteProps['options'] = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [rehypePrettyCode, { theme: 'github-dark' }]
      ],
    },
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-32">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 flex flex-row justify-center relative items-start gap-12 xl:gap-24">

        {/* Sticky Table of Contents Component (Hidden on mobile via component styles) */}
        <TableOfContents content={post.content} />

        <article className="w-full max-w-[850px] min-w-0">
          <Link
            href="/posts"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back to all posts
          </Link>

          <header className="mb-10">
            <h1 className="mb-4 text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-foreground">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-muted-foreground/80">
              <time className="flex items-center gap-1.5 bg-secondary px-2.5 py-1 rounded-md border border-border/50">
                {dateDisplay}
              </time>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readingTime}
              </span>
              {post.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-3 sm:mt-0">
                   <span className="hidden sm:inline-block text-border mx-1">•</span>
                  {post.tags.map((tag) => (
                    <TechTag key={tag}>{tag}</TechTag>
                  ))}
                </div>
              )}
            </div>
          </header>

          {post.tldr && (
            <div className="mb-12 rounded-xl border-l-[3px] border-primary bg-card/60 p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">
                TLDR
              </h3>
              <p className="text-base text-foreground/90 leading-relaxed font-medium">
                {post.tldr}
              </p>
            </div>
          )}

          <div className="prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl prose-li:marker:text-primary">
            <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
          </div>
        </article>

      </div>
    </main>
  );
}
