<template>
  <section id="contact" class="contact">
    <h2 class="section-title">Let's Connect</h2>
    <p class="contact-intro">Interested in working together or just want to chat? Feel free to reach out!</p>
    <div class="contact-info">
      <a :href="`mailto:${contact.email}`" class="contact-link">
        {{ contact.email }}
      </a>
      <a v-if="contact.phone" :href="`tel:${contact.phone.replace(/[^0-9]/g, '')}`" class="contact-link">
        {{ contact.phone }}
      </a>
      <a :href="contact.linkedin" target="_blank" rel="noopener" class="contact-link">
        LinkedIn
      </a>
      <a v-if="contact.github" :href="contact.github" target="_blank" rel="noopener" class="contact-link">
        GitHub
      </a>
      <a v-if="contact.website" :href="contact.website" target="_blank" rel="noopener" class="contact-link">
        Website
      </a>
      <span class="contact-location">{{ contact.location }}</span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { ContactInfo } from '@/types'

export default defineComponent({
  name: 'ContactSection',
  props: {
    contact: {
      type: Object as PropType<ContactInfo>,
      required: true
    }
  }
})
</script>

<style scoped>
.contact {
  margin-bottom: 3rem;
}

.contact-intro {
  color: var(--color-text-secondary);
  margin: 0 0 1.5rem 0;
  font-size: 1.05rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-link {
  color: var(--color-text);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
}

.contact-link:hover {
  color: var(--color-primary);
  transform: translateX(4px);
}

.contact-location {
  color: var(--color-text-secondary);
}

@media (min-width: 768px) {
  .contact-info {
    flex-direction: row;
    gap: 2rem;
  }
}
</style>
