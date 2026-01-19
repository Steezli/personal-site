<template>
  <section id="contact" class="contact">
    <h2 class="section-title">Let's Connect</h2>
    <p class="contact-intro">Interested in working together or just want to chat? Feel free to reach out!</p>

    <!-- Contact Me Button -->
    <button
      ref="contactButtonRef"
      class="contact-button"
      @click="openModal"
    >
      <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Contact Me
    </button>

    <!-- Contact Modal -->
    <ContactModal
      :is-open="isModalOpen"
      :to-email="contact.email"
      :origin-x="modalOriginX"
      :origin-y="modalOriginY"
      :formspree-id="formspreeId"
      @close="closeModal"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'
import type { ContactInfo } from '@/types'
import ContactModal from './ContactModal.vue'

export default defineComponent({
  name: 'ContactSection',
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
    const modalOriginX = ref(50)
    const modalOriginY = ref(50)

    const openModal = () => {
      // Calculate button position for animation origin
      if (contactButtonRef.value) {
        const rect = contactButtonRef.value.getBoundingClientRect()
        const buttonCenterX = rect.left + rect.width / 2
        const buttonCenterY = rect.top + rect.height / 2

        // Convert to percentage of viewport
        modalOriginX.value = (buttonCenterX / window.innerWidth) * 100
        modalOriginY.value = (buttonCenterY / window.innerHeight) * 100
      }
      isModalOpen.value = true
    }

    const closeModal = () => {
      isModalOpen.value = false
      // Return focus to button
      contactButtonRef.value?.focus()
    }

    return {
      contactButtonRef,
      isModalOpen,
      modalOriginX,
      modalOriginY,
      openModal,
      closeModal
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

.contact-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 2rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

.contact-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.contact-button:active {
  transform: translateY(-1px);
}

.contact-button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

.button-icon {
  flex-shrink: 0;
}

</style>
