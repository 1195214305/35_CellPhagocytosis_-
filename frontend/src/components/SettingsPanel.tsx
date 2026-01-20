import { useState } from 'react'
import { useAppStore } from '../utils/store'

interface SettingsPanelProps {
  onClose: () => void
}

const SettingsPanel = ({ onClose }: SettingsPanelProps) => {
  const { qianwenApiKey, setQianwenApiKey } = useAppStore()
  const [tempKey, setTempKey] = useState(qianwenApiKey)
  const [showKey, setShowKey] = useState(false)

  const handleSave = () => {
    setQianwenApiKey(tempKey)
    alert('千问API Key已保存')
  }

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* 侧边栏 */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* 头部 */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-bio-text">设置</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="关闭"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 千问API配置 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-bio-text mb-4">千问API配置</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={tempKey}
                    onChange={(e) => setTempKey(e.target.value)}
                    placeholder="请输入千问API Key"
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cell-organelle focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
                    aria-label={showKey ? '隐藏' : '显示'}
                  >
                    {showKey ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  配置千问API Key后，可以使用AI辅助功能解答生物学问题
                </p>
              </div>

              <button
                onClick={handleSave}
                className="w-full py-2 px-4 bg-cell-organelle hover:bg-cell-vesicle text-white font-semibold rounded-lg transition-colors"
              >
                保存配置
              </button>
            </div>
          </div>

          {/* 学习进度 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-bio-text mb-4">学习进度</h3>
            <div className="space-y-4">
              {Object.entries(PROCESS_INFO).map(([key, info]) => {
                const progress = useAppStore.getState().learningProgress[key as keyof typeof useAppStore.getState().learningProgress]
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{info.title}</span>
                      <span className="text-sm text-gray-500">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-cell-organelle h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 关于 */}
          <div>
            <h3 className="text-lg font-semibold text-bio-text mb-4">关于项目</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                本项目通过动态可视化演示，帮助学习者理解细胞的内吞和外排过程。
              </p>
              <p>
                项目采用Canvas动画技术，实时渲染细胞膜、细胞质、细胞核和囊泡的运动过程。
              </p>
              <p className="text-xs text-gray-500 pt-4 border-t">
                版本：1.0.0<br />
                技术栈：React + TypeScript + Canvas + ESA Pages
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsPanel
