## Context

当前 MixiMixi 应用使用前端静态餐厅列表。为了支持动态餐厅管理、用户定制和数据持久化，需要构建一个轻量级的后端服务。该服务将作为独立的 Go 应用程序运行，通过 REST API 与前端交互。

**约束条件：**
- 技术栈：Go 1.21+
- 数据库：SQLite（单文件，零配置，适合小型项目）
- 部署目标：个人/demo 项目，追求简单部署

## Goals / Non-Goals

**Goals：**
- 实现完整的餐厅数据 CRUD API
- 提供可交互的 API 文档（Swagger UI）
- 达到 80%+ 的测试覆盖率
- 提供一键部署脚本
- 支持跨域访问（CORS）以便前端调用

**Non-Goals：**
- 用户认证/授权（当前版本不需要）
- 数据库迁移版本管理（v1 使用简单 schema）
- 生产级监控和日志聚合
- 水平扩展支持

## Decisions

### 1. 使用标准库 http.Server + gorilla/mux 实现路由
**选择：** `gorilla/mux` 路由器
**理由：**
- 功能丰富（路径变量、中间件、子路由）
- 社区成熟，文档完善
- 相比标准库更简洁的代码

**替代方案：**
- 标准库 `net/http`：代码冗长，缺少路径变量支持
- `gin`：功能过重，当前需求不需要高性能路由

### 2. 使用 `database/sql` + `modernc.org/sqlite` 驱动
**选择：** 纯 Go SQLite 实现
**理由：**
- 无需 CGO，交叉编译友好
- 单文件部署，无额外依赖
- 性能足够满足小型应用

**替代方案：**
- `mattn/go-sqlite3`：需要 CGO，编译复杂
- PostgreSQL：过重，不适合简单部署

### 3. 使用 `swag` 工具生成 Swagger 文档
**选择：** `swaggo/swag` 注解方式
**理由：**
- 注释即文档，代码与文档同步
- 自动生成 Swagger UI 和 JSON spec
- 支持 Go 结构体绑定

### 4. 项目结构采用简洁分层
```
restaurant-api/
├── main.go           # 入口，路由注册
├── db.go             # 数据库连接与初始化
├── handlers.go       # HTTP 处理器
├── models.go         # 数据结构
├── handlers_test.go  # 测试文件
├── swagger/          # 生成的文档
└── deploy.sh         # 部署脚本
```

**理由：** 文件数量少，职责清晰，适合小型服务。

## Risks / Trade-offs

**SQLite 并发限制** → 使用连接池限制并发数，单实例部署足够

**无认证的安全风险** → 添加 IP 白名单或 API Key 中间件（未来迭代）

**部署环境差异** → 部署脚本检测系统类型，自动处理依赖

**前端跨域问题** → 内置 CORS 中间件，允许前端域名访问

## Migration Plan

1. **本地开发**：`go run main.go` 启动服务
2. **测试验证**：`go test -v ./...` 运行所有测试
3. **构建部署**：运行 `./deploy.sh` 自动编译并启动
4. **API 验证**：访问 `http://localhost:8080/swagger/index.html` 测试端点

**回滚策略**：停止服务，删除 SQLite 数据库文件即可完全回滚。

## Open Questions

- 是否需要 Docker 容器化部署？（可选增强）
- 是否需要配置文件支持（TOML/YAML）？（如端口、数据库路径）
