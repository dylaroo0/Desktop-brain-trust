import React, { useState } from 'react';
import styles from './CounterPage.css';
import WorkspaceLayout from '../../components/WorkspaceLayout';

const CounterPage = () => {
  const [speed, setSpeed] = useState(3);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>BrainTrust Circle</h1>
        <div className={styles.speedControl}>
          <span>Speed: {speed}x</span>
          <select
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
          >
            <option value="1">1x</option>
            <option value="2">2x</option>
            <option value="3">3x</option>
          </select>
        </div>
      </header>

      <WorkspaceLayout />

      <div className={styles.footer}>
        <p>With just the Super Organizer Assistant alone, anyone could 100x their quality of life!</p>
      </div>
    </div>
  );
};

export default CounterPage;