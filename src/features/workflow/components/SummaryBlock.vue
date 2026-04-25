<script setup lang="ts">
import { computed } from 'vue'
import type { AspectRatio, DurationType, WorkflowType } from '../types'

const props = defineProps<{
  workflow: WorkflowType | null
  aspectRatio: AspectRatio | null
  duration: DurationType | null
  prompt: string
}>()

const workflowLabelMap: Record<WorkflowType, string> = {
  'beat-sync': 'Beat Sync',
  'ugc-video': 'UGC Video',
  'generate-video': 'Generate Video',
}

const durationLabelMap: Record<DurationType, string> = {
  short: 'Short',
  medium: 'Medium',
  long: 'Long',
}

const safeWorkflow = computed(() =>
  props.workflow ? workflowLabelMap[props.workflow] : '-',
)
const safeAspectRatio = computed(() => props.aspectRatio ?? '-')
const safeDuration = computed(() => (props.duration ? durationLabelMap[props.duration] : '-'))
const safePrompt = computed(() => props.prompt.trim() || '-')

const rows = computed(() => [
  { label: 'Workflow', value: safeWorkflow.value },
  { label: 'Aspect Ratio', value: safeAspectRatio.value },
  { label: 'Duration', value: safeDuration.value },
  { label: 'Prompt', value: safePrompt.value },
])
</script>

<template>
  <div class="space-y-3">
    <p class="text-sm font-semibold text-brand-charcoal">Summary</p>
    <dl class="grid gap-3 sm:grid-cols-2">
      <div
        v-for="row in rows"
        :key="row.label"
        class="min-w-0 rounded-xl border border-brand-peach/40 bg-brand-peach/15 p-3 transition-opacity duration-300"
      >
        <dt class="text-xs font-medium uppercase tracking-wide text-brand-charcoal/70">{{ row.label }}</dt>
        <dd class="mt-1 break-all text-sm text-brand-ink">{{ row.value }}</dd>
      </div>
    </dl>
  </div>
</template>
