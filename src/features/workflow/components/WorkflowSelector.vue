<script setup lang="ts">
import SelectChip from '@/shared/ui/SelectChip.vue'
import type { WorkflowOption, WorkflowType } from '../types'

const props = defineProps<{
  modelValue: WorkflowType | null
  disabled?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: WorkflowType): void
}>()

const options: WorkflowOption[] = [
  { label: 'Beat Sync', value: 'beat-sync' },
  { label: 'UGC Video', value: 'ugc-video' },
  { label: 'Generate Video', value: 'generate-video' },
]
</script>

<template>
  <div class="space-y-3">
    <p class="text-sm font-semibold text-brand-charcoal">Workflow</p>
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
