import type { Experience, Education, ContactInfo, Project } from '@/types'

export const contactInfo: ContactInfo = {
  name: 'Eli Nicholson',
  email: 'eli.m.nicholson@gmail.com',
  phone: '(425) 246-8863',
  linkedin: 'https://www.linkedin.com/in/eli-nicholson/',
  github: 'https://github.com/elinicholson',
  website: 'https://elinicholson.dev',
  location: 'Seattle, WA'
}

export const summary = 'Software Developer with 5+ years of experience designing and modernizing internal tools, streamlining cross-departmental workflows, and rebuilding enterprise websites from the ground up. Skilled in revitalizing legacy codebases and delivering scalable, user-focused solutions that foster collaboration and efficiency. Experienced across fintech startups, digital marketing, consulting, and manufacturing, bringing versatile technical expertise and a passion for creating tools that connect people and drive organizational growth.'

export const skills: string[] = [
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'React.js',
  'Node.js',
  'REST',
  'GraphQL',
  'PostgreSQL',
  'MongoDB',
  'AWS',
  'Azure',
  'Docker',
  'Kubernetes',
  'Jenkins',
  'TDD',
  'Event Sourcing',
  'AI Tooling',
  'Airtable',
  'Retool'
]

export const experiences: Experience[] = [
  {
    title: 'Software Developer II',
    company: 'Logical Position',
    location: 'Lake Oswego, OR (Remote)',
    startDate: '12/2022',
    endDate: '06/2025',
    responsibilities: [
      'Enhanced a full-stack internal tool using Vue.js and Node.js for Email Marketing and SEO teams, improving operational efficiency by an estimated 15%',
      'Built a batch CSV import/export system that processed 1,000+ records daily, reducing manual entry time by 5+ hours per week',
      'Automated critical leadership reports using SQL and Node.js scripts, delivering key business metrics 2x faster',
      'Provided technical support and partnered with end-users to deliver 3 major feature enhancements, maintaining 99.9% tool uptime'
    ]
  },
  {
    title: 'Software Developer',
    company: 'Ship Shape Consulting',
    location: 'Middleburg, VA (Remote)',
    startDate: '08/2022',
    endDate: '10/2022',
    responsibilities: [
      'Scaffolded core UI components for a React Native co-working space management app',
      'Short-term engagement due to client needs'
    ]
  },
  {
    title: 'Software Engineer',
    company: 'Allocations',
    location: 'Miami, FL (Remote)',
    startDate: '05/2021',
    endDate: '03/2022',
    responsibilities: [
      'Deployed an internal micro-frontend platform using React, GraphQL, and Module Federation, reducing engineering tickets by 25%',
      'Partnered with the accounting team to build automated reporting tools using PostgreSQL, Retool and Airtable, cutting monthly report generation time from 2 days to 1 hour',
      'Built granular, privilege-based access controls for the user management system using TypeScript, Next.js, and MongoDB'
    ]
  },
  {
    title: 'Software Developer',
    company: 'Rightline Equipment Inc.',
    location: 'Vancouver, WA (Remote)',
    startDate: '09/2019',
    endDate: '05/2021',
    responsibilities: [
      'Built a full-stack internal reporting tool using React, Node.js, and MySQL, providing sales and inventory insights that improved analysis efficiency by 15%',
      'Developed a Google Maps API-based dealer locator and lead capture forms using Django and Python, increasing qualified sales leads by 20%',
      'Migrated legacy deployment pipelines to a modern CI/CD infrastructure using Jenkins, Docker, and Kubernetes, reducing deployment times by 25%'
    ]
  }
]

export const education: Education[] = [
  {
    degree: 'Full Stack JavaScript Development',
    institution: 'Alchemy Code Lab',
    location: 'Portland, OR',
    startDate: '2019',
    endDate: '2019'
  }
]

export const projects: Project[] = [
  {
    title: 'TofuRPG',
    description: 'Full-stack tabletop RPG management system enabling players and game masters to create characters, manage campaigns, roll dice with real-time updates, and track game sessions. Features comprehensive character creation with class-specific rules, inventory management, power/perk systems, and live collaborative gameplay tools.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Hono', 'PostgreSQL', 'Railway', 'SSE'],
    liveLink: 'https://tofurpg.com',
    screenshots: [
      '/tofurpg/tofurpg-screenshot-1.png',
      '/tofurpg/tofurpg-screenshot-2.png',
      '/tofurpg/tofurpg-screenshot-3.png'
    ]
    // githubLink omitted - private repo or not available
  }
]
