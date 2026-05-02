## ADDED Requirements

### Requirement: 餐厅数据模型
餐厅实体必须包含自增 ID、名称和简介字段。

#### Scenario: 数据库 Schema 定义
- **WHEN** 服务启动时
- **THEN** 自动创建 restaurants 表，包含 id (INTEGER PRIMARY KEY AUTOINCREMENT)、name (TEXT NOT NULL)、description (TEXT)

### Requirement: 获取所有餐厅
提供 API 端点返回全部餐厅列表。

#### Scenario: 成功获取餐厅列表
- **WHEN** 发送 GET 请求到 /api/restaurants
- **THEN** 返回 HTTP 200，JSON 数组包含所有餐厅对象

#### Scenario: 空列表返回
- **WHEN** 数据库中没有餐厅记录时发送 GET /api/restaurants
- **THEN** 返回 HTTP 200，空数组 []

#### Scenario: 数据库错误处理
- **WHEN** 数据库查询失败时发送 GET /api/restaurants
- **THEN** 返回 HTTP 500，错误信息 "failed to fetch restaurants"

### Requirement: 新增餐厅
提供 API 端点创建新餐厅记录。

#### Scenario: 成功创建餐厅
- **WHEN** 发送 POST /api/restaurants，Body 包含 name 和可选 description
- **THEN** 返回 HTTP 201，body 包含完整餐厅对象（含生成的 id）

#### Scenario: 缺少必填字段
- **WHEN** 发送 POST /api/restaurants，Body 缺少 name 字段
- **THEN** 返回 HTTP 400，错误信息 "name is required"

#### Scenario: 无效请求体
- **WHEN** 发送 POST /api/restaurants，Body 包含无效 JSON
- **THEN** 返回 HTTP 400，错误信息 "invalid request body"

#### Scenario: 数据库创建失败
- **WHEN** 发送 POST /api/restaurants，数据库操作失败
- **THEN** 返回 HTTP 500，错误信息 "failed to create restaurant"

### Requirement: 编辑餐厅简介
提供 API 端点修改现有餐厅的简介。

#### Scenario: 成功更新简介
- **WHEN** 发送 PUT /api/restaurants/{id}，Body 包含新的 name 和/或 description
- **THEN** 返回 HTTP 200，更新后的餐厅对象

#### Scenario: 更新不存在的餐厅
- **WHEN** 发送 PUT /api/restaurants/{id}，id 对应记录不存在
- **THEN** 返回 HTTP 404，错误信息 "restaurant not found"

#### Scenario: 无效 ID 格式
- **WHEN** 发送 PUT /api/restaurants/{id}，id 不是有效的整数格式
- **THEN** 返回 HTTP 400，错误信息 "invalid id format"

#### Scenario: 无效请求体
- **WHEN** 发送 PUT /api/restaurants/{id}，Body 包含无效 JSON
- **THEN** 返回 HTTP 400，错误信息 "invalid request body"

#### Scenario: 数据库更新失败
- **WHEN** 发送 PUT /api/restaurants/{id}，数据库操作失败
- **THEN** 返回 HTTP 500，错误信息 "failed to update restaurant"

### Requirement: 删除餐厅
提供 API 端点删除餐厅记录。

#### Scenario: 成功删除餐厅
- **WHEN** 发送 DELETE /api/restaurants/{id}
- **THEN** 返回 HTTP 204 No Content

#### Scenario: 删除不存在的餐厅
- **WHEN** 发送 DELETE /api/restaurants/{id}，id 对应记录不存在
- **THEN** 返回 HTTP 404，错误信息 "restaurant not found"

#### Scenario: 无效 ID 格式
- **WHEN** 发送 DELETE /api/restaurants/{id}，id 不是有效的整数格式
- **THEN** 返回 HTTP 400，错误信息 "invalid id format"

#### Scenario: 数据库删除失败
- **WHEN** 发送 DELETE /api/restaurants/{id}，数据库操作失败
- **THEN** 返回 HTTP 500，错误信息 "failed to delete restaurant"
