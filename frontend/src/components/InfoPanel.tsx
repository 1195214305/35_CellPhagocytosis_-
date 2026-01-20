import { useAppStore } from '../utils/store'
import { PROCESS_INFO } from '../utils/constants'

const InfoPanel = () => {
  const { currentProcess } = useAppStore()
  const info = PROCESS_INFO[currentProcess]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-bio-text mb-4">过程详解</h2>

      {/* 描述 */}
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed">{info.description}</p>
      </div>

      {/* 类型 */}
      <div>
        <h3 className="font-semibold text-bio-text mb-3">主要类型</h3>
        <div className="space-y-3">
          {info.types.map((type, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-cell-cytoplasm border border-cell-vesicle"
            >
              <h4 className="font-semibold text-cell-organelle mb-1">{type.name}</h4>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InfoPanel
