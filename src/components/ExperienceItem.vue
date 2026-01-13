<template>
  <div class="experience-item">
    <div class="experience-header">
      <div class="experience-title-row">
        <h3 class="experience-title">{{ experience.title }}</h3>
        <span class="experience-company">{{ experience.company }}</span>
      </div>
      <div class="experience-meta">
        <span class="experience-location">{{ experience.location }}</span>
        <span class="experience-dates">
          {{ experience.startDate }} - {{ experience.endDate }}
        </span>
      </div>
    </div>
    <ul class="responsibilities">
      <li
        v-for="(responsibility, index) in experience.responsibilities"
        :key="index"
        class="responsibility"
      >
        {{ responsibility }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Experience } from '@/types'

export default defineComponent({
  name: 'ExperienceItem',
  props: {
    experience: {
      type: Object as PropType<Experience>,
      required: true
    }
  }
})
</script>

<style scoped>
.experience-item {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.experience-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.experience-header {
  margin-bottom: 1rem;
}

.experience-title-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.experience-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.experience-company {
  font-size: 1rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.experience-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.experience-dates {
  font-style: italic;
}

.responsibilities {
  list-style: none;
  padding: 0;
  margin: 0;
}

.responsibility {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;
}

.responsibility::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: bold;
}

@media (min-width: 768px) {
  .experience-title-row {
    flex-direction: row;
    align-items: baseline;
    gap: 0.5rem;
  }

  .experience-meta {
    flex-direction: row;
    gap: 1rem;
  }
}
</style>
