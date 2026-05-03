## ADDED Requirements

### Requirement: 从后端 API 获取餐厅列表
前端组件必须在挂载时从后端 API 获取餐厅数据。

#### Scenario: 成功获取餐厅列表
- **WHEN** 组件挂载时
- **THEN** 发送 GET 请求到 `http://localhost:8080/api/restaurants`
- **THEN** 成功响应后将数据设置到 restaurants 状态
- **THEN** 卡片列表正常显示所有餐厅

#### Scenario: 显示加载状态
- **WHEN** API 请求进行中
- **THEN** 显示加载指示器或 "加载中..." 提示
- **THEN** 卡片区域显示占位状态或禁用交互

#### Scenario: API 请求失败处理
- **WHEN** API 请求失败（网络错误或后端未启动）
- **THEN** 捕获错误并在控制台记录
- **THEN** 显示友好错误提示 "无法加载餐厅数据，请检查后端服务是否运行"
- **THEN** 提供重试按钮允许用户重新加载

#### Scenario: 后端返回空列表
- **WHEN** 后端返回空数组 []
- **THEN** 显示提示 "暂无餐厅数据"
- **THEN** 不显示任何卡片

### Requirement: 数据格式转换
后端返回的数据需要转换为前端组件使用的格式。

#### Scenario: 数据结构转换
- **WHEN** 后端返回 `[{id, name, description}]`
- **THEN** 转换为前端格式 `{id, name, description, type}`
- **THEN** `type` 字段默认设置为 `'chinese'`（后续后端可扩展）

### Requirement: API 地址配置
API 基础地址应可配置，便于不同环境使用。

#### Scenario: 使用默认地址
- **WHEN** 未配置环境变量
- **THEN** 使用默认地址 `http://localhost:8080`

#### Scenario: 使用自定义地址
- **WHEN** 配置了 `VITE_API_URL` 环境变量（Vite 项目使用 `import.meta.env`）
- **THEN** 使用环境变量指定的地址覆盖默认地址
