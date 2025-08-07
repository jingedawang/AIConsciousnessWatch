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

### 1. 甜甜圈图表可视化
- 显示三个维度的AI意识评分：哲学、神经科学、心理学
- 支持交互式悬停效果：鼠标悬停时段会放大(scale 1.05)
- 使用CSS渐变色彩区分不同维度
- 中心显示总体评分

### 2. 图例交互
- 右侧图例与甜甜圈图表联动
- 悬停图例项时：
  - 图例背景变为深色圆角背景 (`rgba(0, 0, 0, 0.08)`)
  - 对应的图表段同时放大
- 显示每个维度的评分和权重

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

### 颜色方案
- **哲学**: `linear-gradient(135deg, #3498db, #2980b9)` (蓝色)
- **神经科学**: `linear-gradient(135deg, #9b59b6, #8e44ad)` (紫色)
- **心理学**: `linear-gradient(135deg, #2ecc71, #27ae60)` (绿色)

## 开发注意事项

### 1. 动画系统
- 所有悬停动画使用 `transition: 'all 0.3s ease'`
- 图表段旋转角度：哲学(0°)、神经科学(144°)、心理学(216°)
- 段ID命名规范：`{维度}-segment` (如 `philosophy-segment`)

### 2. 样式方案
- 主要使用React内联样式而非Tailwind类名
- 字体通过CDN引入，无需本地文件
- RemixIcon通过HTML head标签引入

### 3. 交互逻辑
```javascript
// 图例悬停联动逻辑
onMouseEnter={(e) => {
  // 1. 找到对应的图表段
  const segment = document.getElementById(getSegmentId());
  if (segment) {
    // 2. 应用缩放效果（保持原有旋转角度）
    segment.style.transform = `${getRotation()} scale(1.05)`;
  }
  // 3. 图例背景变色
  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
}}
```

### 4. 常见问题解决

**问题1**: Tailwind样式冲突
- 解决：将RemixIcon从CSS导入改为HTML头部引入

**问题2**: JSX语法错误
- 解决：确保tsconfig.json中配置了 `"jsx": "react-jsx"`

**问题3**: 动画不生效
- 解决：检查元素ID是否正确设置，transform属性是否包含完整的旋转和缩放值

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

## 后续维护建议

1. **数据更新**: 修改 `public/ai-consciousness-watch.json` 即可更新显示内容
2. **样式调整**: 主要样式集中在 `App.tsx` 的内联样式中
3. **新增维度**: 需要同时更新数据结构、颜色方案、图标映射和角度计算
4. **性能优化**: 考虑将内联样式抽取为CSS类或使用styled-components

---

*此文档记录了项目的完整技术上下文，包含了开发过程中遇到的主要问题和解决方案，便于后续开发者快速了解和接手项目。*
