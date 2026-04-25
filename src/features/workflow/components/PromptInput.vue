<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string
    maxLength: number
    isOverLimit: boolean
    errorMessage?: string
    disabled?: boolean
  }>(),
  {
    errorMessage: '',
    disabled: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="space-y-3">
    <label class="mb-2 block text-sm font-semibold text-brand-charcoal" for="workflow-prompt">Prompt</label>
    <textarea
      id="workflow-prompt"
      :value="props.modelValue"
      :disabled="props.disabled"
      rows="5"
      wrap="soft"
      placeholder="Describe your video idea..."
      class="w-full resize-none overflow-x-hidden rounded-xl border border-brand-peach bg-brand-light px-4 py-3 text-sm text-brand-ink transition-all duration-200 [overflow-wrap:anywhere] placeholder:text-brand-charcoal/50 focus:border-brand-clay focus:outline-none focus:ring-2 focus:ring-brand-clay/30 disabled:cursor-not-allowed disabled:bg-brand-peach/20 disabled:text-brand-charcoal/70"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <div class="flex items-center justify-between text-xs">
      <p
        class="transition-colors duration-200"
        :class="props.isOverLimit ? 'text-red-600' : 'text-transparent'"
      >
        {{ props.errorMessage || ' ' }}
      </p>
      <p
        class="tabular-nums transition-colors duration-200"
        :class="props.isOverLimit ? 'text-red-600' : 'text-brand-charcoal/70'"
      >
        {{ props.modelValue.length }}/{{ props.maxLength }}
      </p>
    </div>
  </div>
</template>
