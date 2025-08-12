import { useEffect, useRef } from 'react';
import { GoldenLayout } from 'golden-layout';
import 'golden-layout/dist/css/goldenlayout-base.css';
import 'golden-layout/dist/css/themes/goldenlayout-dark-theme.css';

const WorkspaceLayout = () => {
  const layoutContainer = useRef<HTMLDivElement>(null);
  const layoutInstance = useRef<GoldenLayout | null>(null);

  // Component registration functions
  const registerSuperOrganizer = (layout: GoldenLayout) => {
    layout.registerComponentFactoryFunction('super-organizer', (container: any) => {
      container.element.innerHTML = `
        <div style="padding: 15px; background: #1e1e1e; color: white; height: 100%;">
          <h3 style="color: #4a6cf7; margin-top: 0;">Super Organizer</h3>
          <p>Working at 3x speed</p>
          <button id="create-summary" style="background: #4a6cf7; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Create Priority List</button>
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
        <div style="padding: 15px; background: #1e1e1e; color: white; height: 100%;">
          <h4 style="color: #4a6cf7; margin-top: 0;">AI Specialists</h4>
          <div class="specialist-bubble" style="background: #4a6cf7; color: white; padding: 8px; border-radius: 4px; margin: 5px 0; cursor: pointer;">Code Expert</div>
          <div class="specialist-bubble" style="background: #4a6cf7; color: white; padding: 8px; border-radius: 4px; margin: 5px 0; cursor: pointer;">Marketing Guru</div>
          <div class="specialist-bubble" style="background: #4a6cf7; color: white; padding: 8px; border-radius: 4px; margin: 5px 0; cursor: pointer;">Legal Advisor</div>
        </div>
      `;
    });
  };

  const registerChatFeed = (layout: GoldenLayout) => {
    layout.registerComponentFactoryFunction('chat-feed', (container: any) => {
      container.element.innerHTML = `
        <div style="padding: 15px; display: flex; flex-direction: column; gap: 10px; height: 100%; background: #1e1e1e; color: white;">
          <div style="flex: 1; overflow-y: auto;">
            <div style="margin: 5px 0; color: #ccc"><strong>You:</strong> How do I optimize my workflow?</div>
            <div style="margin: 5px 0; color: #4a6cf7"><strong>Office Assistant:</strong> Let me analyze your current workflow...</div>
          </div>
          <input
            type="text"
            placeholder="Ask your specialists..."
            style="padding: 8px; border-radius: 4px; border: 1px solid #444; background: #2d2d2d; color: white;"
          />
        </div>
      `;
    });
  };

  useEffect(() => {
    if (!layoutContainer.current) return;

    // Default layout configuration for Golden Layout v2
    const defaultConfig = {
      root: {
        type: 'row',
        content: [
          {
            type: 'component',
            componentType: 'super-organizer',
            title: 'Super Organizer',
            width: 25,
          },
          {
            type: 'column',
            content: [
              {
                type: 'component',
                componentType: 'specialist-library',
                title: 'AI Specialists',
                height: 30,
              },
              {
                type: 'component',
                componentType: 'chat-feed',
                title: 'Conversation',
                height: 70,
              },
            ],
          },
        ],
      },
    };

    // Initialize Golden Layout
    const layout = new GoldenLayout(layoutContainer.current);
    layoutInstance.current = layout;

    // Register components
    registerSuperOrganizer(layout);
    registerSpecialistLibrary(layout);
    registerChatFeed(layout);

    // Load layout
    layout.loadLayout(defaultConfig);

    return () => {
      if (layoutInstance.current) {
        layoutInstance.current.destroy();
        layoutInstance.current = null;
      }
    };
  }, []);

  return <div ref={layoutContainer} style={{ height: 'calc(100vh - 80px)' }} />;
};



export default WorkspaceLayout;
