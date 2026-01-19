<template>
  <aside class="floating-contact" :class="{ 'is-expanded': isExpanded }">
    <!-- FAB Toggle Button (visible on smaller screens when collapsed) -->
    <button
      v-if="!isExpanded"
      class="fab-toggle"
      @click="toggleExpanded"
      aria-label="Open contact info"
    >
      <svg class="fab-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Full Contact Card -->
    <div class="floating-contact-content">
      <!-- Close button (visible on smaller screens when expanded) -->
      <button
        class="close-fab"
        @click="toggleExpanded"
        aria-label="Close contact info"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- Name -->
      <h3 class="contact-name">{{ contact.name }}</h3>

      <!-- Phone -->
      <a
        v-if="contact.phone"
        :href="`tel:${contact.phone.replace(/[^0-9]/g, '')}`"
        class="contact-item"
      >
        <svg class="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 16.92V19.92C22 20.48 21.78 21.01 21.39 21.4C21 21.79 20.47 22 19.91 22C15.4 21.55 11.13 19.92 7.62 17.3C4.37 14.89 1.72 11.69 0 8.08C-0.01 7.52 0.2 6.99 0.59 6.6C0.98 6.21 1.51 6 2.07 6H5.07C6.06 6 6.92 6.72 7.07 7.7C7.2 8.55 7.42 9.38 7.74 10.18C8.02 10.87 7.85 11.65 7.32 12.18L6.09 13.41C7.63 15.95 9.73 18.05 12.27 19.59L13.5 18.36C14.03 17.83 14.81 17.66 15.5 17.94C16.3 18.26 17.13 18.48 17.98 18.61C18.98 18.76 19.71 19.64 19.69 20.65V19.92" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22 16.92V19.92C22.0011 20.4831 21.7866 21.0255 21.4019 21.4381C21.0172 21.8507 20.4908 22.1019 19.93 22.14C16.4428 21.7383 13.1079 20.4791 10.21 18.48C7.51216 16.6406 5.24287 14.2371 3.56 11.44C1.53986 8.51472 0.271607 5.14337 0.0600001 1.63C0.0213109 1.07151 0.270865 0.538891 0.682432 0.152224C1.094 -0.234442 1.6359 -0.447039 2.2 -0.440001H5.2C6.19652 -0.450471 7.04347 0.328782 7.19 1.31C7.32424 2.16564 7.54617 3.00547 7.85 3.81C8.12696 4.50107 7.95923 5.28364 7.43 5.81L6.09 7.15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {{ contact.phone }}
      </a>

      <!-- Email -->
      <a
        :href="`mailto:${contact.email}`"
        class="contact-item"
      >
        <svg class="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        {{ contact.email }}
      </a>

      <!-- Social Links -->
      <div class="social-links">
        <a
          :href="contact.linkedin"
          target="_blank"
          rel="noopener"
          class="social-link"
          aria-label="LinkedIn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a
          v-if="contact.github"
          :href="contact.github"
          target="_blank"
          rel="noopener"
          class="social-link"
          aria-label="GitHub"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a
          href="https://www.instagram.com/steezli"
          target="_blank"
          rel="noopener"
          class="social-link"
          aria-label="Instagram"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </a>
      </div>

      <!-- Contact Button -->
      <button
        ref="contactButtonRef"
        class="contact-button"
        @click="openModal"
      >
        <svg class="button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Contact Me
      </button>
    </div>

    <!-- Contact Modal -->
    <ContactModal
      :is-open="isModalOpen"
      :to-email="contact.email"
      :origin-x="modalOriginX"
      :origin-y="modalOriginY"
      :formspree-id="formspreeId"
      @close="closeModal"
    />
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'
import type { ContactInfo } from '@/types'
import ContactModal from './ContactModal.vue'

export default defineComponent({
  name: 'FloatingContact',
  components: {
    ContactModal
  },
  props: {
    contact: {
      type: Object as PropType<ContactInfo>,
      required: true
    },
    formspreeId: {
      type: String,
      default: 'https://formspree.io/f/maqqjlvy'
    }
  },
  setup() {
    const contactButtonRef = ref<HTMLButtonElement | null>(null)
    const isModalOpen = ref(false)
    const isExpanded = ref(false)
    const modalOriginX = ref(0)
    const modalOriginY = ref(0)

    const toggleExpanded = () => {
      isExpanded.value = !isExpanded.value
    }

    const openModal = () => {
      if (contactButtonRef.value) {
        const rect = contactButtonRef.value.getBoundingClientRect()
        // Get the center of the button in viewport pixels
        modalOriginX.value = rect.left + rect.width / 2
        modalOriginY.value = rect.top + rect.height / 2
      }
      isModalOpen.value = true
    }

    const closeModal = () => {
      isModalOpen.value = false
      contactButtonRef.value?.focus()
    }

    return {
      contactButtonRef,
      isModalOpen,
      isExpanded,
      modalOriginX,
      modalOriginY,
      toggleExpanded,
      openModal,
      closeModal
    }
  }
})
</script>

<style scoped>
.floating-contact {
  position: fixed;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
}

.fab-toggle {
  display: none;
}

.close-fab {
  display: none;
}

.floating-contact-content {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 180px;
  transition: box-shadow 0.3s ease;
}

.floating-contact-content:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.contact-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-text);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s ease;
}

.contact-item:hover {
  color: var(--color-primary);
}

.contact-icon {
  flex-shrink: 0;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.25rem 0;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
  padding: 0.25rem;
  border-radius: 6px;
}

.social-link:hover {
  color: var(--color-primary);
  background-color: var(--color-background-soft);
  transform: translateY(-2px);
}

.contact-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 0.25rem;
}

.contact-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.contact-button:active {
  transform: translateY(0);
}

.contact-button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.button-icon {
  flex-shrink: 0;
}

/* Medium/Mobile screens: Show FAB that expands */
@media (max-width: 1400px) {
  .floating-contact {
    left: auto;
    right: 1.5rem;
    bottom: 1.5rem;
    top: auto;
    transform: none;
  }

  .fab-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: var(--color-primary);
    color: white;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fab-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  .fab-icon {
    width: 24px;
    height: 24px;
  }

  .floating-contact-content {
    display: none;
    position: absolute;
    bottom: 70px;
    right: 0;
    min-width: 220px;
    animation: slideUp 0.3s ease-out;
  }

  .close-fab {
    display: flex;
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text-secondary);
    transition: all 0.2s ease;
  }

  .close-fab:hover {
    background-color: var(--color-background-soft);
    color: var(--color-text);
  }

  .floating-contact.is-expanded .fab-toggle {
    display: none;
  }

  .floating-contact.is-expanded .floating-contact-content {
    display: flex;
  }

  .contact-name {
    padding-right: 2rem;
  }
}

/* Small mobile screens */
@media (max-width: 480px) {
  .floating-contact {
    right: 1rem;
    bottom: 1rem;
  }

  .floating-contact-content {
    right: 0;
    max-width: calc(100vw - 2rem);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
