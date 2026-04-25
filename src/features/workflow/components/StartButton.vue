<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/shared/ui/Button.vue'
import type { DurationType } from '../types'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    loading?: boolean
    duration?: DurationType | null
  }>(),
  {
    disabled: false,
    loading: false,
    duration: null,
  },
)

const creditsMap: Record<DurationType, number> = {
  short: 10,
  medium: 15,
  long: 20,
}

const buttonLabel = computed(() => {
  if (props.loading) return 'Generating...'
  const credits = props.duration ? creditsMap[props.duration] : null
  return credits ? `Start generation (${credits} Credits)` : 'Start generation'
})
</script>

<template>
  <Button :disabled="props.disabled" :loading="props.loading" type="button">
    <svg
      v-if="props.loading"
      class="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" class="stroke-brand-light/30" stroke-width="4" />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        class="stroke-brand-light"
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg>
    <span>{{ buttonLabel }}</span>
  </Button>
</template>
