<template>
  <ContentSection title="Summary">
    <p class="summary-text">{{ summary }}</p>
  </ContentSection>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentSection from './Section.vue'

export default defineComponent({
  name: 'SummarySection',
  components: {
    ContentSection
  },
  props: {
    summary: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.summary-text {
  line-height: 1.8;
  font-size: 1.1rem;
  color: var(--color-text-secondary);
}
</style>
