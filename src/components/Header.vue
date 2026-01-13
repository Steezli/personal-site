<template>
  <header class="header">
    <div class="header-content">
      <h1 class="name">{{ name }}</h1>
      <p class="title">{{ title }}</p>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SiteHeader',
  data() {
    return {
      name: 'ELI NICHOLSON',
      title: 'Fullstack Software Developer'
    }
  }
})
</script>

<style scoped>
.header {
  padding: 3rem 0;
  text-align: center;
  border-bottom: 2px solid var(--color-border);
  margin-bottom: 3rem;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.name {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.1em;
}

.title {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin: 0;
}

@media (min-width: 768px) {
  .name {
    font-size: 3.5rem;
  }

  .title {
    font-size: 1.5rem;
  }
}
</style>
