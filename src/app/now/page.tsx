import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now',
  description: "What I'm currently working on and focused on.",
};

export default function NowPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-page px-6 pt-[150px] md:px-12 lg:px-[150px]">
      <section className="mx-auto max-w-[700px]">
        <header className="mb-12">
          <h1 className="big-heading font-semibold text-foreground">Now</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: February 2026 ·{' '}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green transition-colors hover:text-green/80"
            >
              What is a &quot;now&quot; page?
            </a>
          </p>
        </header>

        <div className="space-y-10">
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
              <span className="text-green">▹</span> Work
            </h2>
            <p className="text-muted-foreground">
              Currently working as an {siteConfig.role} at{' '}
              <a
                href={siteConfig.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green transition-colors hover:text-green/80"
              >
                {siteConfig.company}
              </a>
              , managing and maintaining infrastructure for high availability and reliability.
              Focused on automating operations with Terraform and Kubernetes.
            </p>
          </div>

          <div>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
              <span className="text-green">▹</span> Building
            </h2>
            <p className="text-muted-foreground">
              Rebuilding my personal portfolio from the ground up with Next.js, TypeScript, and
              Tailwind CSS. Exploring modern web development patterns and product-grade UX.
            </p>
          </div>

          <div>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
              <span className="text-green">▹</span> Learning
            </h2>
            <p className="text-muted-foreground">
              Diving deeper into cloud-native architecture, distributed systems, and exploring
              AI/ML integration in web applications. Currently interested in local LLMs and
              browser-based AI.
            </p>
          </div>

          <div>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
              <span className="text-green">▹</span> Reading
            </h2>
            <p className="text-muted-foreground">
              Exploring system design patterns, clean architecture principles, and keeping up with
              the latest in Python and web technologies.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
