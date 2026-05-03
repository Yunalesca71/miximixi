# Restaurant API - 餐厅管理后台服务

基于 Go + SQLite 的轻量级 REST API 服务，提供餐厅数据的 CRUD 操作。

## 功能特性

- ✅ 获取所有餐厅列表
- ✅ 创建新餐厅
- ✅ 更新餐厅简介
- ✅ 删除餐厅
- ✅ 交互式 API 文档 (Swagger UI)
- ✅ 完整的单元测试覆盖
- ✅ CORS 跨域支持
- ✅ 一键部署脚本

## 技术栈

- **Go 1.21+** - 后端语言
- **SQLite** - 嵌入式数据库
- **gorilla/mux** - HTTP 路由
- **swag** - API 文档生成
- **testify** - 测试框架

## 项目结构

```
restaurant-api/
├── main.go              # 程序入口
├── handlers.go          # HTTP 处理器
├── handlers_test.go     # 测试文件
├── db.go                # 数据库操作
├── models.go            # 数据模型
├── swagger/             # API 文档
│   ├── index.html
│   └── doc.json
├── deploy.sh            # 部署脚本
├── go.mod               # 依赖管理
└── README.md            # 本文件
```

## 快速开始

### 环境要求

- Go 1.21 或更高版本
- (可选) SQLite3 命令行工具

### 安装依赖

```bash
go mod download
```

### 运行服务

#### 开发模式

```bash
go run .
```

服务将在 `http://localhost:8080` 启动。

#### 使用部署脚本

```bash
# 构建并启动
./deploy.sh start

# 查看状态
./deploy.sh status

# 停止服务
./deploy.sh stop

# 重启服务
./deploy.sh restart
```

### 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `PORT` | 服务端口 | `8080` |
| `DB_PATH` | SQLite 数据库路径 | `./restaurant.db` |

### API 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/restaurants` | 获取所有餐厅 |
| POST | `/api/restaurants` | 创建餐厅 |
| PUT | `/api/restaurants/{id}` | 更新餐厅简介 |
| DELETE | `/api/restaurants/{id}` | 删除餐厅 |
| GET | `/swagger/index.html` | API 文档界面 |
| GET | `/health` | 健康检查 |

### API 示例

#### 创建餐厅

```bash
curl -X POST http://localhost:8080/api/restaurants \
  -H "Content-Type: application/json" \
  -d '{"name":"麦当劳","description":"全球连锁快餐品牌"}'
```

响应：
```json
{
  "id": 1,
  "name": "麦当劳",
  "description": "全球连锁快餐品牌"
}
```

#### 获取所有餐厅

```bash
curl http://localhost:8080/api/restaurants
```

响应：
```json
[
  {
    "id": 1,
    "name": "麦当劳",
    "description": "全球连锁快餐品牌"
  }
]
```

#### 更新餐厅

```bash
curl -X PUT http://localhost:8080/api/restaurants/1 \
  -H "Content-Type: application/json" \
  -d '{"description":"更新的简介"}'
```

#### 删除餐厅

```bash
curl -X DELETE http://localhost:8080/api/restaurants/1
```

## 测试

运行所有测试：

```bash
go test -v ./...
```

运行测试并查看覆盖率：

```bash
go test -cover ./...
```

生成详细覆盖率报告：

```bash
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html
```

## API 文档

启动服务后，访问：

```
http://localhost:8080/swagger/index.html
```

可交互式测试所有 API 端点。

## 数据库

SQLite 数据库文件默认位于 `./restaurant.db`，包含以下表结构：

```sql
CREATE TABLE restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
);
```

当前数据库已填充 13 家示例餐厅数据，包括爱虾乃家、海底捞、W Cafe 等。

## 前端集成

本项目配套 React 前端 `miximixi`，通过 `GET /api/restaurants` 获取餐厅列表显示为卡牌。

**启动前端：**
```bash
cd ../miximixi
npm run dev
```

前端默认访问 `http://localhost:8080/api/restaurants`，如需自定义地址可设置环境变量：
```bash
VITE_API_URL=http://your-api:8080 npm run dev
```

CORS 已配置，支持前端跨域访问。

## 生产部署建议

1. **使用反向代理** (Nginx/Caddy) 处理 HTTPS 和静态文件
2. **设置环境变量** 配置端口和数据库路径
3. **配置日志轮转** 避免日志文件无限增长
4. **定期备份** SQLite 数据库文件

### systemd 服务示例

创建 `/etc/systemd/system/restaurant-api.service`：

```ini
[Unit]
Description=Restaurant API Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/restaurant-api
Environment=PORT=8080
Environment=DB_PATH=/var/lib/restaurant-api/data.db
ExecStart=/opt/restaurant-api/restaurant-api
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

启用服务：

```bash
sudo systemctl enable restaurant-api
sudo systemctl start restaurant-api
```

## License

MIT License
