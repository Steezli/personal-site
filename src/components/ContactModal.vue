<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="modal-backdrop"
      :class="{ 'closing': isClosing }"
      @click.self="handleClose"
      @keydown.escape="handleClose"
    >
      <div
        ref="modalRef"
        class="modal-container"
        :class="{ 'closing': isClosing, 'animating': isAnimating }"
        :style="modalStyle"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <!-- Email-style header -->
        <div class="modal-header">
          <h3 id="modal-title" class="modal-title">New Message</h3>
          <button
            type="button"
            class="close-button"
            aria-label="Close modal"
            @click="handleClose"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form class="modal-form" @submit.prevent="handleSubmit">
          <!-- To field (read-only) -->
          <div class="form-row">
            <label class="form-label">To:</label>
            <span class="form-value readonly">{{ toEmail }}</span>
          </div>

          <!-- From field -->
          <div class="form-row">
            <label class="form-label" for="from-email">From:</label>
            <input
              id="from-email"
              v-model="form.email"
              type="email"
              name="email"
              class="form-input"
              :class="{ 'error': errors.email }"
              placeholder="your-email@example.com"
              required
              @blur="validateEmail"
            />
          </div>
          <p v-if="errors.email" class="error-message">{{ errors.email }}</p>

          <!-- Subject field -->
          <div class="form-row">
            <label class="form-label" for="subject">Subject:</label>
            <input
              id="subject"
              v-model="form.subject"
              type="text"
              name="subject"
              class="form-input"
              :class="{ 'error': errors.subject }"
              placeholder="What's this about?"
              required
              @blur="validateSubject"
            />
          </div>
          <p v-if="errors.subject" class="error-message">{{ errors.subject }}</p>

          <!-- Message body -->
          <div class="form-body">
            <textarea
              id="message"
              v-model="form.message"
              name="message"
              class="form-textarea"
              :class="{ 'error': errors.message }"
              placeholder="Write your message here..."
              required
              @blur="validateMessage"
            ></textarea>
          </div>
          <p v-if="errors.message" class="error-message">{{ errors.message }}</p>

          <!-- Footer with submit -->
          <div class="modal-footer">
            <div v-if="submitStatus" class="status-message" :class="submitStatus">
              {{ statusMessage }}
            </div>
            <button
              type="submit"
              class="submit-button"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="spinner"></span>
              {{ isSubmitting ? 'Sending...' : 'Send' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'ContactModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    toEmail: {
      type: String,
      required: true
    },
    originX: {
      type: Number,
      default: 0
    },
    originY: {
      type: Number,
      default: 0
    },
    formspreeId: {
      type: String,
      default: '' // User will need to add their Formspree form ID
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const modalRef = ref<HTMLElement | null>(null)
    const isVisible = ref(false)
    const isClosing = ref(false)
    const isAnimating = ref(false)
    const isSubmitting = ref(false)
    const submitStatus = ref<'success' | 'error' | null>(null)
    const statusMessage = ref('')

    // Store the button position for animation
    const buttonX = ref(0)
    const buttonY = ref(0)

    const form = reactive({
      email: '',
      subject: '',
      message: ''
    })

    const errors = reactive({
      email: '',
      subject: '',
      message: ''
    })

    const modalStyle = computed(() => ({
      '--button-x': `${buttonX.value}px`,
      '--button-y': `${buttonY.value}px`
    }))

    // Validation functions
    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!form.email) {
        errors.email = 'Email is required'
        return false
      }
      if (!emailRegex.test(form.email)) {
        errors.email = 'Please enter a valid email address'
        return false
      }
      errors.email = ''
      return true
    }

    const validateSubject = () => {
      if (!form.subject) {
        errors.subject = 'Subject is required'
        return false
      }
      if (form.subject.length < 3) {
        errors.subject = 'Subject must be at least 3 characters'
        return false
      }
      errors.subject = ''
      return true
    }

    const validateMessage = () => {
      if (!form.message) {
        errors.message = 'Message is required'
        return false
      }
      if (form.message.length < 10) {
        errors.message = 'Message must be at least 10 characters'
        return false
      }
      errors.message = ''
      return true
    }

    const validateForm = () => {
      const emailValid = validateEmail()
      const subjectValid = validateSubject()
      const messageValid = validateMessage()
      return emailValid && subjectValid && messageValid
    }

    const handleSubmit = async () => {
      if (!validateForm()) return

      isSubmitting.value = true
      submitStatus.value = null

      try {
        // If no formspree ID, show a message
        if (!props.formspreeId) {
          // Fallback: open mailto link
          const mailtoLink = `mailto:${props.toEmail}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.email}\n\n${form.message}`)}`
          window.location.href = mailtoLink
          submitStatus.value = 'success'
          statusMessage.value = 'Opening your email client...'
          setTimeout(() => handleClose(), 1500)
          return
        }

        const response = await fetch(`https://formspree.io/f/${props.formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: form.email,
            subject: form.subject,
            message: form.message
          })
        })

        if (response.ok) {
          submitStatus.value = 'success'
          statusMessage.value = 'Message sent successfully!'
          // Reset form
          form.email = ''
          form.subject = ''
          form.message = ''
          // Close modal after delay
          setTimeout(() => handleClose(), 2000)
        } else {
          throw new Error('Form submission failed')
        }
      } catch {
        submitStatus.value = 'error'
        statusMessage.value = 'Failed to send. Please try again.'
      } finally {
        isSubmitting.value = false
      }
    }

    const handleClose = () => {
      isClosing.value = true
      isAnimating.value = true
      // Wait for animation to complete (450ms)
      setTimeout(() => {
        isVisible.value = false
        isClosing.value = false
        isAnimating.value = false
        emit('close')
      }, 450)
    }

    // Handle escape key
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible.value) {
        handleClose()
      }
    }

    // Focus trap
    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.value) return

      const focusableElements = modalRef.value.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    // Watch for open state changes
    watch(() => props.isOpen, async (newVal) => {
      if (newVal) {
        // Capture button position
        buttonX.value = props.originX
        buttonY.value = props.originY
        
        isVisible.value = true
        isAnimating.value = true
        submitStatus.value = null
        // Reset form and errors when opening
        form.email = ''
        form.subject = ''
        form.message = ''
        errors.email = ''
        errors.subject = ''
        errors.message = ''
        await nextTick()
        
        // End animation state after animation completes
        setTimeout(() => {
          isAnimating.value = false
        }, 450)
        
        // Focus first input
        const firstInput = modalRef.value?.querySelector('input') as HTMLElement
        firstInput?.focus()
      }
    })

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown)
      document.addEventListener('keydown', trapFocus)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('keydown', trapFocus)
    })

    return {
      modalRef,
      isVisible,
      isClosing,
      isAnimating,
      isSubmitting,
      submitStatus,
      statusMessage,
      form,
      errors,
      modalStyle,
      validateEmail,
      validateSubject,
      validateMessage,
      handleSubmit,
      handleClose
    }
  }
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: backdropFadeIn 0.45s ease-out;
}

