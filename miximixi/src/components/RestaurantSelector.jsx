import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './RestaurantSelector.css'

const RestaurantSelector = () => {
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: '海底捞', description: '火锅', type: 'chinese' },
    { id: 2, name: '寿司郎', description: '日料', type: 'japanese' },
    { id: 3, name: '必胜客', description: '披萨', type: 'western' },
    { id: 4, name: '烤肉', description: '韩式烤肉', type: 'korean' },
    { id: 5, name: '泰式料理', description: '冬阴功', type: 'thai' },
    { id: 6, name: '小肥羊', description: '火锅', type: 'chinese' }
  ])

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const cardsWrapperRef = useRef(null)
  const containerRef = useRef(null)
  const animationRef = useRef(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 根据屏幕大小计算卡片尺寸
  const getCardDimensions = () => {
    const { width, height } = screenSize
    
    if (width < 768) {
      return { cardWidth: 130, cardHeight: 200, gap: 15, fontSize: 16 }
    } else if (width < 1024) {
      return { cardWidth: 180, cardHeight: 280, gap: 35, fontSize: 22 }
    } else {
      return { cardWidth: 220, cardHeight: 320, gap: 50, fontSize: 26 }
    }
  }

  const { cardWidth, cardHeight, gap, fontSize } = getCardDimensions()

  // 复制卡片数组以实现无限滚动
  const infiniteRestaurants = [...restaurants, ...restaurants]

  // 处理滚轮事件
  const handleWheel = (e) => {
    const singleCardWidth = cardWidth + gap
    const totalWidth = restaurants.length * singleCardWidth
    
    // 根据滚轮方向更新位置
    setScrollPosition(prev => {
      const newPosition = prev + e.deltaX
      
      // 使用模运算实现无限循环
      const wrappedPosition = ((newPosition % totalWidth) + totalWidth) % totalWidth
      
      return wrappedPosition
    })
  }

  // 使用GSAP根据scrollPosition更新卡牌位置和缩放
  useEffect(() => {
    if (!cardsWrapperRef.current) return

    const singleCardWidth = cardWidth + gap
    const totalWidth = restaurants.length * singleCardWidth

    // 更新容器位置
    gsap.set(cardsWrapperRef.current, {
      x: -scrollPosition,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    })

    // 计算视口中心
    const containerWidth = containerRef.current?.clientWidth || window.innerWidth
    const centerX = containerWidth / 2

    // 更新每张卡牌的缩放
    const cards = cardsWrapperRef.current.children
    Array.from(cards).forEach((card) => {
      // 使用getBoundingClientRect获取实际位置
      const rect = card.getBoundingClientRect()
      const cardCenter = rect.left + rect.width / 2
      const distanceFromCenter = Math.abs(cardCenter - centerX)
      
      // 计算缩放比例：距离中心越远，缩放越小
      const maxDistance = containerWidth / 2
      const scale = Math.max(0.6, 1 - (distanceFromCenter / maxDistance) * 0.4)
      
      gsap.set(card, {
        scale: scale,
        zIndex: Math.round(scale * 10)
      })
    })
  }, [scrollPosition, cardWidth, gap, restaurants.length])

  return (
    <div className="restaurant-selector">
      {/* 控制面板 */}
      <section className="control-panel">
        <div className="control-buttons">
          <button className="btn btn-primary" onClick={() => alert('添加功能开发中')}>
            <i className="fas fa-plus btn-icon"></i>
            添加饭店
          </button>
          <button className="btn btn-secondary" onClick={() => alert('抽卡功能开发中')}>
            <i className="fas fa-dice btn-icon"></i>
            开始抽卡
          </button>
        </div>
      </section>

      {/* 主要内容区域 */}
      <main className="main-content">
        <div 
          ref={containerRef}
          className="cards-container" 
          style={{ gap: `${gap}px` }}
          onWheel={handleWheel}
        >
          <div ref={cardsWrapperRef} className="cards-scroll-wrapper" style={{ gap: `${gap}px` }}>
            {infiniteRestaurants.map((restaurant, index) => (
              <div 
                key={`${restaurant.id}-${index}`} 
                className="restaurant-card"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`
                }}
              >
                <div className="card-content">
                  <h3 
                    className="card-title" 
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {restaurant.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {restaurants.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon"><i className="fas fa-treasure-chest-open"></i></div>
            <h3>宝库是空的</h3>
            <p>点击"添加饭店"按钮开始收集美食卡吧！</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default RestaurantSelector
