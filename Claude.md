# AI Consciousness Watch 项目总结

## 项目概述

AI Consciousness Watch 是一个用于监控和评估AI意识发展的仪表板应用，通过哲学、神经科学和心理学三个维度来分析AI意识水平。

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS v4 + 内联样式
- **字体**: MiSans（通过CDN引入）
- **图标**: RemixIcon（通过CDN引入）
- **数据源**: JSON文件 (`public/ai-consciousness-watch.json`)

## 项目结构

```
frontend/
├── public/
│   ├── ai-consciousness-watch.json    # 数据源文件
│   └── template.html                  # UI设计模板
├── src/
│   ├── App.tsx                        # 主组件
│   ├── main.tsx                       # 应用入口
│   ├── style.css                      # 全局样式
│   └── components/                    # 组件目录（已迁移至App.tsx）
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 核心功能

### 1. 智能圆环图表可视化 (最新改进)
- **单圆环设计**：展示三个维度的权重比例(哲学40%：神经科学20%：认知科学40%)
- **动态交互效果**：
  - 默认状态：深色分段显示，按权重比例分布，从正上方开始逆时针排列
  - 悬停状态：选中颜色充满整个圆环，显示该维度的支持度进度
- **精确定位**：
  - SVG viewBox: `"0 0 120 120"` (避免粗线条被剪切)
  - 圆心坐标: `(60, 60)`，半径: `45`，线宽: `12`
  - 起始角度: 正上方(0°)，逆时针方向排布
- **进度动画**：
  - 悬停时从正上方开始顺时针填充到对应百分比
  - 使用负偏移值 `strokeDashoffset="-${2 * Math.PI * 45 * 0.25}"` 确保起点正确
  - 平滑过渡动画: `transition: 'stroke-dasharray 0.6s ease-out'`

### 2. 增强的图例交互
- **智能状态指示**：
  - 悬停时颜色指示器显示进度条效果
  - 选中状态边框高亮和主题色变化
  - 实时显示评分和权重信息
- **视觉反馈**：
  - 悬停背景: `rgba(0, 0, 0, 0.08)` + 主题色边框
  - 文字颜色动态变化匹配主题
  - 说明文字根据状态切换("Overview Mode" ↔ "Focused View")

### 3. 详细信息卡片
- 三栏布局展示各维度详细信息
- 卡片悬停效果：向上移动5px + 增强阴影
- 包含该维度下的指标和相关论文信息
- 可折叠的论文列表（Papers部分）

## 数据结构

```typescript
interface Level {
  id: string;
  title: string;        // 维度名称（如"哲学 Philosophy"）
  subtitle: string;     // 维度描述
  average: string;      // 平均评分（如"7.2/10"）
  weight: string;       // 权重信息（如"Weight: 40%"）
  metrics: Metric[];    // 该维度下的指标
}

interface Metric {
  id: string;
  name: string;
  papers: Paper[];      // 该指标相关的论文
}

interface Paper {
  id: string;
  title: string;
  support: string;      // 支持度百分比（如"85%"）
}
```

## 重要配置

### tsconfig.json
```json
{
  "compilerOptions": {
    "jsx": "react-jsx"  // 必需配置，支持React 18的新JSX转换
  }
}
```

### 图标映射
- **哲学**: `ri-book-open-line`
- **神经科学**: `ri-cpu-line`  
- **心理学**: `ri-group-line`

### 颜色方案 (更新)
- **哲学**: 蓝色系 `#3b82f6` (深) / `#dbeafe` (浅)
- **神经科学**: 紫色系 `#8b5cf6` (深) / `#e7e5ff` (浅)  
- **认知科学**: 绿色系 `#22c55e` (深) / `#dcfce7` (浅)

### SVG技术细节 (重要)
- **坐标系统**: 使用更大的viewBox `"0 0 120 120"` 避免边缘剪切
- **角度计算**: 
  - 默认分段: 使用负偏移实现逆时针排布
  - 悬停进度: `strokeDashoffset="-${2 * Math.PI * 45 * 0.25}"` 确保从顶部开始
- **动画优化**: 分离默认状态(`opacity`)和悬停状态(`stroke-dasharray`)的过渡效果

