## ADDED Requirements

### Requirement: 部署脚本
提供一键部署脚本 deploy.sh，支持 start/stop/restart/status 命令。

#### Scenario: 部署脚本帮助
- **WHEN** 运行 ./deploy.sh 不带参数或 --help
- **THEN** 显示用法说明和可用命令列表

#### Scenario: 首次部署（start）
- **WHEN** 在新服务器上运行 ./deploy.sh start
- **THEN** 自动检测 Go 环境、运行 go mod tidy、编译二进制文件、后台启动服务

#### Scenario: 更新部署（restart）
- **WHEN** 在已部署环境运行 ./deploy.sh restart
- **THEN** 停止旧服务、重新编译、启动新服务，数据库保留

#### Scenario: 停止服务（stop）
- **WHEN** 运行 ./deploy.sh stop
- **THEN** 查找并停止 restaurant-api 进程，清理 PID 文件

#### Scenario: 查看状态（status）
- **WHEN** 运行 ./deploy.sh status
- **THEN** 显示服务运行状态、PID、端口和日志文件路径

#### Scenario: 默认行为（无参数）
- **WHEN** 运行 ./deploy.sh 不带参数
- **THEN** 默认执行 start 命令，或根据 PID 文件状态智能选择操作

### Requirement: 部署配置
脚本必须支持基本配置。

#### Scenario: 端口配置
- **WHEN** 设置 PORT 环境变量
- **THEN** 服务在该端口启动，默认 8080

#### Scenario: 数据库路径配置
- **WHEN** 设置 DB_PATH 环境变量
- **THEN** SQLite 数据库文件创建在该路径，默认 ./restaurant.db

#### Scenario: Go 环境检查
- **WHEN** 运行 deploy.sh 时 Go 未安装
- **THEN** 显示错误信息并提示安装 Go 1.21+

#### Scenario: 版本显示
- **WHEN** 脚本检测到 Go 环境
- **THEN** 显示当前 Go 版本信息

### Requirement: 服务管理
脚本提供完整的服务生命周期管理。

#### Scenario: 后台运行
- **WHEN** 部署完成后
- **THEN** 服务在后台运行，输出日志到 restaurant-api.log

#### Scenario: 进程管理（PID 文件）
- **WHEN** 启动服务时
- **THEN** 写入 PID 到 ./restaurant-api.pid 文件便于后续管理

#### Scenario: 智能进程查找
- **WHEN** PID 文件丢失时停止服务
- **THEN** 使用 pgrep 查找 restaurant-api 进程并停止

#### Scenario: 端口冲突避免
- **WHEN** 再次运行 deploy.sh start
- **THEN** 先检测并停止已存在的同名进程，避免端口冲突

#### Scenario: 日志输出
- **WHEN** 服务后台运行时
- **THEN** 标准输出和错误重定向到 restaurant-api.log 文件

#### Scenario: 优雅退出
- **WHEN** 运行 deploy.sh stop
- **THEN** 发送终止信号给服务进程，允许完成当前请求后退出

### Requirement: 开发工作流支持
支持开发模式运行。

#### Scenario: 开发模式运行
- **WHEN** 开发调试时直接运行 go run .
- **THEN** 服务在前台运行，实时查看日志输出

#### Scenario: Go Workspaces 支持
- **WHEN** 根目录创建 go.work 文件
- **THEN** 支持多模块工作区，避免 "cannot find main module" 错误
