<script setup lang="ts">
import SelectChip from '@/shared/ui/SelectChip.vue'
import type { DurationOption, DurationType } from '../types'

const props = defineProps<{
  modelValue: DurationType | null
  disabled?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: DurationType): void
}>()

const options: DurationOption[] = [
  { label: 'Short', value: 'short' },
  { label: 'Medium', value: 'medium' },
  { label: 'Long', value: 'long' },
]
</script>

<template>
  <div class="space-y-3">
    <p class="text-sm font-semibold text-brand-charcoal">Duration</p>
    <div class="flex flex-wrap gap-2">
      <SelectChip
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :selected="modelValue === option.value"
        :disabled="props.disabled"
        @select="emit('update:modelValue', option.value)"
      />
    </div>
  </div>
</template>
