'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';

export function ContactSection() {
  return (
    <section id="contact" className="py-section">
      <div className="mx-auto max-w-content px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 font-mono text-sm text-primary">What&apos;s Next?</p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] text-muted-foreground">
            I&apos;m always open to new opportunities and interesting conversations.
            Whether you have a question or just want to say hi, my inbox is always open.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-8 inline-block rounded-2xl bg-primary px-8 py-3 font-mono text-sm text-primary-foreground transition-all hover:opacity-90"
          >
            Say Hello
          </a>
        </motion.div>
      </div>
    </section>
  );
}
