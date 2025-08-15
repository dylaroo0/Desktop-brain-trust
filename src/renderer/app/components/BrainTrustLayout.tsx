import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import SuperOrganizerEnhanced from './SuperOrganizerEnhanced';
import SpecialistLibraryPanel from './SpecialistLibraryPanel';
import ConversationFeed from './ConversationFeed';
import 'react-resizable/css/styles.css';
import '../styles.css';
import './BrainTrustLayout.css';

const BrainTrustLayout = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  
  const layout = [
    { i: 'super-organizer', x: 0, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
    { i: 'specialist-library', x: 3, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
    { i: 'conversation-feed', x: 6, y: 0, w: 6, h: 4, minW: 4, minH: 3 }
  ];

  return (
    <div className="braintrust-workspace">
      <div className="workspace-header">
        <h1>🧠 BrainTrust Circle</h1>
        <div className="workspace-subtitle">AI Collaboration Environment</div>
      </div>
      
      <ResponsiveGridLayout
        className="braintrust-layout"
        layouts={{ lg: layout }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        draggableCancel=".non-draggable"
        margin={[10, 10]}
      >
        <div key="super-organizer" className="braintrust-panel organizer-panel">
          <SuperOrganizerEnhanced />
        </div>
        
        <div key="specialist-library" className="braintrust-panel specialists-panel">
          <SpecialistLibraryPanel />
        </div>
        
        <div key="conversation-feed" className="braintrust-panel feed-panel">
          <ConversationFeed />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default BrainTrustLayout;
