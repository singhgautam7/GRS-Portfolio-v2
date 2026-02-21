import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const contentDirectory = path.join(process.cwd(), 'content');

// Unified Schema for anything that wants to appear on the timeline
export const TimelineFrontmatterSchema = z.object({
    timeline: z.boolean().optional(),
    title: z.string().optional(),
    type: z.string().optional(),

    // Date variations
    date: z.coerce.string().optional(),
    date_start: z.coerce.string().optional(),
    date_end: z.coerce.string().optional(),

    // Pointers/Highlights
    timeline_pointers: z.array(z.string()).optional(),

    // Optional Links
    github_url: z.string().url().optional(),
    live_url: z.string().url().optional(),
    case_study_url: z.string().url().optional(),

    // Aliases for links to match existing project schemas
    github: z.string().url().optional(),
    external: z.string().url().optional(),

    // For specific types
    company: z.string().optional(),
    issuer: z.string().optional(),
    tech: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
});

export const NowSectionSchema = z.object({
    last_updated: z.string(),
    sections: z.array(z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()).default([]),
    }))
});

export type NowContent = z.infer<typeof NowSectionSchema>;

export type TimelineEntry = {
    id: string; // generated slug
    type: 'job' | 'project' | 'certification' | 'post';
    title: string;
    organization?: string; // mapped from company or issuer

    sortDate: Date; // Normalized date for sorting purposes
    displayDate: string; // The formatted string to show on the UI

    content?: string; // Text body excerpt
    pointers?: string[]; // Array of impact bullets

    techTags: string[]; // mapped from tech or tags

    githubUrl?: string;
    liveUrl?: string;
    caseStudyUrl?: string;
};

// --- Helpers ---

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

function parseDateStr(dateStr: string): Date {
    if (dateStr.toLowerCase() === 'present') return new Date();
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) {
        // Attempt fallback parsing for partial dates like YYYY-MM
        const parts = dateStr.split('-');
        if (parts.length === 2) return new Date(`${dateStr}-01`);
        if (parts.length === 1) return new Date(`${dateStr}-01-01`);
        return new Date(0); // Epoch if completely unparseable
    }
    return parsed;
}

function formatDateDisplay(data: Record<string, any>, defaultDate: string): string {
    // If a predefined range exists (like in existing jobs schema), use it.
    if (data.range) return data.range;

    const start = data.date_start ? new Date(data.date_start) : null;
    const endStr = data.date_end;

    if (start && endStr) {
        const startDateForm = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const endDateForm = endStr.toLowerCase() === 'present'
            ? 'Present'
            : new Date(endStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        return `${startDateForm} - ${endDateForm}`;
    }

    // Fallback to basic date
    const d = new Date(defaultDate);
    if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    return defaultDate; // return raw if parsing utterly failed
}

// --- Main Parser ---

export function getNowContent(): NowContent | null {
    const filePath = path.join(contentDirectory, 'now', 'index.md');
    if (!fs.existsSync(filePath)) return null;

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);
        const parsed = NowSectionSchema.safeParse(data);
        if (!parsed.success) {
            console.warn('Failed to parse now section data:', parsed.error);
            return null;
        }
        return parsed.data;
    } catch (e) {
        console.error('Failed to read or parse now content:', e);
        return null;
    }
}

export function getTimelineEntries(): TimelineEntry[] {
    const allFiles = getFilesRecursively(contentDirectory);
    const entries: TimelineEntry[] = [];

    for (const filePath of allFiles) {
        // Skip the now content itself
        if (filePath.includes('/now/')) continue;

        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data, content } = matter(fileContent);

            const parsed = TimelineFrontmatterSchema.safeParse(data);

            // Core Logic: Include if explicitly `timeline: true` OR if it's from `content/projects`
            const isProjectFile = filePath.includes('/projects/');
            const passesTimelineCriteria = parsed.success && parsed.data.timeline;

            if (!passesTimelineCriteria && !isProjectFile) {
                continue;
            }

            // If it failed parsing but it's a project, fallback to generic parsing
            const pData = parsed.success ? parsed.data : data;

            // Determine proper logical type
            let type: TimelineEntry['type'] = 'project'; // default
            if (filePath.includes('/jobs/')) type = 'job';
            else if (filePath.includes('/certifications/')) type = 'certification';
            else if (filePath.includes('/posts/')) type = 'post';
            else if (pData.type && ['job', 'project', 'certification', 'post'].includes(pData.type?.toLowerCase())) {
                type = pData.type.toLowerCase() as TimelineEntry['type'];
            }

            // Determine exact date for sorting
            // priority: date_end -> date_start -> date
            let sortDateStr = pData.date_end || pData.date_start || pData.date;
            if (!sortDateStr) {
                // Look for existing 'date' if unmapped by zod coerce
                sortDateStr = data.date;
                if (!sortDateStr) continue; // Skip timeline entries with absolutely no date
            }

            const sortDate = parseDateStr(sortDateStr);

            const slug = path.basename(filePath, path.extname(filePath));
            const dirName = path.basename(path.dirname(filePath));
            const id = slug === 'index' ? dirName : slug;

            entries.push({
                id,
                type,
                title: pData.title || data.title || id,
                organization: pData.company || pData.issuer || data.company,
                sortDate,
                displayDate: formatDateDisplay(data, sortDateStr),
                content: content.trim(),
                pointers: pData.timeline_pointers,
                techTags: pData.tech || pData.tags || data.tech || [],
                githubUrl: pData.github_url || pData.github || data.github,
                liveUrl: pData.live_url || pData.external || data.external,
                caseStudyUrl: pData.case_study_url,
            });

        } catch (e) {
            console.warn(`Failed to parse timeline entry for ${filePath}`, e);
        }
    }

    // Sort Ascending: Oldest first, Newest last.
    return entries.sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime());
}
