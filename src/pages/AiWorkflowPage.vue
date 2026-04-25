<script setup lang="ts">
import Card from '@/shared/ui/Card.vue'
import WorkflowSelector from '@/features/workflow/components/WorkflowSelector.vue'
import AspectRatioSelector from '@/features/workflow/components/AspectRatioSelector.vue'
import DurationSelector from '@/features/workflow/components/DurationSelector.vue'
import PromptInput from '@/features/workflow/components/PromptInput.vue'
import SummaryBlock from '@/features/workflow/components/SummaryBlock.vue'
import StartButton from '@/features/workflow/components/StartButton.vue'
import GenerationHistory from '@/features/workflow/components/GenerationHistory.vue'
import ErrorGenerationSwitch from '@/features/workflow/components/ErrorGenerationSwitch.vue'
import { useWorkflowForm } from '@/features/workflow/composables/useWorkflowForm'
import { useWorkflowHistory } from '@/features/workflow/composables/useWorkflowHistory'

const {
  workflow,
  aspectRatio,
  duration,
  prompt,
  forceErrorGeneration,
  isLoading,
  promptMaxLength,
  isPromptTooLong,
  promptErrorMessage,
  isValid,
  submit,
} = useWorkflowForm()

const { sortedHistory, clearHistory } = useWorkflowHistory()
</script>

<template>
  <main class="mx-auto max-w-3xl p-4 py-10 sm:p-6">
    <Card>
      <div class="mb-8 space-y-2">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h1 class="text-2xl font-bold text-brand-ink sm:text-3xl">AI Video Workflow Starter</h1>
          <ErrorGenerationSwitch v-model="forceErrorGeneration" :disabled="isLoading" />
        </div>
        <p class="text-sm text-brand-charcoal/80">
          Configure your generation workflow and run a simulated AI video request.
        </p>
      </div>

      <div class="space-y-6 transition-opacity duration-300" :class="isLoading ? 'opacity-80' : 'opacity-100'">
        <WorkflowSelector v-model="workflow" :disabled="isLoading" />
        <AspectRatioSelector v-model="aspectRatio" :disabled="isLoading" />
        <DurationSelector v-model="duration" :disabled="isLoading" />
        <PromptInput
          v-model="prompt"
          :max-length="promptMaxLength"
          :is-over-limit="isPromptTooLong"
          :error-message="promptErrorMessage"
          :disabled="isLoading"
        />
        <SummaryBlock
          :workflow="workflow"
          :aspect-ratio="aspectRatio"
          :duration="duration"
          :prompt="prompt"
        />
        <StartButton
          :disabled="!isValid"
          :loading="isLoading"
          :duration="duration"
          @click="submit"
        />

        <div class="border-t border-brand-peach/40 pt-6">
          <GenerationHistory :items="sortedHistory" @clear="clearHistory" />
        </div>
      </div>
    </Card>
  </main>
</template>
