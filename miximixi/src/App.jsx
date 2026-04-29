import React from 'react'
import Galaxy3D from './components/Galaxy3D'
import RestaurantSelector from './components/RestaurantSelector'


function App() {
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
      
      {/* 头部 */}
      <header className="app-header">
        <h1 className="app-title">
          <img src="/assets/images/title.png" alt="咪西咪西" className="app-title-icon" />
          咪西咪西~❤
        </h1>
        <p className="app-subtitle">✨美味召唤中...✨</p>
      </header>

      {/* 主要内容区域 */}
      <RestaurantSelector />
    </div>
  )
}

export default App
