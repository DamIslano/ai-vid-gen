import { computed, ref, watch } from 'vue'
import type { GenerationItem } from '../types'

const HISTORY_STORAGE_KEY = 'ai-video-workflow-history'
const HISTORY_LIMIT = 10

const parseHistory = (rawValue: string | null): GenerationItem[] => {
  if (!rawValue) return []

  try {
    const parsed = JSON.parse(rawValue) as unknown
    if (!Array.isArray(parsed)) return []

    return parsed.filter((item): item is GenerationItem => {
      if (!item || typeof item !== 'object') return false

      const candidate = item as Partial<GenerationItem>
      return (
        typeof candidate.id === 'string' &&
        typeof candidate.workflow === 'string' &&
        typeof candidate.aspectRatio === 'string' &&
        typeof candidate.duration === 'string' &&
        typeof candidate.prompt === 'string' &&
        (candidate.status === 'success' || candidate.status === 'error') &&
        typeof candidate.createdAt === 'number'
      )
    })
  } catch {
    return []
  }
}

const history = ref<GenerationItem[]>(
  parseHistory(typeof window !== 'undefined' ? window.localStorage.getItem(HISTORY_STORAGE_KEY) : null),
)

watch(
  history,
  (value) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true },
)

export const useWorkflowHistory = () => {
  const sortedHistory = computed(() =>
    [...history.value].sort((first, second) => second.createdAt - first.createdAt),
  )

  const addItem = (item: GenerationItem) => {
    history.value = [item, ...history.value].slice(0, HISTORY_LIMIT)
  }

  const clearHistory = () => {
    history.value = []
  }

  return {
    history,
    sortedHistory,
    addItem,
    clearHistory,
  }
}
