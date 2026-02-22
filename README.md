# GRS Portfolio v2 🚀

A modern, high-performance personal portfolio, built to showcase engineering projects, experience, and articles. It leverages the new App Router in Next.js, along with refined animations via Framer Motion, and follows Material You design principles for fluid theming.

---

## ✨ Features

- **Next.js 15 & React 19:** Built on the latest App Router with Turbopack for near-instant load times and optimized performance.
- **FAANG-Level UI Design:** Premium, highly responsive interface featuring subtle Glass UI effects, precise typography, and fluid micro-interactions using Framer Motion.
- **Material You Dynamic Theming:** Fluidly transitions surfaces and components based on selected Light/Dark modes, an OLED-optimized "Pitch Black" mode, and multiple custom accent colors (Google Blue, Cyan Tech, Solar Gold, Deep Indigo, Neo Mint, Warm Coral) persisted via localStorage.
- **Unified Command Palette (`Cmd+K`):** Built-in Spotlight-style search and quick-action menu for seamless keyboard-first navigation across the entire portfolio.
- **Intelligent SPA Navigation & Scroll Syncing:** Uses Intersection Observers and `history.replaceState` to seamlessly update the URL hash (`/#about`, `/#projects`) as you scroll, without forcing full page reloads.
- **Career Narrative Timeline:** A dynamically generated chronological vertical spine mapping heterogeneous markdown sources (`jobs/`, `projects/`, `certifications/`) into an interactive professional history.
- **Decoupled "Now" Page:** The present-day status section is powered entirely by a single markdown file (`content/now/index.md`), mapping identically into the Timeline's final node and the Homepage's bottom section.
- **Custom Markdown Blogging Engine:**
  - Fully statically generated `posts/` archive with multi-dimensional text search, tag filtering, and chronological sorting.
  - Individual `/posts/[slug]` templates powered by `next-mdx-remote/rsc` and GitHub-flavored markdown.
  - Native `rehype-pretty-code` integrations for beautiful code block syntax highlighting and line numbers.
  - Sticky left-rail Table of Contents scroll-spy component.
  - Markdown typography (bullets, blockquotes, tags) that natively syncs to the active Material-You accent color.
- **Dynamic Projects Favorites:** Users can "star" specific projects from the full archive to pin them dynamically to the Homepage's "Selected Projects" grid using localStorage sync.
- **Accessibility (a11y) First:** Semantic HTML, ARIA labels, intuitive keyboard-trapping modal navigation, and high-contrast Material tags.

---

## 🛠️ Tech Stack

- **Framework**: `Next.js 15` (App Router) + `React 19`
- **Language**: `TypeScript`
- **Styling**: `Tailwind CSS 4` + Native CSS (`color-mix()`, `hsl()`)
- **Animations**: `Framer Motion`
- **Icons**: `Lucide React`
- **Markdown Parsing**: `next-mdx-remote`, `gray-matter`, `Zod`
- **Syntax Highlighting**: `rehype-pretty-code`, `remark-gfm`

---

## 💻 Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/singhgautam7/GRS-Portfolio-v2.git
   cd GRS-Portfolio-v2
   ```

2. **Install core dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) (or whatever port Next.js automatically assigns).

---

## 📝 Content Management

To add new Jobs, Projects, Featured Items, or Blog posts, simply drop a new `.md` file into the `/content` directory following the respective Zod schema frontmatter format:

```markdown
---
date: 2026-02-15
title: "Project Title"
tech: ["React", "Typescript"]
---
Body content...
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
Created and maintained by **Gautam Singh**.
