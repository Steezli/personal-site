<template>
  <ContentSection title="Featured Projects" id="projects">
    <ProjectItem
      v-for="(project, index) in projects"
      :key="index"
      :project="project"
    />
  </ContentSection>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import ContentSection from './Section.vue'
import ProjectItem from './ProjectItem.vue'
import type { Project } from '@/types'

export default defineComponent({
  name: 'ProjectsSection',
  components: {
    ContentSection,
    ProjectItem
  },
  props: {
    projects: {
      type: Array as PropType<Project[]>,
      required: true
    }
  }
})
</script>
