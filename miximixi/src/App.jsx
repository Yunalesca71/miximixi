import React from 'react'
import Galaxy3D from './components/Galaxy3D'
import RestaurantSelector from './components/RestaurantSelector'
import ShinyText from './components/ShinyText'
import { useResponsiveSizes } from './hooks/useResponsive'


function App() {
  // 使用响应式Hook获取字体大小和图标尺寸，支持移动端、平板、桌面三种断点
  const { titleFontSize, subtitleFontSize, iconSize } = useResponsiveSizes();
  
  return (
    <div className="app-container">
      {/* 3D星系背景 */}
      <div className="starfield-container">
        <Galaxy3D
          density={2.2}
          glowIntensity={0.3}
          saturation={0.3}
          hueShift={140}
          rotationSpeed={0.1}
          starSpeed={0.5}
          animationSpeed={1}
        />
      </div>

      <div className="app-content">
        {/* 头部 */}
        <header className="app-header">
          <h1 className="app-title" style={{ fontSize: titleFontSize }}>
            <img src="/assets/images/title.png" alt="咪西咪西" className="app-title-icon" style={{ width: iconSize, height: 'auto' }} />
            <ShinyText
              text="✨咪西咪西~✨"
              color="#ddd8a9"
              shineColor="#ffffff"
              speed={3}
              spread={120}
              direction="left"
              pauseOnHover={true}
            />
          </h1>
          <p className="app-subtitle" style={{ fontSize: subtitleFontSize }}>
            <ShinyText
              text="✨召唤美味中...✨"
              color="#ddd8a9"
              shineColor="#ffffff"
              speed={2}
              spread={120}
              direction="left"
              pauseOnHover={true}
            />
          </p>
        </header>

        {/* 主要内容区域 */}
        <RestaurantSelector />
      </div>
    </div>
  )
}

export default App
