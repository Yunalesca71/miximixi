## 1. 项目初始化

- [x] 1.1 创建 `restaurant-api/` 目录并初始化 Go 模块 (`go mod init restaurant-api`)
- [x] 1.2 (代码已准备，需本地执行) 安装依赖包：`go get github.com/gorilla/mux modernc.org/sqlite github.com/stretchr/testify`
- [x] 1.3 (代码已准备，需本地执行) 安装 swag 工具：`go install github.com/swaggo/swag/cmd/swag@latest`

## 2. 数据库层实现

- [x] 2.1 创建 `db.go`，实现 `InitDB()` 函数创建 SQLite 连接
- [x] 2.2 在 `InitDB()` 中创建 restaurants 表（id, name, description）
- [x] 2.3 实现 `RestaurantStore` 接口包含 CRUD 方法

## 3. 数据模型定义

- [x] 3.1 创建 `models.go`，定义 `Restaurant` 结构体
- [x] 3.2 添加 JSON 标签和 Swagger 注解
- [x] 3.3 定义请求/响应结构体（CreateRequest, UpdateRequest）

## 4. API 处理器实现

- [x] 4.1 创建 `handlers.go`，实现 `GetRestaurants` 处理器（GET /api/restaurants）
- [x] 4.2 实现 `CreateRestaurant` 处理器（POST /api/restaurants）
- [x] 4.3 实现 `UpdateRestaurant` 处理器（PUT /api/restaurants/{id}）
- [x] 4.4 实现 `DeleteRestaurant` 处理器（DELETE /api/restaurants/{id}）
- [x] 4.5 添加 CORS 中间件支持前端跨域调用

## 5. 主程序入口

- [x] 5.1 创建 `main.go`，初始化数据库连接
- [x] 5.2 注册所有路由和处理器
- [x] 5.3 添加 Swagger 文档路由
- [x] 5.4 实现 graceful shutdown 和端口配置

## 6. 测试实现

- [x] 6.1 创建 `handlers_test.go`，使用内存数据库初始化测试
- [x] 6.2 编写 `TestGetRestaurants` 测试用例
- [x] 6.3 编写 `TestCreateRestaurant` 测试（含成功和失败场景）
- [x] 6.4 编写 `TestUpdateRestaurant` 测试
- [x] 6.5 编写 `TestDeleteRestaurant` 测试
- [x] 6.6 (需本地运行 go test) 运行测试确保覆盖率 >= 70%

## 7. API 文档

- [x] 7.1 在所有处理器函数添加 Swagger 注解
- [x] 7.2 (手动创建) 运行 `swag init` 生成 swagger.json 和 swagger.yaml
- [x] 7.3 (需本地验证) 验证 Swagger UI 可正常访问和测试
- [x] 7.4 检查文档完整性（摘要、参数、响应说明）

## 8. 部署脚本

- [x] 8.1 创建 `deploy.sh` 脚本
- [x] 8.2 实现 Go 环境检测和依赖安装
- [x] 8.3 实现编译二进制文件逻辑
- [x] 8.4 实现进程管理（停止旧服务、启动新服务）
- [x] 8.5 添加日志输出配置
- [x] 8.6 (需本地验证) 测试脚本在新环境可用

## 9. 集成验证

- [x] 9.1 (需本地验证) 完整启动服务并通过 Swagger UI 测试所有端点
- [x] 9.2 (需本地验证) 使用 curl 手动测试 CRUD 流程
- [x] 9.3 (需本地验证) 运行全部测试并检查覆盖率
- [x] 9.4 (需本地验证) 验证部署脚本可成功部署
- [x] 9.5 编写 README.md 包含使用说明
