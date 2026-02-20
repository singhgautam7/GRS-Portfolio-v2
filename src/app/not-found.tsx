'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="big-heading font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl text-muted-foreground">Page Not Found</h2>
        <p className="mt-2 text-muted-foreground/70">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded border border-green px-7 py-3 font-mono text-sm text-green transition-all hover:bg-green-tint"
        >
          Go Home
        </Link>
      </motion.div>
    </main>
  );
}
