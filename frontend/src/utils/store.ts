import { create } from 'zustand'

export type ProcessType = 'endocytosis' | 'exocytosis'

export interface Particle {
  id: string
  x: number
  y: number
  radius: number
  color: string
  vx: number
  vy: number
}

export interface AppState {
  currentProcess: ProcessType
  isPlaying: boolean
  speed: number
  particles: Particle[]
  qianwenApiKey: string
  learningProgress: {
    endocytosis: number
    exocytosis: number
  }
  setCurrentProcess: (process: ProcessType) => void
  setIsPlaying: (playing: boolean) => void
  setSpeed: (speed: number) => void
  setParticles: (particles: Particle[]) => void
  setQianwenApiKey: (key: string) => void
  updateLearningProgress: (process: ProcessType, progress: number) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentProcess: 'endocytosis',
  isPlaying: false,
  speed: 1,
  particles: [],
  qianwenApiKey: localStorage.getItem('qianwen_api_key') || '',
  learningProgress: {
    endocytosis: 0,
    exocytosis: 0,
  },
  setCurrentProcess: (process) => set({ currentProcess: process }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setSpeed: (speed) => set({ speed }),
  setParticles: (particles) => set({ particles }),
  setQianwenApiKey: (key) => {
    localStorage.setItem('qianwen_api_key', key)
    set({ qianwenApiKey: key })
  },
  updateLearningProgress: (process, progress) =>
    set((state) => ({
      learningProgress: {
        ...state.learningProgress,
        [process]: progress,
      },
    })),
}))
