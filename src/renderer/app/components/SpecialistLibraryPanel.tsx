import React, { useState } from 'react';
import './SpecialistLibraryPanel.css';

const SpecialistLibraryPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const mockSpecialists = [
    {
      id: '1',
      name: 'Code Architect',
      role: 'Senior Developer',
      avatar: '🏗️',
      description: 'Expert in system design, architecture patterns, and scalable solutions.',
      specialties: ['System Design', 'Microservices', 'Database Design']
    },
    {
      id: '2', 
      name: 'UX Designer',
      role: 'UI/UX Specialist',
      avatar: '🎨',
      description: 'Creates intuitive user experiences and beautiful interface designs.',
      specialties: ['User Research', 'Prototyping', 'Design Systems']
    },
    {
      id: '3',
      name: 'Data Scientist',
      role: 'Analytics Expert',
      avatar: '📊',
      description: 'Transforms data into insights using advanced analytics and ML.',
      specialties: ['Machine Learning', 'Data Visualization', 'Statistical Analysis']
    },
    {
      id: '4',
      name: 'DevOps Engineer',
      role: 'Infrastructure',
      avatar: '⚙️',
      description: 'Builds and maintains robust CI/CD pipelines and cloud infrastructure.',
      specialties: ['Docker', 'Kubernetes', 'AWS', 'Monitoring']
    },
    {
      id: '5',
      name: 'Security Expert',
      role: 'Cybersecurity',
      avatar: '🔒',
      description: 'Ensures application security and compliance with best practices.',
      specialties: ['Penetration Testing', 'Security Audits', 'Compliance']
    },
    {
      id: '6',
      name: 'Product Manager',
      role: 'Strategy',
      avatar: '📈',
      description: 'Defines product strategy and guides development priorities.',
      specialties: ['Product Strategy', 'Market Research', 'Roadmapping']
    }
  ];

  const filters = ['All', 'Development', 'Design', 'Analytics', 'Infrastructure', 'Strategy'];

  const filteredSpecialists = mockSpecialists.filter(specialist => {
    const matchesSearch = specialist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         specialist.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || 
                         specialist.role.toLowerCase().includes(selectedFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const handleAddToWorkspace = (specialist: any) => {
    console.log('Adding specialist to workspace:', specialist.name);
    // TODO: Implement adding specialist to active workspace
  };

  return (
    <div className="specialist-library-panel">
      <div className="specialist-library-header">
        <h3>🤖 AI Specialists</h3>
        <div className="specialist-count">{filteredSpecialists.length} available</div>
      </div>

      <div className="specialist-search-section">
        <input
          type="text"
          placeholder="Search specialists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="specialist-search-input"
        />
        
        <div className="specialist-filters">
          {filters.map(filter => (
            <span
              key={filter}
              className={`filter-tag ${selectedFilter === filter ? 'active' : ''}`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </span>
          ))}
        </div>
      </div>

      <div className="specialist-actions">
        <button className="suggest-team-btn">🤝 Suggest Team</button>
        <button className="view-all-btn">📋 View All</button>
      </div>

      <div className="specialists-grid">
        {filteredSpecialists.length === 0 ? (
          <div className="specialists-empty-state">
            <h4>No specialists found</h4>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredSpecialists.map(specialist => (
            <div key={specialist.id} className="specialist-card">
              <div className="specialist-card-header">
                <div className="specialist-info">
                  <h4>{specialist.name}</h4>
                  <p className="specialist-role">{specialist.role}</p>
                </div>
                <div className="specialist-avatar">{specialist.avatar}</div>
              </div>
              
              <div className="specialist-description">
                {specialist.description}
              </div>
              
              <div className="specialist-stats">
                <div className="specialist-stat">Specialties: {specialist.specialties.join(', ')}</div>
                <div className="specialist-stat">Success Rate: 95%</div>
              </div>
              
              <div className="specialist-actions-card">
                <button 
                  className="add-to-workspace-btn"
                  onClick={() => handleAddToWorkspace(specialist)}
                >
                  + Add to Workspace
                </button>
                <button className="preview-btn">👁️</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SpecialistLibraryPanel;
