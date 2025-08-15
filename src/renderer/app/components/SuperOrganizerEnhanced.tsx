import React, { useState } from 'react';
import './SuperOrganizer.css';
import './SuperOrganizerPanel.css';

interface Project {
  id: string;
  name: string;
  status: 'active' | 'planning' | 'completed';
  progress: number;
  dueDate: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
}

const SuperOrganizer = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentProject] = useState<Project>({
    id: '1',
    name: 'Children\'s Storybook Project',
    status: 'active',
    progress: 35,
    dueDate: '2025-09-15',
    tasks: [
      { id: '1', title: 'Character Development', completed: true, priority: 'high', assignedTo: 'Character Developer' },
      { id: '2', title: 'Plot Structure Outline', completed: true, priority: 'high', assignedTo: 'Plot Specialist' },
      { id: '3', title: 'Illustration Concepts', completed: false, priority: 'medium', assignedTo: 'Illustration Expert' },
      { id: '4', title: 'First Draft Writing', completed: false, priority: 'high' },
      { id: '5', title: 'Review and Editing', completed: false, priority: 'medium' },
    ]
  });

  const handleDoubleClick = () => {
    setIsPanelOpen(true);
  };

  const handleCreatePriorityList = () => {
    console.log('Creating priority list for:', currentProject.name);
    // TODO: Implement priority list creation
  };

  const handleAssembleTeam = () => {
    console.log('Assembling team for:', currentProject.name);
    // TODO: Open specialist selection
  };

  const completedTasks = currentProject.tasks.filter(task => task.completed).length;
  const totalTasks = currentProject.tasks.length;

  return (
    <>
      <div 
        className="super-organizer"
        onDoubleClick={handleDoubleClick}
        title="Double-click to open project details"
      >
        <div className="organizer-header">
          <h2>🧠 Super Organizer</h2>
          <div className="organizer-subtitle">AI Project Agent</div>
        </div>

        <div className="current-project">
          <div className="project-name">{currentProject.name}</div>
          <div className="project-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${currentProject.progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{currentProject.progress}% complete</span>
          </div>
          <div className="project-stats">
            {completedTasks}/{totalTasks} tasks • Due {new Date(currentProject.dueDate).toLocaleDateString()}
          </div>
        </div>

        <div className="organizer-actions">
          <button 
            className="create-priority-btn"
            onClick={handleCreatePriorityList}
          >
            📋 Create Priority List
          </button>
          <button 
            className="assemble-team-btn"
            onClick={handleAssembleTeam}
          >
            🤖 Assemble Specialists
          </button>
        </div>

        <div className="quick-actions">
          <div className="action-item">
            <span>🎯</span>
            <span>Next: {currentProject.tasks.find(t => !t.completed)?.title || 'All tasks complete!'}</span>
          </div>
          <div className="action-item">
            <span>👥</span>
            <span>3 specialists active</span>
          </div>
        </div>

        <div className="double-click-hint">
          💡 Double-click for full project view
        </div>
      </div>

      {/* Project Detail Panel */}
      {isPanelOpen && (
        <SuperOrganizerPanel 
          project={currentProject}
          onClose={() => setIsPanelOpen(false)}
        />
      )}
    </>
  );
};

// Detailed Project Panel Component
const SuperOrganizerPanel: React.FC<{
  project: Project;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'team' | 'timeline'>('overview');

  return (
    <div className="super-organizer-panel-overlay">
      <div className="super-organizer-panel">
        <div className="panel-header">
          <div className="panel-title">
            <h2>🧠 {project.name}</h2>
            <div className="project-status">{project.status}</div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="panel-tabs">
          {(['overview', 'tasks', 'team', 'timeline'] as const).map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="panel-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="project-metrics">
                <div className="metric">
                  <div className="metric-value">{project.progress}%</div>
                  <div className="metric-label">Progress</div>
                </div>
                <div className="metric">
                  <div className="metric-value">{project.tasks.filter(t => t.completed).length}</div>
                  <div className="metric-label">Completed</div>
                </div>
                <div className="metric">
                  <div className="metric-value">{project.tasks.filter(t => !t.completed).length}</div>
                  <div className="metric-label">Remaining</div>
                </div>
                <div className="metric">
                  <div className="metric-value">3</div>
                  <div className="metric-label">Specialists</div>
                </div>
              </div>

              <div className="recent-activity">
                <h4>Recent Activity</h4>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-time">2 hours ago</span>
                    <span className="activity-text">Character Developer completed "Character Development"</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-time">1 day ago</span>
                    <span className="activity-text">Plot Specialist finished "Plot Structure Outline"</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-time">2 days ago</span>
                    <span className="activity-text">Specialist team assembled for storybook project</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="tasks-tab">
              <div className="task-actions">
                <button className="btn-primary">Add Task</button>
                <button className="btn-secondary">Import from Conversation</button>
              </div>
              
              <div className="task-list">
                {project.tasks.map(task => (
                  <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => {/* TODO: toggle task */}}
                    />
                    <div className="task-content">
                      <div className="task-title">{task.title}</div>
                      {task.assignedTo && (
                        <div className="task-assignee">Assigned to: {task.assignedTo}</div>
                      )}
                    </div>
                    <div className={`task-priority ${task.priority}`}>
                      {task.priority}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="team-tab">
              <div className="team-members">
                <div className="team-member">
                  <div className="member-avatar">👤</div>
                  <div className="member-info">
                    <div className="member-name">Character Developer</div>
                    <div className="member-role">Creative Specialist</div>
                  </div>
                  <div className="member-status online">Active</div>
                </div>
                <div className="team-member">
                  <div className="member-avatar">📚</div>
                  <div className="member-info">
                    <div className="member-name">Plot Specialist</div>
                    <div className="member-role">Story Structure Expert</div>
                  </div>
                  <div className="member-status online">Active</div>
                </div>
                <div className="team-member">
                  <div className="member-avatar">🎨</div>
                  <div className="member-info">
                    <div className="member-name">Illustration Expert</div>
                    <div className="member-role">Visual Design Specialist</div>
                  </div>
                  <div className="member-status working">Working</div>
                </div>
              </div>
              
              <button className="add-member-btn">+ Add Specialist</button>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="timeline-tab">
              <div className="timeline">
                <div className="timeline-item completed">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Project Kickoff</div>
                    <div className="timeline-date">Aug 1, 2025</div>
                  </div>
                </div>
                <div className="timeline-item completed">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Character Development</div>
                    <div className="timeline-date">Aug 5, 2025</div>
                  </div>
                </div>
                <div className="timeline-item active">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Illustration Phase</div>
                    <div className="timeline-date">Aug 13, 2025</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">First Draft</div>
                    <div className="timeline-date">Aug 20, 2025</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Final Review</div>
                    <div className="timeline-date">Sep 15, 2025</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperOrganizer;
