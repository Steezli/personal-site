<template>
  <ContentSection title="Technologies I Work With" id="skills">
    <div class="skills-list">
      <span
        v-for="(skill, index) in skills"
        :key="index"
        class="skill-tag"
      >
        {{ skill }}
      </span>
    </div>
  </ContentSection>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentSection from './Section.vue'

export default defineComponent({
  name: 'SkillsSection',
  components: {
    ContentSection
  },
  props: {
    skills: {
      type: Array as () => string[],
      required: true
    }
  }
})
</script>

<style scoped>
.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  padding: 0.5rem 1rem;
  background-color: var(--color-background-soft);
  border-radius: 4px;
  font-size: 0.95rem;
  border: 1px solid var(--color-border);
}
</style>
