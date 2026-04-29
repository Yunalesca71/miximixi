import { useMediaQuery } from 'react-responsive';

/**
 * 响应式Hook，提供统一的屏幕尺寸检测
 * 使用react-responsive库进行媒体查询，替代手动resize事件监听
 * @returns {Object} 包含各种屏幕尺寸检测的布尔值
 */
export const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  
  // 组合查询
  const isMobileOrTablet = useMediaQuery({ maxWidth: 1023 });
  const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });

  return {
    isMobile,
    isTablet,
    isDesktop,
    isMobileOrTablet,
    isTabletOrDesktop
  };
};

/**
 * 获取响应式尺寸的Hook
 * @returns {Object} 包含各种响应式尺寸
 */
export const useResponsiveSizes = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

    
  // 标题字体大小 - 增加大屏幕尺寸
  const titleFontSize = isMobile ? '34px' : isTablet ? '42px' : '48px';

  // 副标题字体大小 - 增大所有尺寸
  const subtitleFontSize = isMobile ? '24px' : isTablet ? '26px' : '22px';
  
  // 按钮尺寸 - 确保字体始终比标题小，小屏幕更小
  const buttonHeight = isMobile ? '32px' : isTablet ? '40px' : '44px';
  const buttonFontSize = isMobile ? '12px' : isTablet ? '16px' : '16px';
  
  // 图标尺寸
  const iconSize = isMobile ? '40px' : isTablet ? '50px' : '60px';
  
  // 卡牌容器顶部间距
  const cardContainerPaddingTop = isMobile ? '15vh' : isTablet ? '18vh' : '8vh';
  
  // 卡牌尺寸 - 确保总是有默认值
  const cardDimensions = (() => {
    if (isMobile) return { width: 160, height: 240, gap: 20, fontSize: 20 };
    if (isTablet) return { width: 180, height: 280, gap: 35, fontSize: 22 };
    if (isDesktop) return { width: 220, height: 320, gap: 50, fontSize: 26 };
    // 默认值（如果所有条件都不匹配）
    return { width: 220, height: 320, gap: 50, fontSize: 26 };
  })();

  
  return {
    titleFontSize,
    subtitleFontSize,
    buttonHeight,
    buttonFontSize,
    iconSize,
    cardContainerPaddingTop,
    cardDimensions,
    isMobile,
    isTablet,
    isDesktop
  };
};
