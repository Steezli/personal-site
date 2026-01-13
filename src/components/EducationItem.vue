<template>
  <div class="education-item">
    <h3 class="education-degree">{{ education.degree }}</h3>
    <div class="education-meta">
      <span class="education-institution">{{ education.institution }}</span>
      <span class="education-location">{{ education.location }}</span>
      <span class="education-dates">
        {{ education.startDate }} - {{ education.endDate }}
      </span>
    </div>
    <p v-if="education.description" class="education-description">
      {{ education.description }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Education } from '@/types'

export default defineComponent({
  name: 'EducationItem',
  props: {
    education: {
      type: Object as PropType<Education>,
      required: true
    }
  }
})
</script>

<style scoped>
.education-item {
  margin-bottom: 1.5rem;
}

.education-degree {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.education-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.education-dates {
  font-style: italic;
}

.education-description {
  margin: 0.5rem 0 0 0;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

@media (min-width: 768px) {
  .education-meta {
    flex-direction: row;
    gap: 1rem;
  }
}
</style>
