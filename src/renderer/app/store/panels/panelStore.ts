// Lightweight panel store with no external dependencies
// Persists enabled panels to localStorage and emits a window event on change

export type PanelId =
  | 'super-organizer'
  | 'specialist-library'
  | 'chat-feed'
  | 'calendar';

const STORAGE_KEY = 'enabled-panels-v1';
const CHANGE_EVENT = 'panels:change';

const DEFAULT_ENABLED: PanelId[] = ['super-organizer', 'specialist-library', 'chat-feed'];

export function getEnabledPanels(): PanelId[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...DEFAULT_ENABLED];
    const parsed = JSON.parse(raw) as string[];
    // Filter unknown values defensively
    return parsed.filter((p): p is PanelId =>
      ['super-organizer', 'specialist-library', 'chat-feed', 'calendar'].includes(p)
    );
  } catch {
    return [...DEFAULT_ENABLED];
  }
}

export function setEnabledPanels(next: PanelId[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } finally {
    dispatchChange();
  }
}

export function togglePanel(panelId: PanelId) {
  const current = new Set(getEnabledPanels());
  if (current.has(panelId)) {
    current.delete(panelId);
  } else {
    current.add(panelId);
  }
  setEnabledPanels(Array.from(current));
}

export function isPanelEnabled(panelId: PanelId): boolean {
  return getEnabledPanels().includes(panelId);
}

export function onPanelsChange(handler: () => void) {
  const listener = () => handler();
  window.addEventListener(CHANGE_EVENT, listener);
  return () => window.removeEventListener(CHANGE_EVENT, listener);
}

function dispatchChange() {
  const evt = new CustomEvent(CHANGE_EVENT);
  window.dispatchEvent(evt);
}


