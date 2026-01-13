<template>
  <header class="header">
    <div class="header-content">
      <h1 class="name">{{ name }}</h1>
      <p class="title">{{ title }}</p>
      <nav class="navigation">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="nav-link"
          @click.prevent="scrollToSection(link.id)"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface NavLink {
  id: string
  label: string
}

export default defineComponent({
  name: 'SiteHeader',
  data() {
    return {
      name: 'Eli Nicholson',
      title: 'Fullstack Developer & Whitewater Enthusiast',
      navLinks: [
        { id: 'about-me', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'resume', label: 'Resume' },
        { id: 'contact', label: 'Contact' }
      ] as NavLink[]
    }
  },
  methods: {
    scrollToSection(sectionId: string) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
})
</script>

<style scoped>
.header {
  padding: 4rem 0 3rem 0;
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
  letter-spacing: 0.05em;
  animation: fadeInUp 0.8s ease-out;
}

.title {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin: 0 0 2rem 0;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.navigation {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.nav-link {
  padding: 0.5rem 1rem;
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.95rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.nav-link:hover {
  color: var(--color-primary);
  background-color: var(--color-background-soft);
  border-color: var(--color-border);
  transform: translateY(-2px);
}

@media (min-width: 768px) {
  .name {
    font-size: 3.5rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .navigation {
    gap: 1.5rem;
  }

  .nav-link {
    font-size: 1rem;
  }
}

@media (max-width: 767px) {
  .navigation {
    gap: 0.5rem;
  }

  .nav-link {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
