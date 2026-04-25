import { computed, ref, watch } from 'vue'
import { sleep } from '@/shared/utils/sleep'
import type { AspectRatio, DurationType, WorkflowType } from '../types'
import { useWorkflowHistory } from './useWorkflowHistory'

const PROMPT_MAX_LENGTH = 400
const LAST_PROMPT_STORAGE_KEY = 'ai-video-workflow-last-prompt'
const ERROR_DESCRIPTIONS = [
  'NSFW (18+) content detected. Credits refunded.',
  'Server error. We are working on it.',
  'Generation timeout. Please try again in a few moments.',
]

export const useWorkflowForm = () => {
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

  const history = useWorkflowHistory()
  const workflow = ref<WorkflowType | null>(null)
  const aspectRatio = ref<AspectRatio | null>(null)
  const duration = ref<DurationType | null>(null)
  const prompt = ref(
    typeof window !== 'undefined'
      ? window.localStorage.getItem(LAST_PROMPT_STORAGE_KEY) ?? ''
      : '',
  )
  const forceErrorGeneration = ref(false)

  const isLoading = ref(false)
  const isSuccess = ref(false)
  const isError = ref(false)
  const promptLength = computed(() => prompt.value.length)
  const isPromptTooLong = computed(() => promptLength.value > PROMPT_MAX_LENGTH)
  const promptErrorMessage = computed(() =>
    isPromptTooLong.value ? `Maximum number of characters is ${PROMPT_MAX_LENGTH}` : '',
  )

  const isValid = computed(() => {
    const hasPrompt = prompt.value.trim().length > 0
    return Boolean(
      workflow.value &&
        aspectRatio.value &&
        duration.value &&
        hasPrompt &&
        !isPromptTooLong.value,
    )
  })

  watch(prompt, (value) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(LAST_PROMPT_STORAGE_KEY, value)
  })

  const submit = async () => {
    if (!isValid.value || isLoading.value) {
      return
    }

    isLoading.value = true
    isSuccess.value = false
    isError.value = false

    try {
      const delay = Math.floor(Math.random() * 1001) + 1000
      await sleep(delay)

      const isRequestSuccess = !forceErrorGeneration.value
      const status = isRequestSuccess ? 'success' : 'error'
      const errorDescription =
        status === 'error'
          ? ERROR_DESCRIPTIONS[Math.floor(Math.random() * ERROR_DESCRIPTIONS.length)]
          : undefined

      if (isRequestSuccess) {
        isSuccess.value = true
      } else {
        isError.value = true
      }

      history.addItem({
        id: crypto.randomUUID(),
        workflow: workflow.value ? workflowLabelMap[workflow.value] : '-',
        aspectRatio: aspectRatio.value ?? '-',
        duration: duration.value ? durationLabelMap[duration.value] : '-',
        prompt: prompt.value.trim() || '-',
        status,
        errorDescription,
        createdAt: Date.now(),
      })
    } finally {
      isLoading.value = false
    }
  }

  return {
    workflow,
    aspectRatio,
    duration,
    prompt,
    forceErrorGeneration,
    isLoading,
    isSuccess,
    isError,
    promptLength,
    isPromptTooLong,
    promptErrorMessage,
    promptMaxLength: PROMPT_MAX_LENGTH,
    isValid,
    submit,
  }
}
