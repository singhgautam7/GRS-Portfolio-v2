import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now',
  description: "What I'm currently working on and focused on.",
};

export default function NowPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-page px-6 pt-[120px] pb-section lg:px-12">
      <section className="mx-auto max-w-[680px]">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Now</h1>
          <p className="mt-3 text-sm text-muted-foreground">
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
        </header>

        <div className="space-y-10">
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
          ].map((section) => (
            <div key={section.title}>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {section.title}
              </h2>
              <p className="leading-relaxed text-muted-foreground">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
