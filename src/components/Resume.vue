<template>
  <ContentSection title="Resume" id="resume">
    <div class="resume-container">
      <div class="resume-header">
        <a
          :href="resumePdfPath"
          :download="resumeFileName"
          class="download-button"
          @click="handleDownload"
        >
          <span class="download-icon">↓</span>
          Download PDF Resume
        </a>
      </div>
      
      <div class="resume-content">
        <!-- Contact Info -->
        <div class="resume-section">
          <div class="resume-contact">
            <div class="resume-name">{{ contactInfo.name || 'Eli Nicholson' }}</div>
            <div class="resume-title">Fullstack Software Developer</div>
            <div class="resume-contact-details">
              <span>{{ contactInfo.email }}</span>
              <span v-if="contactInfo.phone">•</span>
              <span v-if="contactInfo.phone">{{ contactInfo.phone }}</span>
              <span>•</span>
              <a :href="contactInfo.linkedin" target="_blank" rel="noopener">LinkedIn</a>
              <span v-if="contactInfo.github">•</span>
              <a v-if="contactInfo.github" :href="contactInfo.github" target="_blank" rel="noopener">GitHub</a>
              <span v-if="contactInfo.website">•</span>
              <a v-if="contactInfo.website" :href="contactInfo.website" target="_blank" rel="noopener">Website</a>
              <span>•</span>
              <span>{{ contactInfo.location }}</span>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="resume-section">
          <h3 class="resume-section-title">Summary</h3>
          <p class="resume-summary">{{ summary }}</p>
        </div>

        <!-- Experience -->
        <div class="resume-section">
          <h3 class="resume-section-title">Experience</h3>
          <div
            v-for="(exp, index) in experiences"
            :key="index"
            class="resume-item"
          >
            <div class="resume-item-header">
              <div class="resume-item-title-row">
                <span class="resume-item-title">{{ exp.title }}</span>
                <span class="resume-item-company">{{ exp.company }}</span>
              </div>
              <div class="resume-item-meta">
                <span>{{ exp.location }}</span>
                <span>{{ exp.startDate }} - {{ exp.endDate }}</span>
              </div>
            </div>
            <ul class="resume-responsibilities">
              <li
                v-for="(responsibility, idx) in exp.responsibilities"
                :key="idx"
              >
                {{ responsibility }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Skills -->
        <div class="resume-section">
          <h3 class="resume-section-title">Skills</h3>
          <div class="resume-skills">
            <span
              v-for="(skill, index) in skills"
              :key="index"
              class="resume-skill"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- Education -->
        <div class="resume-section">
          <h3 class="resume-section-title">Education</h3>
          <div
            v-for="(edu, index) in education"
            :key="index"
            class="resume-item"
          >
            <div class="resume-item-header">
              <div class="resume-item-title-row">
                <span class="resume-item-title">{{ edu.degree }}</span>
                <span class="resume-item-company">{{ edu.institution }}</span>
              </div>
              <div class="resume-item-meta">
                <span>{{ edu.location }}</span>
                <span>{{ edu.startDate }} - {{ edu.endDate }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentSection>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import ContentSection from './Section.vue'
import type { Experience, Education, ContactInfo } from '@/types'

export default defineComponent({
  name: 'ResumeSection',
  components: {
    ContentSection
  },
  props: {
    contactInfo: {
      type: Object as PropType<ContactInfo>,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    experiences: {
      type: Array as PropType<Experience[]>,
      required: true
    },
    skills: {
      type: Array as PropType<string[]>,
      required: true
    },
    education: {
      type: Array as PropType<Education[]>,
      required: true
    },
    resumePdfPath: {
      type: String,
      default: '/EliNicholsonResume.pdf'
    },
    resumeFileName: {
      type: String,
      default: 'EliNicholsonResume.pdf'
    }
  },
  methods: {
    handleDownload() {
      // Optional: Track download event
      console.log('Resume download initiated')
    }
  }
})
</script>

<style scoped>
.resume-container {
  position: relative;
}

.resume-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
}

.download-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.download-button:hover {
  background-color: hsla(160, 100%, 32%, 1);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.download-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.download-button:hover .download-icon {
  transform: translateY(2px);
}

.resume-content {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2.5rem;
  max-width: 800px;
  margin: 0 auto;
  transition: box-shadow 0.3s ease;
}

.resume-content:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.resume-section {
  margin-bottom: 2rem;
}

.resume-section:last-child {
  margin-bottom: 0;
}

.resume-contact {
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-border);
}

.resume-name {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--color-heading);
}

.resume-title {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.resume-contact-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.resume-contact-details a {
  color: var(--color-primary);
  text-decoration: none;
}

.resume-contact-details a:hover {
  text-decoration: underline;
}

.resume-section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--color-heading);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.resume-summary {
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0;
}

.resume-item {
  margin-bottom: 1.5rem;
}

.resume-item:last-child {
  margin-bottom: 0;
}

.resume-item-header {
  margin-bottom: 0.75rem;
}

.resume-item-title-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: baseline;
  margin-bottom: 0.25rem;
}

.resume-item-title {
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--color-heading);
}

.resume-item-company {
  color: var(--color-text-secondary);
  font-weight: 500;
}

.resume-item-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

.resume-responsibilities {
  list-style: none;
  padding: 0;
  margin: 0;
  padding-left: 1.25rem;
}

.resume-responsibilities li {
  position: relative;
  padding: 0.25rem 0;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.resume-responsibilities li::before {
  content: '•';
  position: absolute;
  left: -1rem;
  color: var(--color-primary);
  font-weight: bold;
}

.resume-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.resume-skill {
  padding: 0.4rem 0.8rem;
  background-color: var(--color-background-soft);
  border-radius: 4px;
  font-size: 0.9rem;
  border: 1px solid var(--color-border);
}

@media print {
  .resume-header {
    display: none;
  }
  
  .resume-content {
    border: none;
    padding: 0;
  }
}

@media (max-width: 768px) {
  .resume-content {
    padding: 1.5rem;
  }
  
  .resume-name {
    font-size: 1.5rem;
  }
  
  .resume-contact-details {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .resume-contact-details span:nth-child(even) {
    display: none;
  }
}
</style>
