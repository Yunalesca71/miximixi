## Context

前端 `RestaurantSelector` 组件已从后端 API 动态获取餐厅数据，不再使用硬编码的列表。

**实现概览：**
- API 配置: `src/config/api.js` - 使用 `import.meta.env.VITE_API_URL` 或默认 `http://localhost:8080`
- 数据 Hook: `src/hooks/useRestaurants.js` - 封装数据获取、loading、error 和 refetch 功能
- 组件集成: `RestaurantSelector.jsx` - 使用 `useRestaurants` 获取数据，支持加载/错误/空数据状态

**后端 API 信息：**
- Base URL: `http://localhost:8080`
- 端点: `GET /api/restaurants`
- 响应格式: `[{ id, name, description }]`
- CORS: 已配置允许前端跨域访问
- 数据库: 已填充 13 家餐厅数据（包括爱虾乃家、海底捞、W Cafe 等）

## Goals / Non-Goals

**Goals:**
- 实现前端从后端 API 动态获取餐厅列表
- 添加加载状态显示，提升用户体验
- 添加错误处理机制，处理 API 调用失败
- 保持现有 UI 交互功能（无限滚动、卡片缩放等）

**Non-Goals:**
- 不修改后端 API（后端已完成）
- 不添加数据缓存机制（后续迭代考虑）
- 不实现餐厅数据的增删改功能（保持只读）

## Decisions

**1. 使用 fetch API 还是 axios？**
- **选择**: 使用原生 fetch API
- **理由**: 项目已有 Vite 构建，无需额外依赖；简单 GET 请求场景下 fetch 足够；减少包体积

**2. 数据获取时机？**
- **选择**: 组件挂载时（useEffect）发起请求
- **理由**: 餐厅数据是展示核心，需要在用户看到卡片前加载完成

**3. 错误处理策略？**
- **选择**: 降级显示：API 失败时显示错误提示和重试按钮，同时保留空的卡片区域
- **理由**: 避免页面白屏，给用户明确的反馈和操作路径

**4. 数据结构转换？**
- **选择**: 后端返回 `{id, name, description}`，前端保留现有结构 `{id, name, description, type}`
- **理由**: 后端暂无 `type` 字段，但前端 UI 依赖它进行样式分类；暂时给所有餐厅一个默认 type，后续后端可扩展

**5. API 地址配置？**
- **选择**: 使用 Vite 的 `import.meta.env.VITE_API_URL` 或默认 `http://localhost:8080`
- **理由**: Vite 项目使用 `import.meta.env` 而非 `process.env`，设置 `VITE_API_URL` 环境变量即可覆盖默认地址

## Risks / Trade-offs

**[后端服务未启动] → 检测与提示**
- 风险：用户启动前端但忘记启动后端
- 缓解：fetch 失败时捕获错误，显示友好提示 "请先启动后端服务 (cd restaurant-api && go run .)"

**[网络延迟] → 加载状态**
- 风险：API 响应慢导致卡片区域空白
- 缓解：添加 loading 状态，显示"加载中..."提示

**[数据结构不匹配] → 默认处理**
- 风险：后端返回数据缺少前端需要的 `type` 字段
- 缓解：为所有餐厅设置默认 `type: 'chinese'`，后续后端可添加该字段

**[CORS 问题] → 已配置**
- 风险：跨域请求被浏览器阻止
- 缓解：后端已配置 CORS 中间件，允许所有来源访问

## Migration Plan

**部署步骤（已完成）：**
1. ✅ 启动后端服务: `cd restaurant-api && go run .`
2. ✅ 验证后端运行: `curl http://localhost:8080/api/restaurants`（已填充 13 家餐厅）
3. ✅ 启动前端服务: `cd miximixi && npm run dev`
4. ✅ 访问前端页面 http://localhost:3000，餐厅列表已从 API 加载

**使用方式：**
- 默认访问本地后端 `http://localhost:8080`
- 如需自定义后端地址，设置环境变量：`VITE_API_URL=http://your-api:8080 npm run dev`