## 开发注意事项

### 1. 圆环图表系统 (2025年8月更新)
- **默认显示**: 使用 `transition: 'opacity 0.3s ease'` 避免几何变形
- **悬停动画**: 专门的 `stroke-dasharray` 过渡确保进度平滑增长
- **SVG性能**: 通过精确的 `strokeDashoffset` 计算避免视觉错位

### 2. 状态管理
```javascript
const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

// 动态SVG渲染逻辑
{hoveredLevel ? (
  // 悬停状态：单色圆环 + 进度显示
  <圆环充满背景色 + 按百分比显示深色进度>
) : (
  // 默认状态：按权重分段显示
  <三个分段按4:2:4比例分布>
)}
```

### 2. 样式方案
- 主要使用React内联样式而非Tailwind类名
- 字体通过CDN引入，无需本地文件
- RemixIcon通过HTML head标签引入

### 3. 交互逻辑 (最新版本)
```javascript
// 图例悬停的完整交互逻辑
onMouseEnter={() => setHoveredLevel(colorSet.id)}
onMouseLeave={() => setHoveredLevel(null)}

// SVG动态渲染
{hoveredLevel === 'philosophy' && (
  <circle
    strokeDasharray={`${进度长度} ${剩余长度}`}
    strokeDashoffset={`-${2 * Math.PI * 45 * 0.25}`}  // 关键：负偏移确保从顶部开始
    transform="rotate(0 60 60)"  // 无需额外旋转
  />
)}
```

### 4. 常见问题解决 (更新)

**问题1**: SVG圆环边缘被剪切
- 解决：将viewBox从 `"0 0 100 100"` 改为 `"0 0 120 120"`，圆心从(50,50)改为(60,60)

**问题2**: 悬停进度条位置错误  
- 解决：使用负偏移 `strokeDashoffset="-${2 * Math.PI * 45 * 0.25}"` 确保从正上方开始

**问题3**: 鼠标离开时的恢复动画不自然
- 解决：分离过渡效果，默认状态只变化透明度，悬停状态变化stroke-dasharray

**问题4**: 圆环分段不是真正的逆时针排布
- 解决：使用负偏移值正确计算各分段位置，确保从0°开始逆时针排列

## 启动命令

```bash
cd frontend
npm install
npm run dev
```

默认运行在 `http://localhost:5173` (如端口被占用会自动切换)

## 项目历史

1. **初始版本**: 基于组件化架构，深色主题
2. **UI重构**: 根据template.html重新设计为浅色主题  
3. **数据适配**: 两次JSON数据结构更新适配
4. **图标修复**: 添加神经科学和心理学维度图标
5. **交互增强**: 实现图表段和卡片的悬停动画效果
6. **圆环图重构** (2025年8月): 
   - 从分段式圆环改为智能单圆环设计
   - 实现权重比例显示 + 悬停进度详情的双模式
   - 修复SVG定位和动画问题，确保从正上方开始的精确控制

## 当前功能特色

- ✅ **直观的权重展示**: 默认状态清晰显示各维度权重比例(4:2:4)
- ✅ **专注的详情模式**: 悬停时专注单一维度，显示具体支持度进度  
- ✅ **精确的视觉定位**: 从正上方0°开始，逆时针布局，进度从顶部增长
- ✅ **流畅的交互体验**: 平滑过渡动画，自然的状态切换
- ✅ **响应式设计**: 适配不同屏幕尺寸，保持视觉效果

## 后续维护建议

1. **数据更新**: 修改 `public/ai-consciousness-watch.json` 即可更新显示内容
2. **样式调整**: 主要样式集中在 `App.tsx` 的内联样式和SVG属性中
3. **新增维度**: 需要同时更新数据结构、颜色方案、权重计算和SVG分段逻辑
4. **性能优化**: 当前SVG动画性能良好，如需优化可考虑使用CSS animation代替JS过渡
5. **交互扩展**: 可考虑添加点击锁定功能，让用户可以固定在某个维度的详情视图

---

*此文档记录了项目的完整技术上下文，包含了开发过程中遇到的主要问题和解决方案，便于后续开发者快速了解和接手项目。*
