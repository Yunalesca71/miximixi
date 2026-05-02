## ADDED Requirements

### Requirement: Swagger UI 集成
服务必须提供交互式 API 文档界面。

#### Scenario: 访问 Swagger UI
- **WHEN** 浏览器访问 /swagger/index.html
- **THEN** 显示所有 API 端点的可交互文档，支持直接测试请求

#### Scenario: OpenAPI JSON Spec
- **WHEN** 访问 /swagger/doc.json
- **THEN** 返回符合 OpenAPI 2.0 (Swagger 2.0) 规范的 JSON 文档

#### Scenario: Swagger UI 静态资源
- **WHEN** 访问 /swagger/index.html
- **THEN** 服务从 swagger/ 目录提供静态 HTML 文件

### Requirement: Health Check 端点
提供健康检查端点用于服务状态监控。

#### Scenario: 健康检查成功
- **WHEN** 发送 GET /health
- **THEN** 返回 HTTP 200，JSON 响应 {"status":"ok"}

### Requirement: API 端点注解
所有处理器函数必须包含 Swagger 注释。

#### Scenario: 端点文档完整性
- **WHEN** 查看任意 API 端点的 Swagger 文档
- **THEN** 显示摘要、描述、请求参数、响应格式和状态码说明

#### Scenario: 数据模型文档
- **WHEN** 查看 Swagger 文档
- **THEN** 显示 Restaurant、CreateRestaurantRequest、UpdateRestaurantRequest、ErrorResponse 等模型定义

### Requirement: CORS 支持
API 必须支持跨域请求。

#### Scenario: 跨域预检请求
- **WHEN** 浏览器发送 OPTIONS 预检请求
- **THEN** 返回允许的源、方法和头信息

#### Scenario: 跨域实际请求
- **WHEN** 前端从不同域名调用 API
- **THEN** 响应包含 Access-Control-Allow-Origin 头
