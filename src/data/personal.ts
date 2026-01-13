import type { Experience, Education, ContactInfo, Project } from '@/types'

export const contactInfo: ContactInfo = {
  name: 'Eli Nicholson',
  email: 'eli.m.nicholson@gmail.com',
  linkedin: 'https://www.linkedin.com/in/eli-nicholson/',
  location: 'Greater Seattle, WA'
}

export const summary = 'As a seasoned Software Developer, I thrive on bringing people together by developing the most effective tools for their needs. Over the past five years, I have primarily focused on creating internal tools for various departments, modernizing outdated codebases, and reconstructing the company website from the ground up. This diverse range of tasks keeps me engaged and continually encourages my growth, helping me to appreciate how interconnected everything we create truly is.'

export const skills: string[] = [
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'REST',
  'Node.js',
  'React',
  'CSS',
  'GraphQL',
  'SQL',
  'AWS',
  'Docker',
  'AI Tooling'
]

export const experiences: Experience[] = [
  {
    title: 'Software Developer II',
    company: 'Logical position',
    location: 'Location',
    startDate: '12/2022',
    endDate: '06/2025',
    responsibilities: [
      'Developed and enhanced an internal tool for the Email Marketing and SEO departments, streamlining strategy planning and increasing operational efficiency',
      'Designed and implemented batch CSV import/export features to facilitate seamless data transfer and reporting processes',
      'Provided technical support and troubleshooting for the internal tool, ensuring minimal downtime and smooth user experience',
      'Created and maintained scripts to generate reports for leadership, enabling data-driven decision-making',
      'Collaborated with cross-functional teams to identify system improvements and deliver tailored solutions'
    ]
  },
  {
    title: 'Software Engineer',
    company: 'Ship shape consulting',
    location: 'Location',
    startDate: '08/2022',
    endDate: '10/2022',
    responsibilities: [
      'Leveraged React Native to build a visual scaffolding for a co-working space management app',
      'Worked to close, resolve and nudge existing open issues on managed open-source software'
    ]
  },
  {
    title: 'Software Engineer',
    company: 'Allocations',
    location: 'Location',
    startDate: '05/2021',
    endDate: '03/2022',
    responsibilities: [
      'Deployed and maintained an internal tooling domain built with React, GraphQL and Module Federation to allow for individual teams to spin up micro frontends that are quickly accessible',
      'Interfaced with the accounting team to build monthly and quarterly reporting tools, built with React, PostgreSQL, Retool, Airtable',
      'Began adapting our user management system to allow for more privilege based depth for use with the product and internal tooling leveraging Typescript, Next.js, and MongoDB'
    ]
  },
  {
    title: 'Software Developer',
    company: 'Rightline inc',
    location: 'Location',
    startDate: '09/2019',
    endDate: '05/2021',
    responsibilities: [
      'Developed an internal reporting tool, using React with hooks, Node.js, Express, and MySQL',
      'Assisted in rebuilding a company website making use of Django Rest Framework, Python, MySQL, MongoDB, HTML, SCSS, Google Maps API: Having primarily built the Dealer Locator and most of the form submissions(warranty, returns, support, etc.)',
      'By utilizing Jenkins, Docker-Compose, and Kubernetes migrated deployment pipelines and development environments for a handful of legacy internal tools built over the last 20 yrs'
    ]
  }
]

export const education: Education[] = [
  {
    degree: '800+ hours of education in Full Stack JavaScript Development',
    institution: 'Alchemy Code Lab',
    location: 'Portland, OR',
    startDate: '04/2019',
    endDate: '09/2019'
  }
]

export const projects: Project[] = [
  {
    title: 'TofuRPG',
    description: 'A tabletop RPG character management system built to streamline character creation and gameplay. Features include character sheet management, dice rolling mechanics, and campaign organization tools.',
    techStack: ['Vue.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL'],
    liveLink: 'https://tofurpg.com',
    screenshots: [
      '/tofurpg-screenshot-1.png',
      '/tofurpg-screenshot-2.png',
      '/tofurpg-screenshot-3.png'
      // Add up to 5 screenshots total
    ]
    // githubLink omitted - private repo or not available
  }
]
