## Why

为Miximixi应用添加一个真实的3D星系背景效果，增强视觉吸引力和用户体验。现有的3D餐厅选择器需要一个更加沉浸式的星系背景来提升整体美感。

## What Changes

- **新增功能**: 集成OGL (OpenGL)库创建3D星系背景组件
- **组件开发**: 创建Galaxy3D组件，支持自定义参数配置
- **视觉效果**: 实现多层星系效果，包含星星发光、色调偏移、饱和度调节
- **动画系统**: 添加星系旋转和星星运动动画
- **性能优化**: 使用WebGL渲染确保高性能

## Capabilities

### New Capabilities
- `ogl-3d-galaxy`: 3D星系背景渲染能力，包含星星生成、光照效果、动画控制

### Modified Capabilities
- 无现有功能修改

## Impact

- **代码影响**: 新增Galaxy3D组件文件，需要安装ogl依赖
- **API影响**: 新增React组件props接口
- **依赖影响**: 添加ogl npm包依赖
- **系统影响**: 增强现有3D场景的视觉背景层
