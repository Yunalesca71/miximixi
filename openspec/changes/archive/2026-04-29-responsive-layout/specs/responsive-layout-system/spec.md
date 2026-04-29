## ADDED Requirements

### Requirement: 响应式断点系统
系统必须定义标准化的响应式断点，支持移动设备、平板和桌面三种主要屏幕尺寸。

#### Scenario: 移动设备布局
- **WHEN** 屏幕宽度小于768px
- **THEN** 系统必须应用移动设备专用布局样式

#### Scenario: 平板设备布局
- **WHEN** 屏幕宽度在768px到1024px之间
- **THEN** 系统必须应用平板设备专用布局样式

#### Scenario: 桌面设备布局
- **WHEN** 屏幕宽度大于1024px
- **THEN** 系统必须应用桌面设备专用布局样式

### Requirement: 标题居中布局
应用标题(图标+文字)和副标题在所有屏幕尺寸下必须横向居中显示。

#### Scenario: 大屏幕标题居中
- **WHEN** 屏幕宽度大于1024px
- **THEN** 标题和副标题必须在容器中横向居中对齐

#### Scenario: 小屏幕标题居中
- **WHEN** 屏幕宽度小于768px
- **THEN** 标题和副标题必须在容器中横向居中对齐，字体大小适当缩小

### Requirement: 按钮响应式布局
添加饭店和开始抽卡按钮必须根据屏幕尺寸调整布局和尺寸，并且在所有屏幕尺寸下都必须位于副标题下方。

#### Scenario: 按钮位置要求
- **WHEN** 在任何屏幕尺寸下
- **THEN** 按钮区域必须位于副标题下方，保持合适的垂直间距

#### Scenario: 小屏幕按钮布局
- **WHEN** 屏幕宽度小于768px
- **THEN** 两个按钮必须在一行显示，按钮宽度适当调整以适应屏幕

#### Scenario: 大屏幕按钮布局
- **WHEN** 屏幕宽度大于1024px
- **THEN** 按钮可以保持较大尺寸，布局更加宽松

### Requirement: 卡牌容器定位
滚动卡牌容器必须与上方元素保持适当间距，确保整体布局美观。

#### Scenario: 卡牌垂直位置
- **WHEN** 在任何屏幕尺寸下
- **THEN** 卡牌容器必须在main-content中垂直居中显示

#### Scenario: 卡牌水平居中
- **WHEN** 在任何屏幕尺寸下
- **THEN** 卡牌容器必须水平居中显示

### Requirement: 一页完整显示
所有主要元素必须在浏览器一页内完整显示，无需垂直滚动。

#### Scenario: 视口适配
- **WHEN** 应用加载完成
- **THEN** 标题、按钮和卡牌区域都必须在当前视口内可见

#### Scenario: 内容不溢出
- **WHEN** 在标准屏幕比例下
- **THEN** 应用总高度不得超过100vh

#### Scenario: 布局比例分配
- **WHEN** 应用加载完成
- **THEN** header占25%，restaurant-selector占65%，footer预留10%

### Requirement: 字体和尺寸动态适配
字体大小和元素尺寸必须根据屏幕尺寸动态调整。

#### Scenario: 字体大小缩放
- **WHEN** 屏幕宽度变化
- **THEN** 标题字体大小必须在移动端34px、平板端42px、桌面端48px之间自适应调整
- **THEN** 副标题字体大小必须在移动端24px、平板端26px、桌面端22px之间自适应调整

#### Scenario: 按钮尺寸缩放
- **WHEN** 屏幕宽度变化
- **THEN** 按钮高度必须在移动端32px、平板端40px、桌面端44px之间自适应调整
- **THEN** 按钮字体大小必须在移动端12px、平板端16px、桌面端16px之间自适应调整
- **THEN** 按钮宽度必须在移动端auto、平板端140px、桌面端140px之间自适应调整

#### Scenario: 卡牌尺寸缩放
- **WHEN** 屏幕宽度变化
- **THEN** 卡牌宽度必须在移动端160px、平板端180px、桌面端220px之间自适应调整
- **THEN** 卡牌高度必须在移动端240px、平板端280px、桌面端320px之间自适应调整

### Requirement: React Responsive集成
系统必须使用react-responsive库进行响应式检测，替代手动resize事件监听。

#### Scenario: 媒体查询Hook使用
- **WHEN** 组件需要检测屏幕尺寸
- **THEN** 必须使用useMediaQuery Hook进行响应式检测

#### Scenario: 性能优化
- **WHEN** 使用react-responsive
- **THEN** 必须配合React.memo避免不必要的重渲染

#### Scenario: 依赖管理
- **WHEN** 项目构建
- **THEN** react-responsive必须正确打包，不影响Three.js和GSAP运行
