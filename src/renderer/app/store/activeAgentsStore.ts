import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Agent } from '../types';

interface ActiveAgentsStore {
  activeAgents: Agent[];
  addAgent: (agent: Agent) => void;
  removeAgent: (agentId: string) => void;
  clearAgents: () => void;
}

export const useActiveAgentsStore = create<ActiveAgentsStore>()(
  persist(
    (set, get) => ({
      activeAgents: [],

      addAgent: (agent) => {
        const { activeAgents } = get();
        if (!activeAgents.find(a => a.id === agent.id)) {
          set({ activeAgents: [...activeAgents, agent] });
        }
      },

      removeAgent: (agentId) => {
        const { activeAgents } = get();
        set({ activeAgents: activeAgents.filter(a => a.id !== agentId) });
      },

      clearAgents: () => set({ activeAgents: [] }),
    }),
    { name: 'active-agents-store-v1' }
  )
);
