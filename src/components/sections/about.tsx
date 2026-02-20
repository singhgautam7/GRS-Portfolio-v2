'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { siteConfig } from '@/lib/config';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const technologies = [
    'Python',
    'TypeScript',
    'JavaScript',
    'Django',
    'React',
    'Next.js',
    'GCP',
    'Terraform',
    'Docker',
    'Kubernetes',
    'PostgreSQL',
    'Redis',
  ];

  return (
    <section id="about" className="mx-auto max-w-content py-24 md:py-32" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
      >
        <h2 className="numbered-heading font-semibold text-foreground">About Me</h2>

        <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
          <div className="space-y-4 text-muted-foreground">
            <p>
              Hello! My name is {siteConfig.name}, and I enjoy building things that live on the
              internet. My interest in software development started during my college years, and
              since then I&apos;ve had the privilege of working at various tech companies.
            </p>

            <p>
              I&apos;m currently working as an {siteConfig.role} at{' '}
              <a
                href={siteConfig.companyUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary transition-colors hover:text-primary/80"
              >
                {siteConfig.company}
              </a>
              , where I manage and maintain infrastructure for high availability and reliability.
            </p>

            <p>
              My expertise lies in Python-based web development, cloud infrastructure, and building
              scalable, maintainable applications. I&apos;m constantly exploring new technologies and
              finding ways to solve real-world problems through code.
            </p>

            <p>Here are a few technologies I&apos;ve been working with recently:</p>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-xs sm:grid-cols-3">
              {technologies.map((tech) => (
                <li key={tech} className="relative pl-5 text-muted-foreground before:absolute before:left-0 before:text-primary before:content-['▹']">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[300px]">
            <div className="group relative">
              <div className="relative z-10 overflow-hidden rounded bg-primary/20">
                <div className="aspect-square w-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
                  {/* Placeholder avatar - can be replaced with actual image */}
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-mono text-6xl text-primary/40">GS</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary/10 transition-opacity group-hover:opacity-0" />
              </div>
              <div className="absolute -bottom-3 -right-3 -z-0 h-full w-full rounded border-2 border-primary transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
