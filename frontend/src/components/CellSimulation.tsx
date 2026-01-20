import { useEffect, useRef, useState } from 'react'
import { useAppStore } from '../utils/store'
import { CELL_COLORS, PROCESS_INFO } from '../utils/constants'

const CellSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const { currentProcess, isPlaying, speed } = useAppStore()
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 动画参数
    let time = 0
    const cellRadius = Math.min(canvas.width, canvas.height) * 0.3
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // 粒子系统
    const particles: Array<{
      x: number
      y: number
      radius: number
      angle: number
      distance: number
      speed: number
    }> = []

    // 初始化粒子
    for (let i = 0; i < 8; i++) {
      particles.push({
        x: 0,
        y: 0,
        radius: 8,
        angle: (Math.PI * 2 * i) / 8,
        distance: cellRadius + 100,
        speed: 0.02,
      })
    }

    // 绘制细胞膜
    const drawMembrane = (ctx: CanvasRenderingContext2D, time: number) => {
      ctx.beginPath()
      for (let i = 0; i <= 360; i += 5) {
        const angle = (i * Math.PI) / 180
        const wave = Math.sin(time * 0.5 + angle * 3) * 5
        const r = cellRadius + wave
        const x = centerX + r * Math.cos(angle)
        const y = centerY + r * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.strokeStyle = CELL_COLORS.membrane
      ctx.lineWidth = 4
      ctx.stroke()

      // 填充细胞质
      ctx.fillStyle = CELL_COLORS.cytoplasm
      ctx.fill()
    }

    // 绘制细胞核
    const drawNucleus = (ctx: CanvasRenderingContext2D) => {
      ctx.beginPath()
      ctx.arc(centerX, centerY, cellRadius * 0.3, 0, Math.PI * 2)
      ctx.fillStyle = CELL_COLORS.nucleus
      ctx.fill()
      ctx.strokeStyle = CELL_COLORS.organelle
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // 绘制细胞器
    const drawOrganelles = (ctx: CanvasRenderingContext2D, time: number) => {
      const organelles = [
        { x: centerX - 80, y: centerY - 60, r: 15 },
        { x: centerX + 70, y: centerY - 50, r: 12 },
        { x: centerX - 60, y: centerY + 70, r: 18 },
        { x: centerX + 80, y: centerY + 60, r: 14 },
      ]

      organelles.forEach((org, i) => {
        const pulse = Math.sin(time * 0.3 + i) * 2
        ctx.beginPath()
        ctx.arc(org.x, org.y, org.r + pulse, 0, Math.PI * 2)
        ctx.fillStyle = CELL_COLORS.organelle
        ctx.fill()
        ctx.strokeStyle = CELL_COLORS.vesicle
        ctx.lineWidth = 1
        ctx.stroke()
      })
    }

    // 绘制内吞过程
    const drawEndocytosis = (ctx: CanvasRenderingContext2D, time: number) => {
      particles.forEach((particle, i) => {
        // 更新粒子位置
        if (isPlaying) {
          particle.angle += particle.speed * speed
          particle.distance = Math.max(
            cellRadius * 0.4,
            particle.distance - 0.5 * speed
          )
        }

        particle.x = centerX + particle.distance * Math.cos(particle.angle)
        particle.y = centerY + particle.distance * Math.sin(particle.angle)

        // 绘制粒子
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = CELL_COLORS.particle
        ctx.fill()
        ctx.strokeStyle = CELL_COLORS.membrane
        ctx.lineWidth = 2
        ctx.stroke()

        // 如果粒子接近细胞膜，绘制囊泡形成
        if (particle.distance < cellRadius + 20 && particle.distance > cellRadius - 20) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius + 8, 0, Math.PI * 2)
          ctx.strokeStyle = CELL_COLORS.vesicle
          ctx.lineWidth = 2
          ctx.setLineDash([5, 5])
          ctx.stroke()
          ctx.setLineDash([])
        }
      })
    }

    // 绘制外排过程
    const drawExocytosis = (ctx: CanvasRenderingContext2D, time: number) => {
      particles.forEach((particle, i) => {
        // 更新粒子位置（从内向外）
        if (isPlaying) {
          particle.angle += particle.speed * speed
          particle.distance = Math.min(
            cellRadius + 150,
            particle.distance + 0.5 * speed
          )
        }

        particle.x = centerX + particle.distance * Math.cos(particle.angle)
        particle.y = centerY + particle.distance * Math.sin(particle.angle)

        // 绘制粒子
        const alpha = Math.max(0, 1 - (particle.distance - cellRadius) / 150)
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = CELL_COLORS.particle
        ctx.fill()
        ctx.strokeStyle = CELL_COLORS.membrane
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.globalAlpha = 1

        // 如果粒子接近细胞膜，绘制囊泡融合
        if (particle.distance < cellRadius + 20 && particle.distance > cellRadius - 20) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius + 8, 0, Math.PI * 2)
          ctx.strokeStyle = CELL_COLORS.vesicle
          ctx.lineWidth = 2
          ctx.setLineDash([5, 5])
          ctx.stroke()
          ctx.setLineDash([])
        }
      })
    }

    // 主动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制背景
      ctx.fillStyle = '#F8FAFA'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 绘制细胞结构
      drawMembrane(ctx, time)
      drawNucleus(ctx)
      drawOrganelles(ctx, time)

      // 根据当前过程绘制动画
      if (currentProcess === 'endocytosis') {
        drawEndocytosis(ctx, time)
      } else {
        drawExocytosis(ctx, time)
      }

      if (isPlaying) {
        time += 0.02 * speed
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [currentProcess, isPlaying, speed])

  const processInfo = PROCESS_INFO[currentProcess]
  const steps = processInfo.steps

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* 画布容器 */}
      <div className="relative bg-bio-background" style={{ height: '500px' }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ touchAction: 'none' }}
        />

        {/* 控制按钮 */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
          <button
            onClick={() => useAppStore.setState({ isPlaying: !isPlaying })}
            className="p-2 rounded-full bg-cell-organelle hover:bg-cell-vesicle text-white transition-colors"
            aria-label={isPlaying ? '暂停' : '播放'}
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-bio-text">速度</span>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => useAppStore.setState({ speed: parseFloat(e.target.value) })}
              className="w-24"
            />
            <span className="text-sm text-bio-text w-8">{speed.toFixed(1)}x</span>
          </div>
        </div>
      </div>

      {/* 步骤说明 */}
      <div className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-bio-text mb-4">过程步骤</h3>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border-2 transition-all ${
                currentStep === index
                  ? 'border-cell-organelle bg-cell-cytoplasm'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    currentStep === index
                      ? 'bg-cell-organelle text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-bio-text mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CellSimulation
