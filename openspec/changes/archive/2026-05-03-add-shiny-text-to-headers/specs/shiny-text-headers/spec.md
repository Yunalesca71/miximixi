## ADDED Requirements

### Requirement: Shiny Text Animation for Header

The header title and subtitle SHALL display with a shiny text animation effect.

#### Scenario: Title displays with shiny effect
- **WHEN** the App component renders
- **THEN** the title "✨咪西咪西~✨" displays with light gold text color (#ddd8a9)
- **THEN** a white gradient shine (#ffffff) sweeps across the text
- **THEN** the animation speed is 3 seconds per cycle
- **THEN** the animation pauses on hover

#### Scenario: Subtitle displays with shiny effect
- **WHEN** the App component renders
- **THEN** the subtitle "✨召唤美味中...✨" displays with light gold text color (#ddd8a9)
- **THEN** a white gradient shine (#ffffff) sweeps across the text
- **THEN** the animation speed is 2 seconds per cycle
- **THEN** the animation pauses on hover

#### Scenario: Responsive sizing maintained
- **WHEN** the screen size changes (mobile/tablet/desktop)
- **THEN** the shiny text font sizes adjust according to useResponsiveSizes hook
- **THEN** the shine animation continues smoothly

### Requirement: ShinyText Component

A reusable ShinyText component SHALL be created based on the skill template.

#### Scenario: Component accepts all required props
- **WHEN** using the ShinyText component
- **THEN** it accepts: text, color, shineColor, speed, spread, direction, pauseOnHover
- **THEN** it uses default values when props are omitted
- **THEN** it applies custom className for additional styling

#### Scenario: Animation uses motion library
- **WHEN** the component mounts
- **THEN** it uses motion/react's useMotionValue and useAnimationFrame
- **THEN** the gradient background position animates based on progress
- **THEN** the text uses background-clip: text for the shine effect

### Requirement: Dependency Installation

The motion library SHALL be installed for animation support.

#### Scenario: Motion library available
- **WHEN** running npm install
- **THEN** the motion package is installed
- **THEN** the ShinyText component can import from 'motion/react'
