import { PanelId, setEnabledPanels } from '../panels/panelStore';

export interface WorkspaceTemplate {
  id: string;
  name: string;
  enabledPanels: PanelId[];
  createdAt: string; // ISO date
}

const STORAGE_KEY = 'workspace-templates-v1';

function readTemplates(): WorkspaceTemplate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as WorkspaceTemplate[];
  } catch {
    return [];
  }
}

function writeTemplates(list: WorkspaceTemplate[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function listTemplates(): WorkspaceTemplate[] {
  return readTemplates();
}

export function saveTemplate(name: string, enabledPanels: PanelId[]): WorkspaceTemplate {
  const list = readTemplates();
  const tmpl: WorkspaceTemplate = {
    id: `tmpl-${Date.now()}`,
    name,
    enabledPanels: Array.from(new Set(enabledPanels)),
    createdAt: new Date().toISOString(),
  };
  writeTemplates([tmpl, ...list]);
  return tmpl;
}

export function deleteTemplate(id: string) {
  const list = readTemplates();
  writeTemplates(list.filter((t) => t.id !== id));
}

export function applyTemplate(id: string): boolean {
  const list = readTemplates();
  const tmpl = list.find((t) => t.id === id);
  if (!tmpl) return false;
  setEnabledPanels(tmpl.enabledPanels);
  return true;
}

// Seed a few helpful starter templates if user has none
export function ensureDefaultTemplates() {
  const existing = readTemplates();
  if (existing.length > 0) return;
  const now = new Date().toISOString();
  const defaults: WorkspaceTemplate[] = [
    {
      id: 'tmpl-design-sprint',
      name: 'Design Sprint',
      enabledPanels: ['super-organizer', 'specialist-library', 'chat-feed'],
      createdAt: now,
    },
    {
      id: 'tmpl-dev-standup',
      name: 'Dev Standup',
      enabledPanels: ['chat-feed', 'calendar', 'super-organizer'],
      createdAt: now,
    },
    {
      id: 'tmpl-client-review',
      name: 'Client Review',
      enabledPanels: ['chat-feed', 'specialist-library'],
      createdAt: now,
    },
  ];
  writeTemplates(defaults);
}


