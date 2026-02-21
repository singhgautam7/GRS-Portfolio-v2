# GRS Portfolio v2 🚀

A modern, high-performance personal portfolio, built to showcase engineering projects, experience, and articles. It leverages the new App Router in Next.js, along with refined animations via Framer Motion, and follows Material You design principles for fluid theming.

---

## 📸 Screenshots

<!-- Screenshot Placeholders (Replace with actual image links) -->
| Light Mode | Dark Mode |
| --- | --- |
| ![Light Mode Home]() | ![Dark Mode Home]() |
| ![Projects View]() | ![Articles/Blog View]() |

---

## ✨ Features

- **Material You Dynamic Theming:** Fluidly transitions surfaces and components based on selected Light/Dark modes, "Pitch Black" true dark mode, and 5 custom accent colors.
- **Unified Command Palette (`Cmd+K`):** Keyboard-first navigation accessible from anywhere.
- **Markdown Hydration:** Fully statically generated project and blog posts managed exclusively via markdown metadata (`content/`).
- **Smooth Animations:** Integrated scroll reveals and micro-interactions utilizing Framer Motion.
- **Accessibility (a11y) First:** Semantic HTML, ARIA labels, intuitive keyboard-trapping modal navigation, and high-contrast Material tags.
- **Performant & Responsive:** Near-instant load times with Next.js Turbopack image optimization. Built mobile-first.

---

## 🛠️ Tech Stack

- **Framework**: `Next.js 15` (App Router)
- **Language**: `TypeScript`
- **Styling**: `Tailwind CSS 3` + Native CSS (`color-mix()`)
- **Animations**: `Framer Motion`
- **Icons**: `Lucide React`
- **Content Parsing**: `gray-matter` + `Zod`

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
