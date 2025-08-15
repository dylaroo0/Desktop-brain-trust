import React from 'react';
import { getEnabledPanels, PanelId, togglePanel, setEnabledPanels } from '../store/panels/panelStore';
import { listTemplates, saveTemplate, applyTemplate, deleteTemplate } from '../store/templates/templateStore';

interface WorkspaceBuilderProps {
  onClose: () => void;
}

const ALL_PANELS: Array<{ id: PanelId; name: string; description: string }> = [
  { id: 'super-organizer', name: 'Super Organizer', description: 'Admin assistant orchestration cockpit' },
  { id: 'specialist-library', name: 'Specialist Library', description: 'Browse and pin AI specialists' },
  { id: 'chat-feed', name: 'Conversation Feed', description: 'One-thread conversation interface' },
  { id: 'calendar', name: 'Calendar', description: 'Deadlines, milestones, and schedule' },
];

const cardStyle: React.CSSProperties = {
  background: 'var(--color-surface)',
  color: 'var(--color-on-surface)',
  border: '1px solid var(--color-outline)',
  borderRadius: 12,
  padding: 16,
};

const WorkspaceBuilder: React.FC<WorkspaceBuilderProps> = ({ onClose }) => {
  const [enabled, setEnabled] = React.useState<Set<PanelId>>(new Set(getEnabledPanels()));

  const handleToggle = (id: PanelId) => {
    const next = new Set(enabled);
    if (next.has(id)) next.delete(id); else next.add(id);
    setEnabled(next);
  };

  const apply = () => {
    setEnabledPanels(Array.from(enabled));
    onClose();
  };

  const [templates, setTemplates] = React.useState(() => listTemplates());
  const [newName, setNewName] = React.useState('');

  const handleSaveTemplate = () => {
    if (!newName.trim()) return;
    const t = saveTemplate(newName.trim(), Array.from(enabled));
    setTemplates([t, ...templates]);
    setNewName('');
  };

  const handleApplyTemplate = (id: string) => {
    if (applyTemplate(id)) {
      setEnabled(new Set(getEnabledPanels()));
    }
  };

  const handleDeleteTemplate = (id: string) => {
    deleteTemplate(id);
    setTemplates(listTemplates());
  };

  const selectAll = () => {
    setEnabled(new Set(ALL_PANELS.map(p => p.id)));
  };

  const deselectAll = () => {
    setEnabled(new Set());
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          width: 'min(960px, 92vw)',
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
          <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--color-primary)' }}>Workspace Builder</div>
          <button onClick={onClose} style={{ background: 'transparent', color: 'var(--color-on-surface-variant)', border: 'none', fontSize: 18, cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ padding: 16 }}>
          <div style={{ marginBottom: 16, border: '1px solid var(--color-outline)', borderRadius: 12, padding: 12, background: 'var(--color-surface)' }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Templates</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Template name..."
                style={{ flex: 1, background: 'var(--color-surface-variant)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)', borderRadius: 8, padding: '8px 10px' }}
              />
              <button onClick={handleSaveTemplate} style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)', border: 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer' }}>Save as Template</button>
            </div>
            {templates.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 8 }}>
                {templates.map((t) => (
                  <div key={t.id} style={{ border: '1px solid var(--color-outline)', borderRadius: 10, padding: 10, background: 'var(--color-surface-variant)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div style={{ fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-on-surface-variant)' }}>{new Date(t.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                      {t.enabledPanels.map((p) => (
                        <span key={p} style={{ fontSize: 12, border: '1px solid var(--color-outline)', borderRadius: 999, padding: '2px 8px' }}>{p}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => handleApplyTemplate(t.id)} style={{ background: 'var(--color-secondary)', color: 'var(--color-on-secondary)', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}>Apply</button>
                      <button onClick={() => handleDeleteTemplate(t.id)} style={{ background: 'transparent', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--color-on-surface-variant)' }}>No templates yet. Save your current selection as a template.</div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <button onClick={selectAll} style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)', border: 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer' }}>Select All</button>
            <button onClick={deselectAll} style={{ background: 'transparent', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)', borderRadius: 8, padding: '8px 12px', cursor: 'pointer' }}>Deselect All</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {ALL_PANELS.map(panel => (
              <div key={panel.id} style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontWeight: 600 }}>{panel.name}</div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                    <input type="checkbox" checked={enabled.has(panel.id)} onChange={() => handleToggle(panel.id)} />
                    <span>{enabled.has(panel.id) ? 'On' : 'Off'}</span>
                  </label>
                </div>
                <div style={{ fontSize: 13, color: 'var(--color-on-surface-variant)' }}>{panel.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, padding: 16, borderTop: '1px solid var(--color-outline)' }}>
          <button onClick={onClose} style={{ background: 'transparent', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)', borderRadius: 8, padding: '10px 14px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={apply} style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)', border: 'none', borderRadius: 8, padding: '10px 14px', cursor: 'pointer' }}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceBuilder;


