# Proposal: Add Shiny Text Effect to Headers

## Motivation

The current header text (title and subtitle) uses static styling. Adding a shiny text animation effect will enhance the visual appeal and create a more engaging user experience that matches the magical/restaurant theme of the application.

## What We're Changing

Apply the shiny-text animation effect to:
1. **Main title**: "咪西咪西~❤"
2. **Subtitle**: "✨召唤美味中...✨"

The shiny effect creates a gradient shine that sweeps across the text, using:
- **Text color**: White (matching current styling)
- **Shine color**: Gold (#C4914E, from the existing gradient)

## Capabilities Added

- Shiny text animation for enhanced visual appeal
- Configurable animation speed and direction
- Hover pause functionality

## Impact

- **Visual**: More dynamic and engaging header
- **Dependencies**: Requires `motion` library (`npm install motion`)
- **Performance**: Minimal impact, uses CSS transforms and motion values

## Success Criteria

- [ ] Title displays with shiny animation effect
- [ ] Subtitle displays with shiny animation effect
- [ ] Animation uses white text with gold shine
- [ ] Hover pauses animation (optional but nice)
- [ ] Responsive sizing still works correctly
