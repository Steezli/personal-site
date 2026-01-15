export interface Experience {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  responsibilities: string[]
}

export interface Education {
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description?: string
}

export interface ContactInfo {
  name?: string
  email: string
  phone?: string
  linkedin: string
  github?: string
  website?: string
  location: string
}

export interface Project {
  title: string
  description: string
  techStack: string[]
  liveLink: string
  screenshots: string[] // Array of up to 5 screenshot paths
  githubLink?: string
}
