import React from 'react';

type ThemeTokens = {
  background: string;
  surface: string;
  surfaceVariant: string;
  primary: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;
  outline: string;
};

const STORAGE_KEY = 'theme-tokens-v1';

const DEFAULT_TOKENS: ThemeTokens = {
  background: '#111827',
  surface: '#1f2937',
  surfaceVariant: '#374151',
  primary: '#8b5cf6',
  onPrimary: '#ffffff',
  secondary: '#22c55e',
  onSecondary: '#0b1220',
  outline: '#6b7280',
};

const PRESETS: Array<{ id: string; name: string; tokens: ThemeTokens }> = [
  { id: 'violet-emerald', name: 'Violet / Emerald', tokens: DEFAULT_TOKENS },
  {
    id: 'warm-dark',
    name: 'Warm Dark',
    tokens: {
      background: '#1c1917',
      surface: '#292524',
      surfaceVariant: '#44403c',
      primary: '#f97316',
      onPrimary: '#0b1220',
      secondary: '#84cc16',
      onSecondary: '#0b1220',
      outline: '#78716c',
    },
  },
  {
    id: 'cool-teal',
    name: 'Cool Gray / Teal',
    tokens: {
      background: '#0f172a',
      surface: '#111827',
      surfaceVariant: '#1f2937',
      primary: '#14b8a6',
      onPrimary: '#052e2b',
      secondary: '#60a5fa',
      onSecondary: '#0b1220',
      outline: '#475569',
    },
  },
  {
    id: 'rose-grape',
    name: 'Rose / Grape',
    tokens: {
      background: '#111827',
      surface: '#1f2937',
      surfaceVariant: '#374151',
      primary: '#f43f5e',
      onPrimary: '#0b1220',
      secondary: '#a78bfa',
      onSecondary: '#0b1220',
      outline: '#6b7280',
    },
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    tokens: {
      background: '#000000',
      surface: '#121212',
      surfaceVariant: '#262626',
      primary: '#ffffff',
      onPrimary: '#000000',
      secondary: '#e5e5e5',
      onSecondary: '#000000',
      outline: '#9ca3af',
    },
  },
];

function applyTokens(tokens: ThemeTokens) {
  const root = document.documentElement;
  root.style.setProperty('--color-background', tokens.background);
  root.style.setProperty('--color-surface', tokens.surface);
  root.style.setProperty('--color-surface-variant', tokens.surfaceVariant);
  root.style.setProperty('--color-primary', tokens.primary);
  root.style.setProperty('--color-on-primary', tokens.onPrimary);
  root.style.setProperty('--color-secondary', tokens.secondary);
  root.style.setProperty('--color-on-secondary', tokens.onSecondary);
  root.style.setProperty('--color-outline', tokens.outline);
}

function loadTokens(): ThemeTokens {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TOKENS;
    const parsed = JSON.parse(raw) as ThemeTokens;
    return { ...DEFAULT_TOKENS, ...parsed };
  } catch {
    return DEFAULT_TOKENS;
  }
}

function saveTokens(tokens: ThemeTokens) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

interface ThemePickerProps {
  onClose: () => void;
}

const ThemePicker: React.FC<ThemePickerProps> = ({ onClose }) => {
  const [tokens, setTokens] = React.useState<ThemeTokens>(loadTokens());

  React.useEffect(() => {
    // Ensure stored theme is applied on first open
    applyTokens(tokens);
  }, []);

  const update = (patch: Partial<ThemeTokens>) => {
    const next = { ...tokens, ...patch };
    setTokens(next);
    applyTokens(next);
    saveTokens(next);
  };

  const reset = () => {
    setTokens(DEFAULT_TOKENS);
    applyTokens(DEFAULT_TOKENS);
    saveTokens(DEFAULT_TOKENS);
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          width: 'min(900px, 92vw)',
          maxHeight: '86vh',
          overflow: 'auto',
          background: 'var(--color-surface-variant)',
          color: 'var(--color-on-surface)',
          borderRadius: 14,
          border: '1px solid var(--color-outline)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid var(--color-outline)' }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--color-primary)' }}>Theme Picker</div>
          <button onClick={onClose} style={{ background: 'transparent', color: 'var(--color-on-surface-variant)', border: 'none', fontSize: 18, cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ padding: 16, display: 'grid', gap: 16 }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Presets</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {PRESETS.map((p) => (
                <div key={p.id} style={{ border: '1px solid var(--color-outline)', borderRadius: 12, padding: 12, background: 'var(--color-surface)' }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>{p.name}</div>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                    {['background', 'surface', 'primary', 'secondary'].map((k) => (
                      <div key={k} style={{ width: 28, height: 20, borderRadius: 6, border: '1px solid var(--color-outline)', background: (p.tokens as any)[k] }} />
                    ))}
                  </div>
                  <button
                    onClick={() => update(p.tokens)}
                    style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}
                  >
                    Use preset
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 600, margin: '8px 0' }}>Customize</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {([
                ['background', 'Background'],
                ['surface', 'Surface'],
                ['surfaceVariant', 'Surface Variant'],
                ['primary', 'Primary'],
                ['onPrimary', 'On Primary'],
                ['secondary', 'Secondary'],
                ['onSecondary', 'On Secondary'],
                ['outline', 'Outline'],
              ] as Array<[keyof ThemeTokens, string]>).map(([key, label]) => (
                <div key={key} style={{ border: '1px solid var(--color-outline)', borderRadius: 12, padding: 12, background: 'var(--color-surface)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-on-surface-variant)', marginBottom: 6 }}>{label}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="color"
                      value={tokens[key]}
                      onChange={(e) => update({ [key]: e.target.value } as Partial<ThemeTokens>)}
                      style={{ width: 36, height: 28, border: '1px solid var(--color-outline)', borderRadius: 6, background: 'transparent' }}
                    />
                    <input
                      type="text"
                      value={tokens[key]}
                      onChange={(e) => update({ [key]: e.target.value } as Partial<ThemeTokens>)}
                      style={{ flex: 1, background: 'var(--color-surface-variant)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)', borderRadius: 6, padding: '6px 8px' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, padding: 16, borderTop: '1px solid var(--color-outline)' }}>
          <button onClick={reset} style={{ background: 'transparent', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)', borderRadius: 8, padding: '10px 14px', cursor: 'pointer' }}>Reset</button>
          <button onClick={onClose} style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)', border: 'none', borderRadius: 8, padding: '10px 14px', cursor: 'pointer' }}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default ThemePicker;


