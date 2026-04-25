<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string
    selected?: boolean
    disabled?: boolean
  }>(),
  {
    selected: false,
    disabled: false,
  },
)

const emit = defineEmits<{
  (event: 'select'): void
}>()
</script>

<template>
  <button
    type="button"
    :disabled="props.disabled"
    class="cursor-pointer rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-clay focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    :class="
      props.selected
        ? 'border-brand-clay bg-brand-peach/30 text-brand-charcoal'
        : 'border-brand-peach bg-brand-light text-brand-charcoal hover:border-brand-clay/70 hover:bg-brand-peach/20'
    "
    @click="emit('select')"
  >
    {{ props.label }}
  </button>
</template>
