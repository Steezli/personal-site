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
  email: string
  linkedin: string
  location: string
}
