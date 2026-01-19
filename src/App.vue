<template>
  <div id="app">
    <SiteHeader />
    <FloatingContact :contact="contactInfo" />
    <div class="content">
      <AboutMeSection />
      <ProjectsSection :projects="projects" />
      <ResumeSection
        :contact-info="contactInfo"
        :summary="summary"
        :experiences="experiences"
        :skills="skills"
        :education="education"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SiteHeader from './components/Header.vue'
import AboutMeSection from './components/AboutMe.vue'
import ProjectsSection from './components/Projects.vue'
import ResumeSection from './components/Resume.vue'
import FloatingContact from './components/FloatingContact.vue'
import {
  contactInfo,
  summary,
  skills,
  projects,
  experiences,
  education
} from './data/personal'

export default defineComponent({
  name: 'App',
  components: {
    SiteHeader,
    AboutMeSection,
    ProjectsSection,
    ResumeSection,
    FloatingContact
  },
  data() {
    return {
      contactInfo,
      summary,
      skills,
      projects,
      experiences,
      education
    }
  },
  mounted() {
    this.setupScrollAnimations()
  },
  methods: {
    setupScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      }, observerOptions)

      // Observe all direct children of .content
      const content = document.querySelector('.content')
      if (content) {
        const sections = content.children
        Array.from(sections).forEach((section, index) => {
          ;(section as HTMLElement).style.animationDelay = `${index * 0.1}s`
          observer.observe(section)
        })
      }
    }
  }
})
</script>

<style scoped>
.content {
  max-width: 900px;
  margin: 0 auto;
}

/* Intersection Observer will add these classes */
.content > * {
  opacity: 0;
}

.content > *.visible {
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>

<style>
/* Global animation styles */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
