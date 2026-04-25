<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled?: boolean
    loading?: boolean
    type?: 'button' | 'submit'
  }>(),
  {
    disabled: false,
    loading: false,
    type: 'button',
  },
)
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled || props.loading"
    class="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-charcoal px-4 py-3 text-sm font-semibold text-brand-light shadow-sm transition-all duration-200 hover:bg-brand-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-clay focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-brand-peach/60 disabled:text-brand-charcoal/70"
  >
    <slot />
  </button>
</template>
