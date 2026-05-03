# Design: Shiny Text Effect for Headers

## Context

The application uses a 3D galaxy background with a golden-themed UI. The shiny text effect from the `shiny-text` skill will add a dynamic gradient shine animation that complements the magical restaurant theme.

## Technical Approach

### Component Architecture

1. **ShinyText Component**: Reusable component based on the skill template
   - Location: `src/components/ShinyText.jsx`
   - Styles: `src/components/ShinyText.css`

2. **Integration Points**:
   - Replace static text in `App.jsx` header with ShinyText components
   - Maintain responsive font sizing via props

### Animation Configuration

**For Title ("✨咪西咪西~✨"):**
- `color`: `#ddd8a9` (light gold text)
- `shineColor`: `#ffffff` (white shine)
- `speed`: 3 (slower, more elegant)
- `spread`: 120
- `direction`: 'left'
- `pauseOnHover`: true

**For Subtitle ("✨召唤美味中...✨"):**
- `color`: `#ddd8a9` (light gold text)
- `shineColor`: `#ffffff` (white shine)
- `speed`: 2 (slightly faster)
- `spread`: 120
- `direction`: 'left'
- `pauseOnHover`: true

### Dependencies

- `motion` library (Framer Motion for React)
- Already has the skill template with full implementation

### Styling Considerations

1. **Z-index**: Ensure text remains above Galaxy3D background (already handled by existing CSS)
2. **Font sizing**: Pass responsive font sizes as style props
3. **Background clip**: The gradient uses `background-clip: text` which requires `WebkitTextFillColor: transparent`

## Decisions

| Decision | Rationale |
|----------|-----------|
| Use skill template directly | Already implemented and tested, minimal adaptation needed |
| Different gold shades for title/subtitle | Creates visual hierarchy |
| Pause on hover | Improves readability when user interacts |
| Slower speed for title | Title is more prominent, should feel more majestic |

## Migration Plan

1. Install `motion` dependency
2. Create ShinyText component files
3. Update App.jsx to use ShinyText for header elements
4. Test responsive behavior
5. Verify animation works over 3D background

## Risks

| Risk | Mitigation |
|------|------------|
| Dependency conflicts with motion | Check version compatibility with React 19 |
| Performance impact on low-end devices | Animation uses CSS transforms, GPU accelerated |
| Text becomes unreadable during animation | White text remains visible, gold adds highlight |
