# GRS-Portfolio-v2

A modern, zero-cost portfolio platform built with Next.js 15, TypeScript, and Tailwind CSS. Designed as a product-grade personal portfolio with dark/light themes, command palette, markdown-driven content, and recruiter-optimized sections.

## Quick Start

```bash
# Navigate to project
cd GRS-Portfolio-v2

# Install dependencies (use bun if available, otherwise npm)
bun install
# or
npm install

# Start dev server
bun run dev
# or
npm run dev

# Open http://localhost:3000
```

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Framework  | Next.js 15 (App Router)             |
| Language   | TypeScript (strict)                 |
| Styling    | Tailwind CSS                        |
| Animations | Framer Motion                       |
| Content    | Markdown + gray-matter + Zod schemas |
| Search     | Fuse.js (client-side)               |
| UI         | cmdk, Lucide icons, Radix primitives |
| Themes     | next-themes (dark/light/system)     |

## Features

- **🌗 Dark/Light Mode** — System detection + manual toggle + localStorage persistence
- **⌘K Command Palette** — Navigate anywhere with keyboard shortcuts
- **📝 Markdown Content** — Auto-detect `.md/.mdx` files in `content/`
- **🔍 Global Search** — Client-side search across all content
- **📊 Resume Page** — Timeline, skills matrix, impact metrics
- **📰 Blog** — Listing + individual post pages
- **🗃️ Archive** — Full project table
- **📍 Now Page** — What I'm currently working on
- **🎨 Animations** — Smooth scroll-triggered reveals, staggered hero

## Project Structure

```
GRS-Portfolio-v2/
├── content/               # Markdown content (auto-detected)
│   ├── jobs/              # Work experience
│   ├── projects/          # Project entries
│   ├── featured/          # Featured projects
│   └── posts/             # Blog posts
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── page.tsx       # Home (hero, about, experience, projects, contact)
│   │   ├── blog/          # Blog listing + [slug] post pages
│   │   ├── archive/       # Projects archive table
│   │   ├── resume/        # Resume with timeline & skills
│   │   └── now/           # "Now" page
│   ├── components/        # React components
│   │   ├── navbar.tsx     # Scroll-aware responsive navbar
│   │   ├── command-palette.tsx  # ⌘K command palette
│   │   ├── theme-toggle.tsx     # Dark/light/system toggle
│   │   └── sections/      # Home page sections
│   └── lib/
│       ├── config.ts      # Site configuration
│       ├── content.ts     # Markdown content system with Zod
│       └── utils.ts       # Utility functions
├── tailwind.config.ts     # Design system tokens
└── package.json
```

## Adding Content

Drop new `.md` files into the appropriate `content/` subdirectory:

**Jobs**: `content/jobs/CompanyName/index.md`
**Projects**: `content/projects/ProjectName.md`
**Featured**: `content/featured/ProjectName/index.md`
**Posts**: `content/posts/post-slug/index.md`

Files are auto-detected — no config changes needed.

## Deployment

```bash
bun run build    # Build for production
bun run start    # Start production server
```

Deployable to Vercel, Cloudflare Pages, or any static hosting.

## Design Reference

Color palette and aesthetic inspired by the original [GRS-portfolio](https://www.singhgautam.com/):
- Dark navy/black backgrounds
- Green accent (#64ffda)
- Slate/muted text hierarchy
- Minimal, content-first design
