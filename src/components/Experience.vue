<template>
  <ContentSection title="Where I've Worked" id="experience">
    <ExperienceItem
      v-for="(exp, index) in experiences"
      :key="index"
      :experience="exp"
    />
  </ContentSection>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import ContentSection from './Section.vue'
import ExperienceItem from './ExperienceItem.vue'
import type { Experience } from '@/types'

export default defineComponent({
  name: 'ExperienceSection',
  components: {
    ContentSection,
    ExperienceItem
  },
  props: {
    experiences: {
      type: Array as PropType<Experience[]>,
      required: true
    }
  }
})
</script>
