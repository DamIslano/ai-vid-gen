<script setup lang="ts">
import SelectChip from '@/shared/ui/SelectChip.vue'
import type { AspectRatio, AspectRatioOption } from '../types'

const props = defineProps<{
  modelValue: AspectRatio | null
  disabled?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: AspectRatio): void
}>()

const options: AspectRatioOption[] = [
  { label: '9:16', value: '9:16' },
  { label: '16:9', value: '16:9' },
  { label: '1:1', value: '1:1' },
]
</script>

<template>
  <div class="space-y-3">
    <p class="text-sm font-semibold text-brand-charcoal">Aspect Ratio</p>
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
