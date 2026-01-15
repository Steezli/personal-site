<template>
  <div class="project-item">
    <div class="project-content">
      <div class="project-image-container">
        <div
          class="slideshow-wrapper"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        >
          <div
            class="slideshow-track"
            :style="{ transform: `translateX(-${currentSlideIndex * 100}%)` }"
          >
            <div
              v-for="(screenshot, index) in project.screenshots.slice(0, 5)"
              :key="index"
              class="slide"
            >
              <img
                :src="screenshot"
                :alt="`${project.title} screenshot ${index + 1}`"
                class="project-screenshot"
                @click="openModal(index)"
              />
            </div>
          </div>

          <!-- Navigation buttons -->
          <button
            v-if="project.screenshots.length > 1"
            class="slideshow-nav slideshow-nav-prev"
            @click="previousSlide"
            aria-label="Previous screenshot"
          >
            ‹
          </button>
          <button
            v-if="project.screenshots.length > 1"
            class="slideshow-nav slideshow-nav-next"
            @click="nextSlide"
            aria-label="Next screenshot"
          >
            ›
          </button>

          <!-- Dots indicator -->
          <div
            v-if="project.screenshots.length > 1"
            class="slideshow-dots"
          >
            <button
              v-for="(screenshot, index) in project.screenshots.slice(0, 5)"
              :key="index"
              class="slideshow-dot"
              :class="{ active: index === currentSlideIndex }"
              @click="goToSlide(index)"
              :aria-label="`Go to screenshot ${index + 1}`"
            />
          </div>
        </div>
      </div>

      <!-- Modal/Lightbox -->
      <div
        v-if="isModalOpen"
        class="image-modal"
        @click="closeModal"
        @keydown.esc="closeModal"
        tabindex="0"
      >
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal" aria-label="Close modal">
            ×
          </button>
          <img
            :src="project.screenshots[currentModalIndex]"
            :alt="`${project.title} screenshot ${currentModalIndex + 1}`"
            class="modal-image"
          />
          <button
            v-if="project.screenshots.length > 1"
            class="modal-nav modal-nav-prev"
            @click.stop="previousModalSlide"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            v-if="project.screenshots.length > 1"
            class="modal-nav modal-nav-next"
            @click.stop="nextModalSlide"
            aria-label="Next image"
          >
            ›
          </button>
          <div
            v-if="project.screenshots.length > 1"
            class="modal-counter"
          >
            {{ currentModalIndex + 1 }} / {{ project.screenshots.length }}
          </div>
        </div>
      </div>

      <div class="project-details">
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="project-description">{{ project.description }}</p>
        <div class="project-tech-stack">
          <span
            v-for="(tech, index) in project.techStack"
            :key="index"
            class="tech-tag"
          >
            {{ tech }}
          </span>
        </div>
        <div class="project-links">
          <a
            :href="project.liveLink"
            target="_blank"
            rel="noopener noreferrer"
            class="project-link project-link-primary"
          >
            View Live Site
          </a>
          <a
            v-if="project.githubLink"
            :href="project.githubLink"
            target="_blank"
            rel="noopener noreferrer"
            class="project-link project-link-secondary"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref, computed, onMounted, onUnmounted } from 'vue'
import type { Project } from '@/types'

