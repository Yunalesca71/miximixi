s# Project Overview

Miximixi is a 3D restaurant selector application built with React, Vite, and Three.js. The app provides an interactive card-based interface for randomly selecting restaurants with animated 3D effects and post-processing. It uses GSAP for animations and react-window for performance optimization.

## Repository Structure

```
miximixi/
├── .windsurf/          # Windsurf AI skills and workflow automation
├── miximixi/           # Main React application source code
│   ├── public/         # Static assets (fonts, images)
│   ├── src/            # React components and application logic
│   └── dist/           # Build output directory
├── openspec/           # OpenSpec-driven development documentation
│   ├── changes/        # Feature change specifications
│   └── specs/          # Detailed technical specifications
└── AGENTS.md          # This file - AI agent guidelines
```

## Build & Development Commands

```bash
# Install dependencies
cd miximixi && npm install

# Start development server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

> TODO: No lint, test, or type-check scripts configured. Add `npm run fmt`, `npm run lint:fix`, `npm run ts`, and `npm test` as needed.

## Code Style & Conventions

- **Framework**: React 19 with functional components and hooks
- **Styling**: CSS modules and global styles in `src/index.css`
- **3D Graphics**: Three.js with @react-three/fiber for React integration
- **Animations**: GSAP for smooth transitions and effects
- **Commit Messages**: Use descriptive messages summarizing changes
- **Branch Naming**: Use kebab-case feature branches (e.g., `add-windsurf-skills`)

> TODO: Define specific lint rules, formatting standards, and commit message templates. Configure ESLint, Prettier, or similar tools.

## Architecture Notes

```mermaid
graph TD
    A[React App] --> B[RestaurantSelector Component]
    B --> C[Three.js Canvas]
    C --> D[3D Card Models]
    B --> E[GSAP Animations]
    B --> F[Post-Processing Effects]
    A --> G[Asset Loading]
    G --> H[Fonts & Images]
```

**Major Components:**
- **App.jsx**: Main application entry point
- **RestaurantSelector**: Core component managing 3D card selection logic
- **Three.js Integration**: @react-three/fiber renders 3D restaurant cards
- **Post-Processing**: @react-three/postprocessing adds visual effects
- **Animation System**: GSAP handles card flip and selection animations

**Data Flow:**
1. User interacts with 3D card interface
2. RestaurantSelector manages state and triggers animations
3. Three.js renders 3D scene with post-processing effects
4. GSAP animates transitions between states

## Testing Strategy

> TODO: No testing framework configured. Consider adding:
- **Unit Tests**: Jest or Vitest for component logic
- **Integration Tests**: React Testing Library for user flows
- **E2E Tests**: Playwright or Cypress for full application testing
- **3D Testing**: Three.js scene testing utilities

## Security & Compliance

- **Secrets Management**: No `.env` files in repository; use environment variables for sensitive data
- **Dependency Scanning**: > TODO: Configure automated dependency scanning (e.g., npm audit, Snyk)
- **License**: MIT license (verify in LICENSE file)
- **Third-Party Assets**: Custom fonts and images in `public/assets/` - ensure proper licensing

> TODO: Add security scanning to CI/CD pipeline and document asset licenses.

## Agent Guardrails

- **Never Modify**: `node_modules/`, `dist/`, `.git/` directories
- **Branch Safety**: Never push directly to `main` branch; always use feature branches
- **GitHub Operations**: GitHub CLI (`gh`) is not available; use web interface for PRs
- **Network Awareness**: Git operations may fail due to connectivity; retry with exponential backoff
- **Manual Testing Required**: No automated tests; verify changes manually in dev server
- **Package Lock**: Only commit `package-lock.json` changes if `package.json` is also modified

## Extensibility Hooks

- **Environment Variables**: > TODO: Document available environment variables
- **Feature Flags**: > TODO: Add feature flag system if needed
- **Plugin Points**: Windsurf skills in `.windsurf/skills/` for AI automation
- **Asset Loading**: Custom assets can be added to `public/assets/`
- **3D Scene Extension**: Add new Three.js components in `src/components/`

## Further Reading

- [OpenSpec Documentation](./openspec/) - Feature specifications and change documentation
- [Windsurf Skills](./.windsurf/skills/) - AI automation workflows
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [GSAP Documentation](https://greensock.com/docs/)
