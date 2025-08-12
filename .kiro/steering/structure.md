# Project Structure

## Root Directory
- **src/**: Source code (main and renderer processes)
- **assets/**: Application assets (icons, entitlements)
- **release/**: Build output and packaged applications
- **.erb/**: Electron React Boilerplate configuration and scripts
- **dist/**: Compiled output
- **node_modules/**: Dependencies

## Source Organization

### src/main/
Main Electron process code:
- `main.ts`: Application entry point and window management
- `menu.ts`: Application menu configuration
- `preload.ts`: Preload script for secure renderer communication
- `util.ts`: Utility functions

### src/renderer/
React renderer process code:
- `App.tsx`: Main React application component
- `App.css`: Application styles
- `index.tsx`: React DOM entry point
- `index.ejs`: HTML template
- `app/`: Application-specific components
- `shared/`: Reusable components and utilities

### src/__tests__/
Test files using Jest framework

## Configuration Files
- **package.json**: Dependencies and build configuration
- **tsconfig.json**: TypeScript compiler settings
- **.eslintrc.js**: ESLint rules and configuration
- **.editorconfig**: Editor formatting rules
- **.erb/configs/**: Webpack configurations for different environments

## Build Output
- **release/app/**: Packaged application files
- **release/build/**: Final distributables (installers, DMG, AppImage)
- **.erb/dll/**: Development DLL bundles

## Key Patterns
- Separate main and renderer processes following Electron architecture
- TypeScript throughout with strict type checking
- Component-based React architecture
- Webpack-based build system with environment-specific configs
- Testing co-located with source files
