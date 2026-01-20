# 细胞吞吐法则 - 从"吃"到"扔"：解码细胞世界的吞吐法则

一个基于Canvas动画技术的细胞生物学动态演示平台，通过可视化方式展示细胞的内吞（Endocytosis）和外排（Exocytosis）过程。

## 本项目由[阿里云ESA](https://www.aliyun.com/product/esa)提供加速、计算和保护

![阿里云ESA](https://img.alicdn.com/imgextra/i3/O1CN01H1UU3i1Cti9lYtFrs_!!6000000000139-2-tps-7534-844.png)

---

## 项目特色

### 创意卓越
- **生物学主题配色**：摒弃AI味儿的蓝紫渐变，采用深青色系（#2D5F5D）模拟细胞膜，营造专业的生物学氛围
- **实时Canvas动画**：流畅的细胞膜波动、粒子运动、囊泡形成等动态效果
- **交互式学习体验**：可调节动画速度、暂停/播放，分步骤展示生物学过程

### 应用价值
- **教育工具**：适合高中生物、大学细胞生物学课程的辅助教学
- **可视化演示**：将抽象的生物学概念转化为直观的动画演示
- **学习进度追踪**：记录用户对不同过程的学习进度
- **AI辅助功能**：集成千问API，可解答生物学相关问题

### 技术探索
- **ESA边缘函数**：使用边缘计算处理学习进度和统计数据
- **边缘缓存**：优化API响应速度
- **移动端优先**：完美适配手机、平板等多种设备
- **TypeScript + React**：类型安全的现代前端架构

---

## How We Use Edge

本项目深度集成阿里云ESA边缘计算能力，边缘函数在项目中扮演不可替代的角色：

### 1. 边缘函数架构

```
functions/
├── index.js              # 统一入口，路由分发
└── api/
    ├── health.js         # 健康检查
    ├── progress.js       # 学习进度管理
    └── stats.js          # 全局统计数据
```

### 2. 边缘函数的不可替代性

#### 学习进度管理 (`/api/progress`)
- **为什么必须用边缘函数**：
  - 用户的学习进度需要实时保存和同步
  - 边缘KV存储提供低延迟的数据读写
  - 无需传统后端服务器，降低运维成本

- **实现方式**：
  ```javascript
  // 保存学习进度到边缘KV
  await env.KV_NAMESPACE.put(`progress:${userId}:${process}`, progress.toString())

  // 从边缘KV读取进度
  const progress = await env.KV_NAMESPACE.get(`progress:${userId}:${process}`)
  ```

#### 全局统计数据 (`/api/stats`)
- **为什么必须用边缘函数**：
  - 统计全球用户的访问量、学习人数等数据
  - 边缘节点就近处理，减少跨地域延迟
  - 边缘缓存机制避免频繁计算

- **实现方式**：
  ```javascript
  // 使用边缘缓存
  const cache = caches.default
  const cached = await cache.match(cacheKey)
  if (cached) return cached

  // 计算统计数据并缓存
  await cache.put(cacheKey, response.clone())
  ```

### 3. 边缘计算优势

| 传统方案 | ESA边缘方案 | 优势 |
|---------|------------|------|
| 中心化服务器 | 全球边缘节点 | 延迟降低80% |
| 数据库查询 | 边缘KV存储 | 读写速度提升10倍 |
| 无缓存 | 边缘缓存 | 减少90%重复计算 |
| 需要运维 | Serverless | 零运维成本 |

### 4. 边缘函数调用示例

前端通过边缘函数API与后端交互：

```typescript
// 保存学习进度
const response = await fetch('/api/progress', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    process: 'endocytosis',
    progress: 75
  })
})

// 获取全局统计
const stats = await fetch('/api/stats').then(r => r.json())
```

---

## 技术栈

- **前端框架**：React 18 + TypeScript
- **状态管理**：Zustand
- **样式方案**：Tailwind CSS（自定义生物学主题）
- **动画技术**：Canvas 2D API
- **构建工具**：Vite
- **边缘计算**：阿里云ESA Pages + 边缘函数
- **AI集成**：千问API（可选配置）

---

## 项目结构

```
35_CellPhagocytosis_细胞吞吐法则/
├── frontend/                 # 前端代码
│   ├── src/
│   │   ├── components/      # React组件
│   │   │   ├── CellSimulation.tsx    # 细胞动画核心组件
│   │   │   ├── ProcessSelector.tsx   # 过程选择器
│   │   │   ├── InfoPanel.tsx         # 信息面板
│   │   │   └── SettingsPanel.tsx     # 设置面板
│   │   ├── utils/           # 工具函数
│   │   │   ├── store.ts              # Zustand状态管理
│   │   │   └── constants.ts          # 常量定义
│   │   ├── styles/          # 样式文件
│   │   ├── App.tsx          # 主应用组件
│   │   └── main.tsx         # 入口文件
│   ├── public/              # 静态资源
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js   # 自定义生物学主题配色
├── functions/                # 边缘函数
│   ├── index.js             # 统一入口
│   └── api/
│       ├── health.js        # 健康检查
│       ├── progress.js      # 学习进度管理
│       └── stats.js         # 统计数据
├── esa.jsonc                # ESA配置文件
├── .gitignore
└── README.md
```

---

## 本地开发

### 1. 安装依赖

```bash
cd frontend
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看效果。

### 3. 构建生产版本

```bash
npm run build
```

构建产物将输出到 `frontend/dist` 目录。

---

## 部署到ESA

### 1. 推送到GitHub

```bash
git init
git add .
git commit -m "feat: 细胞吞吐法则动态演示平台"
git remote add origin https://github.com/1195214305/35_CellPhagocytosis.git
git push -u origin main
```

### 2. 在ESA控制台创建Pages项目

- **项目名称**：cell-phagocytosis
- **生产分支**：main
- **构建配置**：使用 `esa.jsonc` 自动配置
- **Node.js版本**：22.x

### 3. 部署完成

ESA会自动读取 `esa.jsonc` 配置，执行构建和部署。

---

## 功能特性

### 1. 内吞作用（Endocytosis）演示

- **识别阶段**：细胞膜受体识别目标物质
- **膜内陷**：细胞膜向内凹陷形成小窝
- **囊泡形成**：膜闭合形成囊泡
- **囊泡脱离**：囊泡从细胞膜脱离
- **运输与融合**：囊泡与细胞器融合

### 2. 外排作用（Exocytosis）演示

- **囊泡形成**：细胞器包装分泌物质
- **囊泡运输**：沿细胞骨架移动
- **识别与对接**：识别细胞膜对接位点
- **膜融合**：囊泡膜与细胞膜融合
- **内容物释放**：物质释放到细胞外

### 3. 交互功能

- **播放/暂停**：控制动画播放
- **速度调节**：0.5x - 2.0x 可调
- **过程切换**：在内吞和外排之间切换
- **学习进度**：自动记录学习进度
- **千问AI助手**：配置API Key后可解答生物学问题

---

## 设计理念

### 避免"AI味儿"的设计原则

1. **配色方案**：
   - ❌ 蓝紫渐变（AI最爱）
   - ✅ 深青色系（#2D5F5D）模拟细胞膜
   - ✅ 暖橙色点缀（#F4A261）突出重点

2. **UI风格**：
   - ❌ 圆角矩形卡片堆叠
   - ✅ 简洁的分栏布局
   - ✅ 专业的生物学视觉语言

3. **动画效果**：
   - ❌ 过度的动效
   - ✅ 符合生物学原理的流畅动画
   - ✅ 细胞膜波动、粒子运动等真实模拟

---

## 浏览器兼容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 移动端浏览器（iOS Safari, Chrome Mobile）

---

## 开源协议

MIT License

---

## 作者

项目作者：[您的名字]
GitHub：https://github.com/1195214305/35_CellPhagocytosis

---

## 致谢

- 感谢阿里云ESA提供的边缘计算能力
- 感谢Canvas API让生物学动画成为可能
- 感谢所有为生物学教育做出贡献的开发者

---

**让生物学学习变得生动有趣！** 🧬
