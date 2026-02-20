'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteConfig } from '@/lib/config';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="mx-auto max-w-[600px] py-24 text-center md:py-32" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
      >
        <p className="mb-4 font-mono text-base text-green">04. What&apos;s Next?</p>
        <h2 className="medium-heading mb-5 font-semibold text-foreground">Get In Touch</h2>
        <p className="mb-12 text-muted-foreground">
          I&apos;m currently looking for new opportunities. Whether you have a question or just want
          to say hi, my inbox is always open. I&apos;ll try my best to get back to you!
        </p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="rounded border border-green px-7 py-4 font-mono text-sm text-green transition-all hover:bg-green-tint"
        >
          Say Hello
        </a>
      </motion.div>
    </section>
  );
}
