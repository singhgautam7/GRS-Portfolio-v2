'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowDown, ArrowUp, X } from 'lucide-react';
import Link from 'next/link';
import { Post } from '@/lib/content';
import { TechTag } from '@/components/ui/tech-tag';

interface PostsClientProps {
  posts: Post[];
}

export default function PostsClient({ posts }: PostsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const matchesSearch =
          searchQuery === '' ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tldr?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.every((tag) => post.tags?.includes(tag));

        return matchesSearch && matchesTags;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [posts, searchQuery, selectedTags, sortOrder]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="mx-auto max-w-content px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="mb-8 inline-block text-sm font-mono text-muted-foreground hover:text-primary transition-colors hover:-translate-x-1 duration-200"
          >
            ← Back to Home
          </Link>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            All Posts
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px]">
            Technical writing, tutorials, case studies, and engineering thoughts.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="mb-10 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-card/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-card/50 border border-border/50 rounded-xl hover:bg-card text-foreground transition-colors shrink-0"
            >
              <SlidersHorizontal size={16} className="text-muted-foreground" />
              <span>{sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
              {sortOrder === 'newest' ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
            </button>
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                      isSelected
                        ? 'bg-primary/20 border-primary/50 text-primary'
                        : 'bg-card/50 border-border/50 text-muted-foreground hover:bg-card hover:text-foreground hover:border-primary/30'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Posts Grid */}
        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, i) => {
                const dateObj = new Date(post.date);
                const dateDisplay = isNaN(dateObj.getTime())
                  ? post.date
                  : dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={post.slug}
                    className="group"
                  >
                    <Link
                      href={`/posts/${post.slug}`}
                      className="block p-6 rounded-2xl border border-border/40 bg-card/30 hover:bg-card/60 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags?.map((tag) => (
                          <span key={tag} className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h2>
                      {post.tldr && (
                        <p className="text-muted-foreground line-clamp-2 mb-4">
                          {post.tldr}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground/80">
                        <span>{dateDisplay}</span>
                        {post.readingTime && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span>{post.readingTime}</span>
                          </>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center border border-dashed border-border/50 rounded-2xl"
              >
                <div className="inline-flex w-12 h-12 rounded-full bg-card items-center justify-center mb-4">
                  <Search size={20} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground">No posts found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your search or filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTags([]);
                  }}
                  className="mt-6 text-sm font-medium text-primary hover:underline hover:underline-offset-4"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
