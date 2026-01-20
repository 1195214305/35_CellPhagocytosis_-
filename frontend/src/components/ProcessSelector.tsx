import { useAppStore } from '../utils/store'
import { PROCESS_INFO } from '../utils/constants'

const ProcessSelector = () => {
  const { currentProcess, setCurrentProcess } = useAppStore()

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-bio-text mb-4">选择过程</h2>
      <div className="space-y-3">
        {Object.entries(PROCESS_INFO).map(([key, info]) => (
          <button
            key={key}
            onClick={() => setCurrentProcess(key as any)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              currentProcess === key
                ? 'border-cell-organelle bg-cell-cytoplasm shadow-md'
                : 'border-gray-200 hover:border-cell-vesicle hover:bg-gray-50'
            }`}
          >
            <h3 className="font-semibold text-bio-text mb-1">{info.title}</h3>
            <p className="text-sm text-gray-600">{info.subtitle}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProcessSelector
