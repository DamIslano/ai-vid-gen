<script setup lang="ts">
import { computed } from 'vue'
import type { GenerationItem } from '../types'

const props = defineProps<{
  items: GenerationItem[]
}>()

const emit = defineEmits<{
  (event: 'clear'): void
}>()

const hasItems = computed(() => props.items.length > 0)

const formatDate = (timestamp: number) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(timestamp)
</script>

<template>
  <section class="space-y-4">
    <div class="flex items-center justify-between gap-4">
      <h2 class="whitespace-nowrap text-lg font-semibold text-brand-ink">Generation History</h2>
      <button
        type="button"
        class="ml-auto text-sm font-medium text-brand-clay underline underline-offset-2 transition-colors duration-200 hover:text-brand-charcoal disabled:cursor-not-allowed disabled:text-brand-charcoal/50"
        :disabled="!hasItems"
        @click="emit('clear')"
      >
        Clear history
      </button>
    </div>

    <p v-if="!hasItems" class="rounded-xl border border-brand-peach/40 bg-brand-peach/10 p-4 text-sm text-brand-charcoal">
      No generations yet
    </p>

    <TransitionGroup
      v-else
      tag="div"
      class="max-h-96 space-y-3 overflow-y-auto pr-1"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
    >
      <article
        v-for="item in props.items"
        :key="item.id"
        class="space-y-3 rounded-xl border border-brand-peach/40 bg-brand-light p-4"
      >
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div class="grid gap-1 text-sm text-brand-charcoal">
            <p><span class="font-semibold">Workflow:</span> {{ item.workflow }}</p>
            <p><span class="font-semibold">Aspect Ratio:</span> {{ item.aspectRatio }}</p>
            <p><span class="font-semibold">Duration:</span> {{ item.duration }}</p>
          </div>
          <span
            class="rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wide"
            :class="
              item.status === 'success'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
            "
          >
            {{ item.status }}
          </span>
        </div>

        <p class="text-sm text-brand-ink [overflow-wrap:anywhere]">
          <span class="font-semibold text-brand-charcoal">Prompt:</span>
          {{ item.prompt }}
        </p>

        <p
          v-if="item.status === 'error' && item.errorDescription"
          class="text-sm font-medium text-red-700 [overflow-wrap:anywhere]"
        >
          {{ item.errorDescription }}
        </p>

        <p class="text-xs text-brand-charcoal/70">
          {{ formatDate(item.createdAt) }}
        </p>
      </article>
    </TransitionGroup>
  </section>
</template>
