import { PanelId, setEnabledPanels } from '../panels/panelStore';

export interface TeamTemplate {
  id: string;
  teamId: string;
  name: string;
  enabledPanels: PanelId[];
  createdAt: string; // ISO
  createdBy?: string;
}

const STORAGE_KEY = 'workspace-team-templates-v1';

function readTemplates(): TeamTemplate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as TeamTemplate[];
  } catch {
    return [];
  }
}

function writeTemplates(list: TeamTemplate[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function listTeamTemplates(teamId: string): TeamTemplate[] {
  return readTemplates().filter((t) => t.teamId === teamId);
}

export function saveTeamTemplate(
  teamId: string,
  name: string,
  enabledPanels: PanelId[],
  createdBy?: string
): TeamTemplate {
  const list = readTemplates();
  const tmpl: TeamTemplate = {
    id: `team-tmpl-${Date.now()}`,
    teamId,
    name,
    enabledPanels: Array.from(new Set(enabledPanels)),
    createdAt: new Date().toISOString(),
    createdBy,
  };
  writeTemplates([tmpl, ...list]);
  return tmpl;
}

export function deleteTeamTemplate(teamId: string, id: string) {
  const list = readTemplates();
  writeTemplates(list.filter((t) => !(t.teamId === teamId && t.id === id)));
}

export function applyTeamTemplate(teamId: string, id: string): boolean {
  const tmpl = readTemplates().find((t) => t.teamId === teamId && t.id === id);
  if (!tmpl) return false;
  setEnabledPanels(tmpl.enabledPanels);
  return true;
}

export function ensureDefaultTeamTemplates(teamId: string) {
  const existing = listTeamTemplates(teamId);
  if (existing.length > 0) return;
  const now = new Date().toISOString();
  const defaults: TeamTemplate[] = [
    {
      id: `team-${teamId}-planning`,
      teamId,
      name: 'Team Planning',
      enabledPanels: ['super-organizer', 'chat-feed', 'specialist-library'],
      createdAt: now,
    },
    {
      id: `team-${teamId}-delivery`,
      teamId,
      name: 'Delivery Focus',
      enabledPanels: ['chat-feed', 'calendar'],
      createdAt: now,
    },
  ];
  writeTemplates([...defaults, ...readTemplates()]);
}


