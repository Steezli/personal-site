<template>
  <div id="app">
    <SiteHeader />
    <div class="content">
      <ContactSection :contact="contactInfo" />
      <SummarySection :summary="summary" />
      <SkillsSection :skills="skills" />
      <ExperienceSection :experiences="experiences" />
      <EducationSection :education="education" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SiteHeader from './components/Header.vue'
import ContactSection from './components/Contact.vue'
import SummarySection from './components/Summary.vue'
import SkillsSection from './components/Skills.vue'
import ExperienceSection from './components/Experience.vue'
import EducationSection from './components/Education.vue'
import {
  contactInfo,
  summary,
  skills,
  experiences,
  education
} from './data/personal'

export default defineComponent({
  name: 'App',
  components: {
    SiteHeader,
    ContactSection,
    SummarySection,
    SkillsSection,
    ExperienceSection,
    EducationSection
  },
  data() {
    return {
      contactInfo,
      summary,
      skills,
      experiences,
      education
    }
  }
})
</script>

<style scoped>
.content {
  max-width: 900px;
  margin: 0 auto;
}
</style>
