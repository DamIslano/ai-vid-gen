<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const toggle = () => {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="props.modelValue"
    :disabled="props.disabled"
    class="inline-flex cursor-pointer items-center gap-3 rounded-xl border border-brand-peach/60 bg-brand-light px-3 py-2 transition-colors duration-200 hover:bg-brand-peach/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-clay focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    @click="toggle"
  >
    <span class="text-sm font-medium text-brand-charcoal">Error Generation</span>
    <span
      class="relative h-5 w-10 rounded-full transition-colors duration-200"
      :class="props.modelValue ? 'bg-red-500/80' : 'bg-brand-charcoal/30'"
    >
      <span
        class="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-brand-light shadow-sm transition-transform duration-200"
        :class="props.modelValue ? 'translate-x-5' : 'translate-x-0'"
      />
    </span>
  </button>
</template>