export default defineComponent({
  name: 'ProjectItem',
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true
    }
  },
  setup(props) {
    const currentSlideIndex = ref(0)
    const maxSlides = computed(() => Math.min(5, props.project.screenshots.length))
    const touchStartX = ref(0)
    const touchEndX = ref(0)
    const isModalOpen = ref(false)
    const currentModalIndex = ref(0)

    const nextSlide = () => {
      currentSlideIndex.value = (currentSlideIndex.value + 1) % maxSlides.value
    }

    const previousSlide = () => {
      currentSlideIndex.value = currentSlideIndex.value === 0 ? maxSlides.value - 1 : currentSlideIndex.value - 1
    }

    const goToSlide = (index: number) => {
      if (index >= 0 && index < maxSlides.value) {
        currentSlideIndex.value = index
      }
    }

    const openModal = (index: number) => {
      currentModalIndex.value = index
      isModalOpen.value = true
      document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
      isModalOpen.value = false
      document.body.style.overflow = ''
    }

    const nextModalSlide = () => {
      currentModalIndex.value = (currentModalIndex.value + 1) % props.project.screenshots.length
    }

    const previousModalSlide = () => {
      currentModalIndex.value = currentModalIndex.value === 0
        ? props.project.screenshots.length - 1
        : currentModalIndex.value - 1
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen.value) return

      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'ArrowLeft') {
        previousModalSlide()
      } else if (e.key === 'ArrowRight') {
        nextModalSlide()
      }
    }

    // Add keyboard event listener
    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown)
    })

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    })

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.value = e.touches?.[0]?.clientX ?? 0
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const clientX = e.changedTouches?.[0]?.clientX
      if (clientX !== undefined) {
        touchEndX.value = clientX
        handleSwipe()
      }
    }

    const handleSwipe = () => {
      const swipeThreshold = 50
      const diff = touchStartX.value - touchEndX.value

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide()
        } else {
          previousSlide()
        }
      }
    }

    return {
      currentSlideIndex,
      isModalOpen,
      currentModalIndex,
      nextSlide,
      previousSlide,
      goToSlide,
      openModal,
      closeModal,
      nextModalSlide,
      previousModalSlide,
      handleTouchStart,
      handleTouchEnd
    }
  }
})
</script>

<style scoped>
.project-item {
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--color-border);
}

.project-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.project-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.project-image-container {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  aspect-ratio: 16 / 9;
}

.project-item:hover .project-image-container {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.slideshow-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  background-color: var(--color-background-soft);
  display: flex;
  align-items: center;
  justify-content: center;
}

.slideshow-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  height: 100%;
}

.slide {
  min-width: 100%;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-screenshot {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  display: block;
  object-fit: contain;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.project-screenshot:hover {
  opacity: 0.9;
}

.slideshow-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: blur(4px);
}

.slideshow-nav:hover {
  background-color: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.1);
}

.slideshow-nav-prev {
  left: 10px;
}

.slideshow-nav-next {
  right: 10px;
}

.slideshow-dots {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.slideshow-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.slideshow-dot:hover {
  background-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.2);
}

.slideshow-dot.active {
  background-color: white;
  border-color: white;
}

.project-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-heading);
}

.project-description {
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0;
}

.project-tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.4rem 0.8rem;
  background-color: var(--color-background-soft);
  border-radius: 4px;
  font-size: 0.85rem;
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.project-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.project-link {
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
}

.project-link-primary {
  background-color: var(--color-primary);
  color: white;
  border: 1px solid var(--color-primary);
}

.project-link-primary:hover {
  background-color: hsla(160, 100%, 32%, 1);
  border-color: hsla(160, 100%, 32%, 1);
}

.project-link-secondary {
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.project-link-secondary:hover {
  background-color: var(--color-background-soft);
  border-color: var(--color-border-hover);
}

@media (min-width: 768px) {
  .project-content {
    flex-direction: row;
    align-items: flex-start;
  }

  .project-image-container {
    width: 40%;
    flex-shrink: 0;
  }

  .project-details {
    flex: 1;
  }
}

/* Modal/Lightbox Styles */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.3s ease;
  backdrop-filter: blur(8px);
}

.modal-content {
  position: relative;
  max-width: 95%;
  max-height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image {
  max-width: 100%;
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;
  backdrop-filter: blur(4px);
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}

.modal-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;
  backdrop-filter: blur(4px);
}

.modal-nav:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-50%) scale(1.1);
}

.modal-nav-prev {
  left: -60px;
}

.modal-nav-next {
  right: -60px;
}

.modal-counter {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(4px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .image-modal {
    padding: 1rem;
  }

  .modal-image {
    max-height: 85vh;
  }

  .modal-close {
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    font-size: 24px;
  }

  .modal-nav {
    width: 40px;
    height: 40px;
    font-size: 24px;
  }

  .modal-nav-prev {
    left: 10px;
  }

  .modal-nav-next {
    right: 10px;
  }

  .modal-counter {
    bottom: 10px;
  }
}
</style>
