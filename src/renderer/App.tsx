import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import WorkspaceLayout from './app/components/WorkspaceLayout';
import GridLayoutDemo from './app/components/GridLayoutDemo';
import PanelSwitcher from './app/components/PanelSwitcher';
import WorkspaceBuilder from './app/components/WorkspaceBuilder';
import ThemePicker from './app/components/ThemePicker';
import { ensureDefaultTemplates } from './app/store/templates/templateStore';
import './App.css';
import './app/theme.css';

function Hello() {
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [builderOpen, setBuilderOpen] = (window as any)._useBuilderState ??= (() => {
    // Tiny module-scoped state without adding new deps
    let open = false;
    const subs = new Set<() => void>();
    return [
      () => open,
      (next: boolean) => { open = next; subs.forEach((fn) => fn()); },
      (fn: () => void) => { subs.add(fn); return () => subs.delete(fn); },
    ];
  })();

  const useRerender = () => {
    const [, force] = (React as any).useReducer((x: number) => x + 1, 0);
    (React as any).useEffect(() => (builderOpen as any)[2](force), []);
  };

  // @ts-ignore minimal local state pattern
  useRerender();

  const isOpen = (builderOpen as any)[0]();
  const setOpen = (val: boolean) => (builderOpen as any)[1](val);

  const [themeOpen, setThemeOpen] = (window as any)._useThemeState ??= (() => {
    let open = false;
    const subs = new Set<() => void>();
    return [
      () => open,
      (next: boolean) => { open = next; subs.forEach((fn) => fn()); },
      (fn: () => void) => { subs.add(fn); return () => subs.delete(fn); },
    ];
  })();

  const useRerenderTheme = () => {
    const [, force] = (React as any).useReducer((x: number) => x + 1, 0);
    (React as any).useEffect(() => (themeOpen as any)[2](force), []);
  };
  // @ts-ignore
  useRerenderTheme();
  const isThemeOpen = (themeOpen as any)[0]();
  const setThemeModal = (v: boolean) => (themeOpen as any)[1](v);

  // Seed default templates on first app render
  React.useEffect(() => {
    try { ensureDefaultTemplates(); } catch {}
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <GridLayoutDemo />
              <PanelSwitcher />
              <div style={{ position: 'fixed', top: 12, left: 12, zIndex: 9999 }}>
                <button
                  onClick={() => setOpen(true)}
                  style={{
                    background: 'var(--color-secondary)',
                    color: 'var(--color-on-secondary)',
                    border: 'none',
                    borderRadius: 10,
                    padding: '8px 12px',
                    cursor: 'pointer',
                  }}
                >
                  Workspace Builder
                </button>
                <button
                  onClick={() => setThemeModal(true)}
                  style={{
                    marginLeft: 8,
                    background: 'var(--color-primary)',
                    color: 'var(--color-on-primary)',
                    border: 'none',
                    borderRadius: 10,
                    padding: '8px 12px',
                    cursor: 'pointer',
                  }}
                >
                  Theme Picker
                </button>
              </div>
              {isOpen && <WorkspaceBuilder onClose={() => setOpen(false)} />}
              {isThemeOpen && <ThemePicker onClose={() => setThemeModal(false)} />}
            </>
          }
        />
        <Route path="/hello" element={<Hello />} />
      </Routes>
    </Router>
  );
}
