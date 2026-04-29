## Why

当前Miximixi应用在不同屏幕尺寸下的布局体验不够优化。大屏幕上元素分散，小屏幕上标题、副标题和按钮布局不够紧凑，影响整体美观性和用户体验。需要建立统一的响应式布局标准，确保在各种设备上都能提供一致且美观的界面体验。

## What Changes

- **优化标题和副标题布局**: 确保在大屏幕和小屏幕上都横向居中显示
- **重新设计按钮布局**: 在小屏幕下确保两个按钮在一行显示，适当调节大小
- **改进卡牌位置定位**: 优化卡牌与上方按钮的间距，避免过于拥挤或位置过低
- **统一字体和尺寸适配**: 根据屏幕尺寸动态调整字体大小和按钮尺寸
- **确保一页显示完整**: 优化整体布局高度，确保所有内容在一页内可见

## Capabilities

### New Capabilities
- `responsive-layout-system`: 统一的响应式布局系统，包含断点定义、尺寸适配规则和布局组件

### Modified Capabilities
- `restaurant-selector-ui`: 修改RestaurantSelector组件的布局结构和样式适配

## Impact

- **代码影响**: 主要影响 `src/App.jsx`、`src/index.css`、`src/components/RestaurantSelector.jsx` 和 `src/components/RestaurantSelector.css`
- **样式系统**: 需要重新定义CSS媒体查询和响应式断点
- **组件结构**: 可能需要调整组件的DOM结构以更好地支持响应式布局
- **用户体验**: 提升在不同设备上的视觉一致性和操作便利性