.modal-backdrop.closing {
  animation: backdropFadeOut 0.45s ease-out forwards;
}

.modal-container {
  background-color: var(--color-background);
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 550px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* Calculate offset from center to button position */
  --center-x: 50vw;
  --center-y: 50vh;
  --offset-x: calc(var(--button-x, 50vw) - var(--center-x));
  --offset-y: calc(var(--button-y, 50vh) - var(--center-y));
}

.modal-container.animating {
  animation: modalGrowIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.modal-container.closing.animating {
  animation: modalShrinkOut 0.45s ease-in forwards;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background-color: var(--color-background-mute);
  border-bottom: 1px solid var(--color-border);
}

.modal-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-text);
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--color-text-secondary);
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background-color: var(--color-border);
  color: var(--color-text);
}

.modal-form {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.form-row {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--color-border);
  gap: 0.75rem;
}

.form-label {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  min-width: 60px;
  font-weight: 500;
}

.form-value {
  font-size: 0.95rem;
  color: var(--color-text);
}

.form-value.readonly {
  color: var(--color-text-secondary);
}

.form-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  color: var(--color-text);
  outline: none;
  padding: 0.25rem 0;
}

.form-input::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.6;
}

.form-input.error {
  color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.8rem;
  padding: 0 1.25rem 0.5rem;
  margin: 0;
}

.form-body {
  flex: 1;
  padding: 1rem 1.25rem;
  min-height: 200px;
}

.form-textarea {
  width: 100%;
  height: 100%;
  min-height: 180px;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  color: var(--color-text);
  resize: none;
  outline: none;
  font-family: inherit;
  line-height: 1.6;
}

.form-textarea::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.6;
}

.form-textarea.error {
  color: #e74c3c;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
}

.status-message {
  font-size: 0.85rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
}

.status-message.success {
  color: #27ae60;
  background-color: rgba(39, 174, 96, 0.1);
}

.status-message.error {
  color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.1);
}

.submit-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Animations */
@keyframes backdropFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes backdropFadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes modalGrowIn {
  0% {
    opacity: 0;
    transform: translate(var(--offset-x), var(--offset-y)) scale(0.1);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
}

@keyframes modalShrinkOut {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--offset-x), var(--offset-y)) scale(0.1);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .modal-container {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }

  .form-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .form-label {
    font-size: 0.8rem;
  }

  .form-input {
    width: 100%;
  }
}
</style>
