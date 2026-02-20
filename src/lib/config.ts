export const siteConfig = {
    name: 'Gautam Singh',
    title: "Gautam's Portfolio",
    description:
        'Gautam Singh is a software engineer who specializes in Python and developing web apps.',
    siteUrl: 'https://www.singhgautam.com',
    email: 'gautamsingh1997@gmail.com',
    role: 'Engineer II',
    company: 'Hashicorp | An IBM Company',
    companyUrl: 'https://www.hashicorp.com/',
    location: 'Bangalore, India',
    bio: "I'm a software engineer specializing in building web applications, with an expertise in Python.",
    resumeUrl:
        'https://github.com/singhgautam7/singhgautam7/raw/main/assets/GRS_resume.docx',
    githubUsername: 'singhgautam7',

    socialLinks: [
        {
            name: 'GitHub',
            url: 'https://github.com/singhgautam7',
            icon: 'Github',
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/singhgautam7',
            icon: 'Linkedin',
        },
        {
            name: 'Medium',
            url: 'https://medium.com/@singhgautam7',
            icon: 'BookOpen',
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/singhgautam7',
            icon: 'Instagram',
        },
        {
            name: 'YouTube',
            url: 'https://www.youtube.com/watch?v=g0OA1Le593c',
            icon: 'Youtube',
        },
    ],

    navLinks: [
        { name: 'About', url: '/#about' },
        { name: 'Experience', url: '/#jobs' },
        { name: 'Work', url: '/#projects' },
        { name: 'Blog', url: '/blog' },
        { name: 'Contact', url: '/#contact' },
    ],

    skills: {
        languages: ['Python', 'TypeScript', 'JavaScript', 'Go', 'SQL'],
        frameworks: ['Django', 'Flask', 'React', 'Next.js', 'FastAPI'],
        cloud: ['GCP', 'AWS', 'Terraform', 'Kubernetes', 'Docker'],
        tools: ['Git', 'CI/CD', 'Datadog', 'PostgreSQL', 'Redis'],
    },
} as const;

export type SiteConfig = typeof siteConfig;
