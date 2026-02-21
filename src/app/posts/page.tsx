import { getPosts } from '@/lib/content';
import PostsClient from './page-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts | Gautam Singh',
  description: 'Technical writing, tutorials, and case studies.',
};

export default function PostsPage() {
  const posts = getPosts();
  return <PostsClient posts={posts} />;
}
