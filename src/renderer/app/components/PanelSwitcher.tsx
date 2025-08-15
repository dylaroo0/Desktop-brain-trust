import React from 'react';
import { getEnabledPanels, togglePanel, PanelId, isPanelEnabled } from '../store/panels/panelStore';

const PANELS: Array<{ id: PanelId; label: string }> = [
  { id: 'super-organizer', label: 'Super Organizer' },
  { id: 'specialist-library', label: 'Specialist Library' },
  { id: 'chat-feed', label: 'Conversation' },
  { id: 'calendar', label: 'Calendar' },
];

const PanelSwitcher: React.FC = () => {
  const [, force] = React.useReducer((x) => x + 1, 0);

  const handleToggle = (id: PanelId) => {
    togglePanel(id);
    // Force a re-render of this small control to reflect the new state immediately
    force();
  };

  const enabled = new Set(getEnabledPanels());

  return (
    <div
      style={{
        position: 'fixed',
        top: 12,
        right: 12,
        zIndex: 9999,
        background: 'rgba(17, 24, 39, 0.85)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 10,
        backdropFilter: 'blur(8px)',
        color: '#e5e7eb',
        minWidth: 220,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6, color: '#a78bfa' }}>Panels</div>
      <div style={{ display: 'grid', gap: 6 }}>
        {PANELS.map((p) => (
          <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <input
              type="checkbox"
              checked={enabled.has(p.id) || isPanelEnabled(p.id)}
              onChange={() => handleToggle(p.id)}
            />
            <span>{p.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PanelSwitcher;


