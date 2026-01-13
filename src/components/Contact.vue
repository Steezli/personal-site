<template>
  <section class="contact">
    <h2 class="section-title">Contact</h2>
    <div class="contact-info">
      <a :href="`mailto:${contact.email}`" class="contact-link">
        {{ contact.email }}
      </a>
      <a :href="contact.linkedin" target="_blank" rel="noopener" class="contact-link">
        LinkedIn Profile
      </a>
      <span class="contact-link">{{ contact.location }}</span>
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

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-link {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: var(--color-primary);
}

@media (min-width: 768px) {
  .contact-info {
    flex-direction: row;
    gap: 2rem;
  }
}
</style>
