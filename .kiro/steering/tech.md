# Technology Stack

## Core Technologies
- **Electron**: Desktop app framework
- **React 19**: UI library with JSX
- **TypeScript**: Primary language for type safety
- **Webpack**: Module bundler and build system
- **Sass**: CSS preprocessing
- **Jest**: Testing framework with jsdom

## Build System
- **Webpack configurations**: Separate configs for main, renderer, and preload processes
- **ts-node**: TypeScript execution for build scripts
- **electron-builder**: Packaging and distribution

## Development Tools
- **ESLint**: Code linting with erb config
- **Prettier**: Code formatting (single quotes, 2-space indentation)
- **React Fast Refresh**: Hot reloading
- **electronmon**: Development process monitoring

## Common Commands

### Development
```bash
npm start          # Start development server
npm run start:main # Start main process with watch mode
```

### Building
```bash
npm run build      # Build for production
npm run package    # Package for distribution
npm run build:dll  # Build development DLL
```

### Code Quality
```bash
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm test           # Run Jest tests
```

## Code Style
- 2-space indentation
- Single quotes for strings
- Semicolons required
- LF line endings
- TypeScript strict mode enabled
- React JSX without explicit React imports (new JSX transform)
