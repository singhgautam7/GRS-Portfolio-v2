const startYear = 2019;
const startMonth = 0; // January
const currentDate = new Date();
const diffInMonths = (currentDate.getFullYear() - startYear) * 12 + currentDate.getMonth() - startMonth;
const rawYears = diffInMonths / 12;
// Round to nearest 0.5
export const YEARS_OF_EXPERIENCE = Math.round(rawYears * 2) / 2;

export const siteConfig = {
    name: 'Gautam Singh',
    title: "Gautam says Hello 👋",
    description:
        'Gautam Singh is a backend & infrastructure engineer building scalable systems, cloud-native architectures, and developer-focused tooling.',
    siteUrl: 'https://www.singhgautam.com',
    email: 'gautamsingh1997@gmail.com',
    role: 'Senior Software Engineer',
    roleDetail: 'AI Systems & Full-Stack Platforms',
    company: 'Hashicorp | An IBM Company',
    companyUrl: 'https://www.hashicorp.com/',
    location: 'Bangalore, India',
    bio: 'Building scalable systems, cloud-native architectures, and developer-focused tooling.',
    summary:
        `I'm a software engineer with ${YEARS_OF_EXPERIENCE}+ years of experience specializing in backend development, cloud infrastructure, and building scalable systems. Currently at Hashicorp (IBM), I manage and maintain HVD clusters for high availability, automate operations with Terraform and Kubernetes, and build developer tooling that drives efficiency across teams.`,
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
        { name: 'About', url: '/about' },
        { name: 'Experience', url: '/experience' },
        { name: 'Projects', url: '/projects' },
        { name: 'Contact', url: '/contact' },
        { name: 'Blog', url: '/blogs' },
    ],

    heroChips: ['Python', 'Go', 'Cloud', 'Systems', 'APIs', 'Infrastructure'],

    skills: {
        backend: ['Django', 'Flask', 'Go (Golang)', 'Python'],
        frontend: ['Next.js', 'React', 'Redux Toolkit'],
        devops_cloud: ['AWS', 'Docker', 'GCP', 'Kubernetes', 'Terraform'],
        databases: ['Firestore', 'MongoDB', 'Redis', 'SQL'],
    },
} as const;

export type SiteConfig = typeof siteConfig;
