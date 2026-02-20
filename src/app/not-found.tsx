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
        <h1 className="text-7xl font-bold text-foreground sm:text-8xl">404</h1>
        <h2 className="mt-4 text-xl text-muted-foreground">Page Not Found</h2>
        <p className="mt-2 text-muted-foreground/70">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg border border-primary/30 bg-emerald-tint px-7 py-3 font-mono text-sm text-primary transition-all hover:border-primary/60 hover:shadow-[0_0_16px_rgba(0,255,179,0.1)]"
        >
          Go Home
        </Link>
      </motion.div>
    </main>
  );
}
