import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './RestaurantSelector.css'
import { useResponsiveSizes } from '../hooks/useResponsive'

const RestaurantSelector = () => {
  // 餐厅数据
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: '海底捞', description: '火锅', type: 'chinese' },
    { id: 2, name: '寿司郎', description: '日料', type: 'japanese' },
    { id: 3, name: '必胜客', description: '披萨', type: 'western' },
    { id: 4, name: '烤肉', description: '韩式烤肉', type: 'korean' },
    { id: 5, name: '泰式料理', description: '冬阴功', type: 'thai' },
    { id: 6, name: '小肥羊', description: '火锅', type: 'chinese' }
  ])

  // 使用响应式Hook获取尺寸和屏幕类型信息
  const { titleFontSize, subtitleFontSize, buttonHeight, buttonFontSize, iconSize, cardContainerPaddingTop, cardDimensions, isMobile, isTablet, isDesktop } = useResponsiveSizes()

  const cardsWrapperRef = useRef(null)
  const containerRef = useRef(null)
  const animationRef = useRef(null)
  const isJumping = useRef(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  // 解构cardDimensions获取卡片尺寸
  const { width: cardWidth, height: cardHeight, gap, fontSize } = cardDimensions

  // 复制卡片数组三份以实现无限滚动
  const infiniteRestaurants = [...restaurants, ...restaurants, ...restaurants]

  // 更新卡牌缩放效果
  useEffect(() => {
    if (!cardsWrapperRef.current) return

    const cards = cardsWrapperRef.current.children
    const containerWidth = containerRef.current?.clientWidth || window.innerWidth
    const centerX = containerWidth / 2
    
    Array.from(cards).forEach((card) => {
      const rect = card.getBoundingClientRect()
      const cardCenter = rect.left + rect.width / 2
      const distanceFromCenter = Math.abs(cardCenter - centerX)
      
      const maxDistance = containerWidth / 2
      const scale = Math.max(0.6, 1 - (distanceFromCenter / maxDistance) * 0.4)
      
      gsap.set(card, {
        scale: scale,
        zIndex: Math.round(scale * 10)
      })
    })
  }, [scrollPosition, cardWidth, gap])

  // 初始化和滚轮/滚动事件处理
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const CARD_WIDTH = cardWidth + gap
    const singleWidth = restaurants.length * CARD_WIDTH // 6张卡片的宽度

    // 设置初始位置到第二份（中间）
    container.scrollLeft = singleWidth

    // 滚轮事件处理
    const onWheel = (e) => {
      e.preventDefault()
      container.scrollLeft += e.deltaX

      // 更新scrollPosition状态以触发卡片缩放更新
      setScrollPosition(container.scrollLeft)

      if (isJumping.current) return

      // 滚到第三份开头 → 跳回第二份
      if (container.scrollLeft >= singleWidth * 2) {
        isJumping.current = true
        container.scrollLeft -= singleWidth
        isJumping.current = false
      }

      // 滚到第一份末尾 → 跳到第二份
      if (container.scrollLeft <= 0) {
        isJumping.current = true
        container.scrollLeft += singleWidth
        isJumping.current = false
      }
    }

    // 监听滚动事件以更新卡片缩放
    const onScroll = () => {
      setScrollPosition(container.scrollLeft)
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('scroll', onScroll)
    return () => {
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('scroll', onScroll)
    }
  }, [cardWidth, gap, restaurants.length])

  return (
    <div className="restaurant-selector">
      {/* 控制面板 */}
      <section 
        className={`control-panel ${isDesktop ? 'desktop' : isTablet ? 'tablet' : 'mobile'}`}
        style={{ 
          position: 'relative',
          padding: isMobile ? 'var(--spacing-md) var(--spacing-lg)' : 'var(--spacing-lg) var(--spacing-xl)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div className="control-buttons" style={{ flexDirection: 'row', gap: 'var(--spacing-md)' }}>
          <button
            className="btn btn-primary"
            onClick={() => alert('添加功能开发中')}
            style={{
              height: buttonHeight,
              fontSize: buttonFontSize,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: isMobile ? 'auto' : isTablet ? '140px' : '140px',
              minWidth: isMobile ? '80px' : '100px'
            }}
          >
            <i className="fas fa-plus btn-icon" style={{ fontSize: `calc(${buttonHeight} * 0.5)` }}></i>
            添加饭店
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => alert('抽卡功能开发中')}
            style={{
              height: buttonHeight,
              fontSize: buttonFontSize,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: isMobile ? 'auto' : isTablet ? '140px' : '140px',
              minWidth: isMobile ? '80px' : '100px'
            }}
          >
            <i className="fas fa-dice btn-icon" style={{ fontSize: `calc(${buttonHeight} * 0.5)` }}></i>
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
