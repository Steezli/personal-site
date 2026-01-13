<template>
  <ContentSection title="Education">
    <EducationItem
      v-for="(edu, index) in education"
      :key="index"
      :education="edu"
    />
  </ContentSection>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import ContentSection from './Section.vue'
import EducationItem from './EducationItem.vue'
import type { Education } from '@/types'

export default defineComponent({
  name: 'EducationSection',
  components: {
    ContentSection,
    EducationItem
  },
  props: {
    education: {
      type: Array as PropType<Education[]>,
      required: true
    }
  }
})
</script>
