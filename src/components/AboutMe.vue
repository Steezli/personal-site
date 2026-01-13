<template>
  <ContentSection title="About Me" id="about-me">
    <div class="about-content">
      <p class="about-text">
        {{ aboutText }}
      </p>
      <div class="social-links">
        <a
          href="https://www.youtube.com/@Steezli"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
        >
          YouTube
        </a>
        <a
          href="https://www.instagram.com/steezli"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
        >
          Instagram
        </a>
      </div>
    </div>
  </ContentSection>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentSection from './Section.vue'

export default defineComponent({
  name: 'AboutMeSection',
  components: {
    ContentSection
  },
  data() {
    return {
      aboutText: 'I\'m a fullstack developer who loves building tools that make people\'s lives easier. Over the past five years, I\'ve focused on creating internal tools, modernizing legacy codebases, and building web applications from the ground up. I thrive on the diverse challenges that come with fullstack development and enjoy seeing how all the pieces fit together.\n\nWhen I\'m not coding, you can find me on the water pursuing my passion for whitewater kayaking. I love the challenge and adventure that comes with navigating rapids and exploring rivers. The problem-solving mindset I use in coding translates perfectly to reading water and planning routes down challenging rapids.\n\nFollow my kayaking adventures on YouTube and Instagram @Steezli.'
    }
  }
})
</script>

<style scoped>
.about-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about-text {
  line-height: 1.8;
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  margin: 0;
  white-space: pre-line;
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.social-link:hover {
  background-color: var(--color-background-soft);
  border-color: var(--color-border-hover);
  color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
