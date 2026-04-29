## MODIFIED Requirements

### Requirement: RestaurantSelector组件布局
RestaurantSelector组件必须支持响应式布局，根据屏幕尺寸调整控制面板和卡牌容器的位置。

#### Scenario: 控制面板响应式定位
- **WHEN** 屏幕宽度变化
- **THEN** 控制面板必须在桌面屏幕下位于右上角，在移动屏幕下位于标题下方居中

#### Scenario: 卡牌容器响应式定位
- **WHEN** 屏幕宽度变化
- **THEN** 卡牌容器的顶部内边距必须在15vh到25vh之间动态调整

### Requirement: 按钮样式适配
控制面板中的按钮必须根据屏幕尺寸调整样式和布局。

#### Scenario: 移动设备按钮样式
- **WHEN** 屏幕宽度小于768px
- **THEN** 按钮必须在一行显示，按钮高度为36px，字体大小为14px

#### Scenario: 桌面设备按钮样式
- **WHEN** 屏幕宽度大于1024px
- **THEN** 按钮高度为48px，字体大小为16px，保持较大的点击区域

### Requirement: 卡牌尺寸响应式
卡牌尺寸必须根据屏幕尺寸动态调整，确保在不同设备上的可视性。

#### Scenario: 移动设备卡牌尺寸
- **WHEN** 屏幕宽度小于768px
- **THEN** 卡牌宽度为130px，高度为200px，字体大小为16px

#### Scenario: 平板设备卡牌尺寸
- **WHEN** 屏幕宽度在768px到1024px之间
- **THEN** 卡牌宽度为180px，高度为280px，字体大小为22px

#### Scenario: 桌面设备卡牌尺寸
- **WHEN** 屏幕宽度大于1024px
- **THEN** 卡牌宽度为220px，高度为320px，字体大小为26px
