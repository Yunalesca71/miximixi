# <img src="./miximixi/public/assets/images/title.png" alt="Miximixi" width="60"> Miximixi - 3D餐厅选择器

一个基于React、Vite和Three.js构建的3D餐厅选择应用，提供交互式卡片界面，带有炫酷的3D动画效果和后处理特效。

## 功能特点

- **3D卡片交互**：使用Three.js渲染的3D餐厅卡片，支持翻转和选择动画
- **随机选择**：一键随机选择餐厅，告别选择困难症
- **炫酷动画**：GSAP驱动的流畅过渡动画效果
- **后处理特效**：@react-three/postprocessing提供视觉增强
- **响应式设计**：使用react-responsive适配移动端、平板和桌面
- **无限滚动**：三重复制卡牌实现无缝无限循环滚动

## 技术栈

- **前端框架**：React 19 + Vite 4
- **3D图形**：Three.js + @react-three/fiber
- **动画库**：GSAP 3
- **后处理**：@react-three/postprocessing
- **响应式设计**：react-responsive
- **性能优化**：react-window

## 项目结构

```
miximixi/
├── .windsurf/          # Windsurf AI技能和自动化工作流
├── miximixi/           # 主React应用源码
│   ├── public/         # 静态资源（字体、图片）
│   ├── src/            # React组件和应用逻辑
│   │   ├── components/ # 可复用组件
│   │   ├── hooks/      # 自定义Hooks（响应式设计）
│   │   ├── App.jsx     # 主应用入口
│   │   └── index.css   # 全局样式
│   └── dist/           # 构建输出目录
├── openspec/           # OpenSpec驱动开发文档
│   ├── changes/        # 功能变更规格
│   └── specs/          # 详细技术规格
└── AGENTS.md          # AI代理指南
```

## 快速开始

### 安装依赖

```bash
cd miximixi
npm install
```

### 启动开发服务器

```bash
npm run dev
```

服务将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 核心组件

### RestaurantSelector

核心组件，管理3D卡片选择逻辑：
- 处理用户交互事件（滚轮滚动）
- 触发选择动画
- 管理餐厅数据状态
- 实现无限滚动（三重复制卡牌）
- 响应式布局适配

### useResponsive Hook

自定义响应式Hook，提供统一的屏幕尺寸检测：
- 移动端（<768px）
- 平板端（768px-1023px）
- 桌面端（≥1024px）
- 动态计算字体、按钮、卡牌尺寸

### 3D场景架构

```
React App
├── App Component (Header + RestaurantSelector)
│   ├── useResponsive Hook (Responsive sizing)
│   └── RestaurantSelector Component
│       ├── Control Panel (Buttons)
│       ├── Cards Container (Infinite scroll)
│       │   └── 3D Card Models (Triple duplication)
│       ├── GSAP Animations (Card scaling)
│       └── Scroll Event Handling (Wheel + Scroll)
└── Asset Loading (Fonts & Images)
```

## 开发指南

### 代码规范

- 使用React函数组件和Hooks
- CSS样式使用全局样式表（index.css）
- 组件命名采用PascalCase
- 分支命名使用kebab-case（如：`add-feature-name`）

### Git工作流

1. 从main分支创建功能分支
2. 提交描述性commit消息
3. 通过PR合并到main（不要直接push到main）

## 自定义资源

- **字体**：添加字体文件到 `public/assets/fonts/`
- **图片**：添加图片资源到 `public/assets/images/`
- **餐厅数据**：在RestaurantSelector组件中配置餐厅列表

## 后续优化方向

- [ ] 添加ESLint和Prettier代码规范
- [ ] 配置测试框架（Jest/Vitest）
- [ ] 添加E2E测试（Playwright/Cypress）
- [ ] 配置CI/CD自动化部署
- [ ] 优化3D性能（LOD、纹理压缩）
- [ ] 添加更多餐厅数据源支持

## 文档

- [AGENTS.md](./AGENTS.md) - AI代理开发指南
- [OpenSpec文档](./openspec/) - 功能规格和变更记录
- [Windsurf技能](./.windsurf/skills/) - AI自动化工作流

## 技术参考

- [React Three Fiber 文档](https://docs.pmnd.rs/react-three-fiber)
- [GSAP 文档](https://greensock.com/docs/)
- [Three.js 文档](https://threejs.org/docs/)
- [Vite 文档](https://vitejs.dev/guide/)

## 许可证

MIT License

---

**Miximixi** - 让选择餐厅变得有趣！🎲🍜
