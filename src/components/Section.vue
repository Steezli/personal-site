<template>
  <section :id="id" class="section">
    <h2 class="section-title">{{ title }}</h2>
    <slot />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContentSection',
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      default: undefined
    }
  }
})
</script>

<style scoped>
.section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}
</style>
