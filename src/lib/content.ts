import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const contentDirectory = path.join(process.cwd(), 'content');

// Zod schemas for type-safe frontmatter
export const JobSchema = z.object({
    date: z.coerce.string(),
    title: z.string(),
    company: z.string(),
    location: z.string().optional(),
    range: z.string(),
    url: z.string().url(),
});

export const ProjectSchema = z.object({
    date: z.coerce.string(),
    title: z.string(),
    github: z.string().optional(),
    external: z.string().optional(),
    company: z.string().optional(),
    showInProjects: z.boolean().optional().default(true),
    tech: z.array(z.string()).default([]),
    domain: z.string().optional(),
    impact: z.string().optional(),
    type: z.string().optional(),
});



export const PostSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.string(),
    draft: z.boolean().optional().default(false),
    slug: z.string().optional(),
    tags: z.array(z.string()).default([]),
});

export type Job = z.infer<typeof JobSchema> & { content: string; slug: string };
export type Project = z.infer<typeof ProjectSchema> & { content: string; slug: string };

export type Post = z.infer<typeof PostSchema> & { content: string; slug: string; readingTime: string };

function getFilesRecursively(dir: string): string[] {
    if (!fs.existsSync(dir)) return [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files: string[] = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...getFilesRecursively(fullPath));
        } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
            files.push(fullPath);
        }
    }
    return files;
}

function parseFile<T>(filePath: string, schema: z.ZodType<T>): (T & { content: string; slug: string }) | null {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        const parsed = schema.safeParse(data);
        if (!parsed.success) {
            console.warn(`Warning: Invalid frontmatter in ${filePath}:`, parsed.error.message);
            return null;
        }
        const slug = path.basename(filePath, path.extname(filePath));
        const dirName = path.basename(path.dirname(filePath));
        const finalSlug = slug === 'index' ? dirName : slug;
        return { ...parsed.data, content, slug: finalSlug };
    } catch (error) {
        console.warn(`Warning: Failed to parse ${filePath}:`, error);
        return null;
    }
}

function estimateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

export function getJobs(): Job[] {
    const dir = path.join(contentDirectory, 'jobs');
    const files = getFilesRecursively(dir);
    const jobs = files
        .map((f) => parseFile(f, JobSchema))
        .filter((j): j is NonNullable<typeof j> => j !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return jobs as Job[];
}

export function getProjects(): Project[] {
    const dir = path.join(contentDirectory, 'projects');
    const files = getFilesRecursively(dir);
    const projects = files
        .map((f) => parseFile(f, ProjectSchema))
        .filter((p): p is NonNullable<typeof p> => p !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return projects as Project[];
}



export function getPosts(): Post[] {
    const dir = path.join(contentDirectory, 'posts');
    const files = getFilesRecursively(dir);
    const posts = files
        .map((f) => {
            const parsed = parseFile(f, PostSchema);
            if (!parsed) return null;
            // Use frontmatter slug if provided, otherwise use the file-derived slug
            const finalSlug = (parsed as Record<string, unknown>).slug || parsed.slug;
            return {
                ...parsed,
                readingTime: estimateReadingTime(parsed.content),
                slug: finalSlug,
            };
        })
        .filter((p): p is NonNullable<typeof p> => p !== null)
        .filter((p) => !p.draft)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return posts as Post[];
}

export function getPost(slug: string): Post | undefined {
    const posts = getPosts();
    return posts.find((p) => p.slug === slug);
}

export function getAllContent() {
    return {
        jobs: getJobs(),
        projects: getProjects(),

        posts: getPosts(),
    };
}

export function getSearchIndex() {
    const { jobs, projects, posts } = getAllContent();
    return [
        ...jobs.map((j) => ({
            type: 'job' as const,
            title: j.title,
            company: j.company,
            content: j.content,
            slug: j.slug,
            tags: [] as string[],
        })),
        ...projects.map((p) => ({
            type: 'project' as const,
            title: p.title,
            company: p.company || '',
            content: p.content,
            slug: p.slug,
            tags: p.tech,
        })),

        ...posts.map((p) => ({
            type: 'post' as const,
            title: p.title,
            company: '',
            content: p.content,
            slug: p.slug,
            tags: p.tags,
        })),
    ];
}
