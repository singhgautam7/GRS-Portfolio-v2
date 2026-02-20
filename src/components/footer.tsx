import { siteConfig } from '@/lib/config';
import { Github, Linkedin, BookOpen, Instagram, Youtube } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Github,
  Linkedin,
  BookOpen,
  Instagram,
  Youtube,
};

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 py-6 text-center font-mono text-xs text-muted-foreground">
      {/* Mobile social links */}
      <div className="flex items-center gap-5 md:hidden">
        {siteConfig.socialLinks.map((link) => {
          const Icon = iconMap[link.icon];
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-green"
              aria-label={link.name}
            >
              {Icon && <Icon size={20} />}
            </a>
          );
        })}
      </div>

      <a
        href={`https://github.com/${siteConfig.githubUsername}`}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-green"
      >
        <p>Built by {siteConfig.name}</p>
      </a>
    </footer>
  );
}
