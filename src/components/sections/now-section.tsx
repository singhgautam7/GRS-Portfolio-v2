'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function NowSection() {
  return (
    <section id="now" className="py-section-sm">
      <div className="mx-auto max-w-content px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className="section-heading text-foreground">Now</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Last updated: February 2026 ·{' '}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:text-primary/80"
            >
              What is a &quot;now&quot; page?
            </a>
          </p>

          <div className="space-y-8">
            {[
              {
                title: 'Work',
                content: (
                  <>
                    Currently working as an {siteConfig.role} at{' '}
                    <a
                      href={siteConfig.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary transition-colors hover:text-primary/80"
                    >
                      {siteConfig.company}
                    </a>
                    , managing and maintaining infrastructure for high availability and reliability.
                    Focused on automating operations with Terraform and Kubernetes.
                  </>
                ),
              },
              {
                title: 'Building',
                content:
                  'Rebuilding my personal portfolio from the ground up with Next.js, TypeScript, and Tailwind CSS. Exploring modern web development patterns and product-grade UX.',
              },
              {
                title: 'Learning',
                content:
                  'Diving deeper into cloud-native architecture, distributed systems, and exploring AI/ML integration in web applications. Currently interested in local LLMs and browser-based AI.',
              },
              {
                title: 'Reading',
                content:
                  'Exploring system design patterns, clean architecture principles, and keeping up with the latest in Python and web technologies.',
              },
            ].map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-elevation-sm"
              >
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {section.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">{section.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
