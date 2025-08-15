import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-resizable/css/styles.css';
import '../styles.css';
const GridLayoutDemo = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const layout = [
    { i: '1', x: 0, y: 0, w: 2, h: 3, minW: 1, minH: 1 },
    { i: '2', x: 2, y: 0, w: 2, h: 3, minW: 1, minH: 1 }
  ];
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={100}
      draggableCancel=".non-draggable"
    >
      <div key="1" className="grid-item">
        <div style={{ padding: '10px', background: '#fff', border: '1px solid #ddd' }}>
          Super Organizer
        </div>
      </div>
      <div key="2" className="grid-item">
        <div style={{ padding: '10px', background: '#fff', border: '1px solid #ddd' }}>
          AI Specialists
        </div>
      </div>
    </ResponsiveGridLayout>
  );
};
export default GridLayoutDemo;
