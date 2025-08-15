import type { Agent } from '../types';

// Mock agents data for now - this will be replaced with real data later
const MOCK_AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Code Architect',
    role: 'Software Architecture Specialist',
    systemInstruction: 'Expert in designing scalable software architectures, microservices, and system design patterns. I help teams create robust, maintainable, and performant software systems.',
    avatar: '🏗️',
    tags: ['architecture', 'system-design', 'scalability'],
    capabilities: ['System Design', 'Microservices', 'Performance Optimization']
  },
  {
    id: '2',
    name: 'UX Designer',
    role: 'User Experience Designer',
    systemInstruction: 'Specialist in creating intuitive, accessible, and delightful user experiences. I focus on user research, wireframing, prototyping, and usability testing.',
    avatar: '🎨',
    tags: ['ux', 'design', 'user-research'],
    capabilities: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing']
  },
  {
    id: '3',
    name: 'Data Scientist',
    role: 'Data Analysis & Machine Learning Expert',
    systemInstruction: 'Expert in data analysis, statistical modeling, and machine learning. I help organizations make data-driven decisions and build intelligent systems.',
    avatar: '📊',
    tags: ['data-science', 'ml', 'analytics'],
    capabilities: ['Data Analysis', 'Statistical Modeling', 'Machine Learning', 'Data Visualization']
  },
  {
    id: '4',
    name: 'DevOps Engineer',
    role: 'Infrastructure & Automation Specialist',
    systemInstruction: 'Specialist in CI/CD pipelines, infrastructure as code, cloud platforms, and system reliability. I help teams deploy and maintain software efficiently.',
    avatar: '⚙️',
    tags: ['devops', 'infrastructure', 'automation'],
    capabilities: ['CI/CD', 'Infrastructure as Code', 'Cloud Platforms', 'Monitoring']
  },
  {
    id: '5',
    name: 'Security Expert',
    role: 'Cybersecurity Specialist',
    systemInstruction: 'Expert in application security, threat modeling, and security best practices. I help teams build secure software and protect against vulnerabilities.',
    avatar: '🔒',
    tags: ['security', 'cybersecurity', 'threat-modeling'],
    capabilities: ['Security Auditing', 'Threat Modeling', 'Secure Coding', 'Penetration Testing']
  }
];

export const getAllAgents = async (): Promise<Agent[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_AGENTS;
};

export const getAgentById = async (id: string): Promise<Agent | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return MOCK_AGENTS.find(agent => agent.id === id) || null;
};
