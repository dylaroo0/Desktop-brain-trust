import { useEffect, useRef } from 'react';
import { GoldenLayout } from 'golden-layout';
import 'golden-layout/dist/css/goldenlayout-base.css';
import 'golden-layout/dist/css/themes/goldenlayout-dark-theme.css';
import 'golden-layout/dist/css/themes/goldenlayout-light-theme.css';
import { getEnabledPanels, onPanelsChange, PanelId } from '../store/panels/panelStore';

type ThemeMode = 'light' | 'dark';

type LayoutConfig = {
  root: unknown;
};

interface WorkspaceLayoutProps {
  theme?: ThemeMode;
  initialLayout?: LayoutConfig;
  onLayoutChange?: (config: LayoutConfig) => void;
}

const LOCAL_STORAGE_KEY = 'workspace-layout-config-v1';

const WorkspaceLayout = ({ theme = 'dark', initialLayout, onLayoutChange }: WorkspaceLayoutProps) => {
  const layoutContainer = useRef<HTMLDivElement>(null);
  const layoutInstance = useRef<GoldenLayout | null>(null);

  // Component registration functions
  const registerSuperOrganizer = (layout: GoldenLayout) => {
    layout.registerComponentFactoryFunction('super-organizer', (container: any) => {
      container.element.innerHTML = `
        <div style="padding: 15px; background: var(--color-surface); color: var(--color-on-surface); height: 100%;">
          <h3 style="color: var(--color-primary); margin-top: 0;">Super Organizer</h3>
          <p>Working at 3x speed</p>
          <button id="create-summary" style="background: var(--color-primary); color: var(--color-on-primary); border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Create Priority List</button>
        </div>
      `;

      const btn = container.element.querySelector('#create-summary');
      if (btn) {
        btn.addEventListener('click', () => {
          console.log('Creating priority list...');
          // Add your priority list functionality here
        });
      }
    });
  };

  const registerSpecialistLibrary = (layout: GoldenLayout) => {
    layout.registerComponentFactoryFunction('specialist-library', (container: any) => {
      container.element.innerHTML = `
        <div style="padding: 15px; background: var(--color-surface); color: var(--color-on-surface); height: 100%; overflow-y: auto;">
          <h4 style="color: var(--color-primary); margin-top: 0; margin-bottom: 16px;">AI Specialists Library</h4>

          <!-- Search and Filter Section -->
          <div style="margin-bottom: 16px;">
            <input
              type="text"
              placeholder="Search specialists..."
              style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--color-outline); background: var(--color-surface-variant); color: var(--color-on-surface); margin-bottom: 8px;"
            />
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <span style="background: var(--color-primary); color: var(--color-on-primary); padding: 4px 8px; border-radius: 4px; font-size: 12px;">🏗️ Code Architect</span>
              <span style="background: var(--color-primary); color: var(--color-on-primary); padding: 4px 8px; border-radius: 4px; font-size: 12px;">🎨 UX Designer</span>
              <span style="background: var(--color-primary); color: var(--color-on-primary); padding: 4px 8px; border-radius: 4px; font-size: 12px;">📊 Data Scientist</span>
              <span style="background: var(--color-primary); color: var(--color-on-primary); padding: 4px 8px; border-radius: 4px; font-size: 12px;">⚙️ DevOps Engineer</span>
              <span style="background: var(--color-primary); color: var(--color-on-primary); padding: 4px 8px; border-radius: 4px; font-size: 12px;">🔒 Security Expert</span>
            </div>
          </div>

          <!-- Quick Actions -->
          <div style="margin-bottom: 16px;">
            <button style="background: var(--color-primary); color: var(--color-on-primary); border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin-right: 8px;">🤝 Suggest Team</button>
            <button style="background: var(--color-surface-variant); color: var(--color-on-surface); border: 1px solid var(--color-outline); padding: 8px 16px; border-radius: 6px; cursor: pointer;">📋 View All</button>
          </div>

          <p style="color: var(--color-on-surface-variant); font-size: 14px;">
            This is the enhanced Specialist Library panel. The full AgentLibraryPanel component is ready to be integrated.
          </p>
        </div>
      `;
    });
  };

  const registerChatFeed = (layout: GoldenLayout) => {
    layout.registerComponentFactoryFunction('chat-feed', (container: any) => {
      container.element.innerHTML = `
        <div style="padding: 15px; display: flex; flex-direction: column; gap: 10px; height: 100%; background: var(--color-surface); color: var(--color-on-surface);">
          <div style="flex: 1; overflow-y: auto;">
            <div style="margin: 5px 0; color: var(--color-on-surface-variant)"><strong>You:</strong> How do I optimize my workflow?</div>
            <div style="margin: 5px 0; color: var(--color-primary)"><strong>Office Assistant:</strong> Let me analyze your current workflow...</div>
          </div>
          <input
            type="text"
            placeholder="Ask your specialists..."
            style="padding: 8px; border-radius: 6px; border: 1px solid var(--color-outline); background: var(--color-surface-variant); color: var(--color-on-surface);"
          />
        </div>
      `;
    });
  };

  const registerCalendar = (layout: GoldenLayout) => {
    layout.registerComponentFactoryFunction('calendar', (container: any) => {
      container.element.innerHTML = `
        <div style="padding: 15px; background: var(--color-surface); color: var(--color-on-surface); height: 100%;">
          <h4 style="color: var(--color-primary); margin-top: 0;">Calendar</h4>
          <p style="color: var(--color-on-surface-variant);">This is a placeholder calendar panel. You can disable it from the Panel Switcher.</p>
        </div>
      `;
    });
  };

  const registerEmptyState = (layout: GoldenLayout) => {
    layout.registerComponentFactoryFunction('empty-state', (container: any) => {
      container.element.innerHTML = `
        <div style="padding: 24px; background: #111827; color: #9ca3af; height: 100%; display: flex; align-items: center; justify-content: center;">
          <div style="text-align:center; max-width: 420px;">
            <div style="font-size: 28px; margin-bottom: 8px; color:#a78bfa;">No panels enabled</div>
            <div>Use the Panel Switcher (top-right) to enable panels like Conversation, Specialists, Organizer, or Calendar.</div>
          </div>
        </div>
      `;
    });
  };

  const buildConfigFromEnabled = (enabledPanels: PanelId[]): LayoutConfig => {
    const centerContent: any[] = [];
    if (enabledPanels.includes('specialist-library')) {
      centerContent.push({
        type: 'component',
        componentType: 'specialist-library',
        title: 'AI Specialists',
        height: 30,
      });
    }
    if (enabledPanels.includes('chat-feed')) {
      centerContent.push({
        type: 'component',
        componentType: 'chat-feed',
        title: 'Conversation',
        height: enabledPanels.includes('specialist-library') ? 70 : 100,
      });
    }
    if (enabledPanels.includes('calendar')) {
      centerContent.push({
        type: 'component',
        componentType: 'calendar',
        title: 'Calendar',
        height: 40,
      });
    }

    if (centerContent.length === 0) {
      centerContent.push({
        type: 'component',
        componentType: 'empty-state',
        title: 'No Panels',
        height: 100,
      });
    }

    const column = { type: 'column', content: centerContent } as const;

    if (enabledPanels.includes('super-organizer')) {
      return {
        root: {
          type: 'row',
          content: [
            {
              type: 'component',
              componentType: 'super-organizer',
              title: 'Super Organizer',
              width: 25,
            },
            column,
          ],
        },
      } as unknown as LayoutConfig;
    }

    return {
      root: column as unknown,
    } as unknown as LayoutConfig;
  };

  useEffect(() => {
    if (!layoutContainer.current) return;

    // Default layout derived from enabled panels
    const defaultConfig: LayoutConfig = buildConfigFromEnabled(getEnabledPanels());

    // Initialize Golden Layout
    const layout = new GoldenLayout(layoutContainer.current);
    layoutInstance.current = layout;

    // Apply theme class to the container
    const containerEl = layoutContainer.current;
    containerEl.classList.remove('lm_theme_dark', 'lm_theme_light');
    containerEl.classList.add(theme === 'dark' ? 'lm_theme_dark' : 'lm_theme_light');

    // Register components
    registerSuperOrganizer(layout);
    registerSpecialistLibrary(layout);
    registerChatFeed(layout);
    registerCalendar(layout);
    registerEmptyState(layout);

    // Load layout with persistence fallback
    let configToLoad: LayoutConfig = defaultConfig;
    if (initialLayout) {
      configToLoad = initialLayout;
    } else {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) configToLoad = JSON.parse(saved) as LayoutConfig;
      } catch {
        // ignore malformed saved config
      }
    }

    layout.loadLayout(configToLoad as any);

    // Persist layout on state changes
    const handleStateChanged = () => {
      try {
        const current = layout.saveLayout() as unknown as LayoutConfig;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
        if (onLayoutChange) onLayoutChange(current);
      } catch {
        // ignore save errors
      }
    };
    // @ts-expect-error - event typing from golden-layout
    layout.on('stateChanged', handleStateChanged);

    return () => {
      if (layoutInstance.current) {
        // @ts-expect-error - event typing from golden-layout
        layoutInstance.current.off('stateChanged', handleStateChanged);
        layoutInstance.current.destroy();
        layoutInstance.current = null;
      }
    };
  }, []);

  // React to panel enable/disable changes at runtime
  useEffect(() => {
    const unsubscribe = onPanelsChange(() => {
      const layout = layoutInstance.current;
      if (!layout) return;
      const nextConfig = buildConfigFromEnabled(getEnabledPanels());
      try {
        layout.loadLayout(nextConfig as any);
      } catch {
        // ignore
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <div ref={layoutContainer} style={{ height: 'calc(100vh - 80px)' }} />;
};



export default WorkspaceLayout;
