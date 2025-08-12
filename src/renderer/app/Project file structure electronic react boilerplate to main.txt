electron-react-boilerplate-main/
├── node_modules/                # Don't modify this
├── public/                      # Static assets (if needed)
├── src/
│   ├── main/                    # Electron main process
│   │   ├── main.ts              # Main Electron logic
│   │   └── util.ts              # Helper functions
│   ├── renderer/                # Your React application
│   │   ├── app/                 # Core app structure
│   │   │   ├── components/      # Reusable UI components
│   │   │   │   └── WorkspaceLayout.tsx  # Golden Layout implementation
│   │   │   ├── pages/           # Page containers
│   │   │   │   └── CounterPage/ # Your main workspace
│   │   │   │       ├── CounterPage.tsx   # Main UI
│   │   │   │       └── CounterPage.css    # UI styles
│   │   │   ├── store/           # State management (Redux Toolkit)
│   │   │   │   ├── config/      # Configuration system
│   │   │   │   ├── specialists/ # Specialist registry
│   │   │   │   └── index.ts     # Store setup
│   │   │   ├── index.tsx        # App entry point
│   │   │   └── preload.ts       # Preload script for Electron
│   │   ├── specs/               # Tests (if used)
│   │   └── _tests_/              # Test helpers
│   ├── .erb/                    # Build artifacts (don't modify)
│   ├── .vscode/                 # VS Code settings
│   ├── package.json             # Project dependencies
│   └── tsconfig.json            # TypeScript config