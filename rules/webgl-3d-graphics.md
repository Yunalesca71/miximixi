# WebGL & 3D Graphics Development

## OGL Integration
- **OGL vs Three.js**: Use OGL for lightweight 2D/3D effects and backgrounds, Three.js for complex 3D scenes
- **Component Isolation**: Different graphics libraries can coexist when properly isolated in separate components
- **WebGL Contexts**: Each library manages its own WebGL context, preventing conflicts
- **Performance**: OGL provides excellent hardware acceleration for particle effects and backgrounds

## Shader Development
- **Vertex Shaders**: Handle position calculations and coordinate transformations
- **Fragment Shaders**: Implement pixel-level effects like glow, color shifts, and particle rendering
- **Uniforms**: Use uniforms for dynamic parameters (time, mouse position, effect parameters)
- **Multi-layer Rendering**: Create depth by rendering multiple layers with different scales and speeds

## OpenSpec Workflow for Graphics Features
- **Complete Artifacts**: Always create proposal, design, specs, and tasks before implementation
- **Validation Requirements**: Specs must use SHALL/MUST keywords for archiving
- **Parameter Documentation**: Document all configurable parameters with default values
- **Performance Requirements**: Include performance specs (60fps target) in requirements

## Common Issues
- **Missing Scripts**: Project may lack lint/test scripts - add them before PR
- **Package Lock**: Only commit package-lock.json when package.json is modified
- **Branch Safety**: Never push directly to main - always use feature branches
