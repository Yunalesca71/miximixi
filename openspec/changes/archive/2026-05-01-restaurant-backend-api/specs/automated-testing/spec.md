## ADDED Requirements

### Requirement: 单元测试覆盖
所有 API 处理器必须有对应的单元测试。

#### Scenario: 获取餐厅列表测试
- **WHEN** 运行测试时
- **THEN** handlers_test.go 包含 TestGetRestaurants，验证返回 HTTP 200 和 JSON 数组格式

#### Scenario: 获取餐厅列表-空数据测试
- **WHEN** 数据库无记录时运行 TestGetRestaurants
- **THEN** 验证返回空数组 [] 而非 null

#### Scenario: 创建餐厅测试-成功场景
- **WHEN** 运行 TestCreateRestaurant
- **THEN** 验证 HTTP 201，返回对象包含正确 id、name、description

#### Scenario: 创建餐厅测试-缺少必填字段
- **WHEN** 运行 TestCreateRestaurant 缺少 name
- **THEN** 验证返回 HTTP 400，错误信息 "name is required"

#### Scenario: 创建餐厅测试-无效 JSON
- **WHEN** 运行 TestCreateRestaurant_InvalidJSON
- **THEN** 验证返回 HTTP 400，错误信息 "invalid request body"

#### Scenario: 更新餐厅测试-成功场景
- **WHEN** 运行 TestUpdateRestaurant
- **THEN** 验证 HTTP 200，返回更新后的餐厅对象

#### Scenario: 更新餐厅测试-404 场景
- **WHEN** 运行 TestUpdateRestaurant 使用不存在的 id
- **THEN** 验证返回 HTTP 404，错误信息 "restaurant not found"

#### Scenario: 更新餐厅测试-无效 ID 格式
- **WHEN** 运行 TestUpdateRestaurant 使用非数字 id
- **THEN** 验证返回 HTTP 400，错误信息 "invalid id format"

#### Scenario: 更新餐厅测试-无效 JSON
- **WHEN** 运行 TestUpdateRestaurant_InvalidJSON
- **THEN** 验证返回 HTTP 400，错误信息 "invalid request body"

#### Scenario: 删除餐厅测试-成功场景
- **WHEN** 运行 TestDeleteRestaurant
- **THEN** 验证 HTTP 204，无响应体

#### Scenario: 删除餐厅测试-404 场景
- **WHEN** 运行 TestDeleteRestaurant 使用不存在的 id
- **THEN** 验证返回 HTTP 404，错误信息 "restaurant not found"

#### Scenario: 删除餐厅测试-无效 ID 格式
- **WHEN** 运行 TestDeleteRestaurant 使用非数字 id
- **THEN** 验证返回 HTTP 400，错误信息 "invalid id format"

### Requirement: 测试框架使用
使用 Go 标准测试框架和主流断言库。

#### Scenario: 测试依赖
- **WHEN** 查看 go.mod
- **THEN** 包含 testify/assert 和 testify/require 依赖用于断言

#### Scenario: 测试数据库
- **WHEN** 运行测试时
- **THEN** 使用内存 SQLite (:memory:) 隔离测试数据

#### Scenario: 测试路由设置
- **WHEN** 运行测试时
- **THEN** 使用 mux.SetURLVars 设置 gorilla/mux 路由参数

#### Scenario: HTTP 测试记录器
- **WHEN** 运行测试时
- **THEN** 使用 httptest.NewRecorder() 记录 HTTP 响应

### Requirement: 测试覆盖率
测试必须达到合理覆盖率。

#### Scenario: 覆盖率统计
- **WHEN** 运行 go test -cover
- **THEN** 覆盖率 >= 70%

#### Scenario: 处理器覆盖率
- **WHEN** 运行 go test -coverprofile=coverage.out
- **THEN** handlers.go 所有导出函数均有测试覆盖

#### Scenario: 错误路径覆盖
- **WHEN** 查看测试用例
- **THEN** 包含 HTTP 400、404、500 等错误场景的测试
