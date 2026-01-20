import { useState } from 'react'
import CellSimulation from './components/CellSimulation'
import ProcessSelector from './components/ProcessSelector'
import InfoPanel from './components/InfoPanel'
import SettingsPanel from './components/SettingsPanel'
import { useAppStore } from './utils/store'

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const { currentProcess } = useAppStore()

  return (
    <div className="min-h-screen bg-bio-background">
      {/* 顶部导航栏 */}
      <header className="bg-cell-membrane text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">细胞吞吐法则</h1>
              <p className="text-sm md:text-base text-cell-vesicle mt-1">
                从"吃"到"扔"：解码细胞世界的吞吐法则
              </p>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 md:p-3 rounded-lg bg-cell-organelle hover:bg-cell-vesicle transition-colors"
              aria-label="设置"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：过程选择器和信息面板 */}
          <div className="lg:col-span-1 space-y-6">
            <ProcessSelector />
            <InfoPanel />
          </div>

          {/* 右侧：细胞模拟动画 */}
          <div className="lg:col-span-2">
            <CellSimulation />
          </div>
        </div>
      </main>

      {/* 设置面板（侧边栏） */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}

      {/* 页脚 */}
      <footer className="bg-cell-membrane text-white mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">本项目由阿里云ESA提供加速、计算和保护</h3>
            <img
              src="https://img.alicdn.com/imgextra/i3/O1CN01H1UU3i1Cti9lYtFrs_!!6000000000139-2-tps-7534-844.png"
              alt="阿里云ESA"
              className="mx-auto h-8 md:h-10 object-contain"
            />
          </div>
          <p className="text-sm text-cell-vesicle">
            © 2026 细胞吞吐法则 - 生物学动态演示平台
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
