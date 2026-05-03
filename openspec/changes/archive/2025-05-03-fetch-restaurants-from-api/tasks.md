## 1. API 客户端配置

- [x] 1.1 创建 API 配置文件 `src/config/api.js`，定义 `API_BASE_URL` 默认为 `http://localhost:8080`
- [x] 1.2 添加环境变量支持，读取 `REACT_APP_API_URL` 覆盖默认配置
- [x] 1.3 导出 API 端点常量 `RESTAURANTS_ENDPOINT = '/api/restaurants'`

## 2. 数据获取 Hook

- [x] 2.1 创建自定义 Hook `src/hooks/useRestaurants.js`
- [x] 2.2 实现 `useEffect` 在组件挂载时调用 `fetch` 获取 `/api/restaurants`
- [x] 2.3 添加 `loading` 状态管理，初始为 `true`，请求完成后设为 `false`
- [x] 2.4 添加 `error` 状态管理，捕获请求失败错误
- [x] 2.5 实现数据转换逻辑，将后端 `{id, name, description}` 转换为前端格式并添加默认 `type: 'chinese'`
- [x] 2.6 导出 `{ restaurants, loading, error, refetch }` 供组件使用

## 3. 组件集成

- [x] 3.1 修改 `RestaurantSelector.jsx`，移除硬编码的 `restaurants` useState 初始值
- [x] 3.2 引入 `useRestaurants` Hook 获取动态数据
- [x] 3.3 更新 `infiniteRestaurants` 计算逻辑，处理空数据情况
- [x] 3.4 确保 `useResponsiveSizes` 和其他逻辑正常工作

## 4. UI 状态处理

- [x] 4.1 添加加载状态 UI：当 `loading` 为 `true` 时显示 "加载中..." 或 loading spinner
- [x] 4.2 添加错误状态 UI：当 `error` 存在时显示错误信息和 "重试" 按钮
- [x] 4.3 添加空数据状态 UI：当 `restaurants` 为空数组时显示 "暂无餐厅数据"
- [x] 4.4 正常状态 UI：数据加载完成后显示卡片列表（保持现有布局和交互）

## 5. 测试验证

- [x] 5.1 启动后端服务 `cd restaurant-api && go run .`
- [x] 5.2 验证后端 API 正常：`curl http://localhost:8080/api/restaurants` 返回 13 家餐厅列表
- [x] 5.3 启动前端 `cd miximixi && npm run dev`（端口 3000）
- [x] 5.4 打开浏览器访问 http://localhost:3000，餐厅卡片从 API 加载并正确显示
- [x] 5.5 测试错误状态：停止后端服务，刷新页面，确认显示错误提示（UI样式已调整完成）
- [x] 5.6 测试空数据状态：已清空数据库并验证显示"暂无餐厅数据"，UI样式调整完成，数据已恢复
