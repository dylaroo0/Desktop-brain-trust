import type { Agent } from '../types';

interface CollaborationData {
  oftenPairedWith: string[];
  teamSuccessRate: number;
  usageCount: number;
}

class CollaborationService {
  private collaborationHistory: Map<string, CollaborationData> = new Map();

  constructor() {
    // Initialize with some mock collaboration data
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockData: Record<string, CollaborationData> = {
      '1': { // Code Architect
        oftenPairedWith: ['2', '4'], // UX Designer, DevOps Engineer
        teamSuccessRate: 87,
        usageCount: 23
      },
      '2': { // UX Designer
        oftenPairedWith: ['1', '3'], // Code Architect, Data Scientist
        teamSuccessRate: 92,
        usageCount: 31
      },
      '3': { // Data Scientist
        oftenPairedWith: ['2', '5'], // UX Designer, Security Expert
        teamSuccessRate: 78,
        usageCount: 18
      },
      '4': { // DevOps Engineer
        oftenPairedWith: ['1', '5'], // Code Architect, Security Expert
        teamSuccessRate: 85,
        usageCount: 27
      },
      '5': { // Security Expert
        oftenPairedWith: ['3', '4'], // Data Scientist, DevOps Engineer
        teamSuccessRate: 89,
        usageCount: 22
      }
    };

    Object.entries(mockData).forEach(([agentId, data]) => {
      this.collaborationHistory.set(agentId, data);
    });
  }

  async getCollaborationData(agentId: string): Promise<CollaborationData | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.collaborationHistory.get(agentId) || null;
  }

  async getTeamChemistry(agentIds: string[]): Promise<number> {
    if (agentIds.length < 2) return 100;

    // Calculate team chemistry based on individual success rates and pairing history
    const individualRates = await Promise.all(
      agentIds.map(id => this.getCollaborationData(id))
    );

    const validRates = individualRates.filter(Boolean) as CollaborationData[];
    if (validRates.length === 0) return 75; // Default team chemistry

    const avgSuccessRate = validRates.reduce((sum, data) => sum + data.teamSuccessRate, 0) / validRates.length;

    // Bonus for agents that often work together
    let pairingBonus = 0;
    for (let i = 0; i < agentIds.length; i++) {
      for (let j = i + 1; j < agentIds.length; j++) {
        const data1 = await this.getCollaborationData(agentIds[i]);
        const data2 = await this.getCollaborationData(agentIds[j]);

        if (data1?.oftenPairedWith.includes(agentIds[j]) ||
            data2?.oftenPairedWith.includes(agentIds[i])) {
          pairingBonus += 5;
        }
      }
    }

    return Math.min(100, avgSuccessRate + pairingBonus);
  }

  async recordCollaboration(agentIds: string[], success: boolean): Promise<void> {
    // Record collaboration outcomes for future recommendations
    for (const agentId of agentIds) {
      const current = this.collaborationHistory.get(agentId);
      if (current) {
        const newUsageCount = current.usageCount + 1;
        const newSuccessRate = success
          ? (current.teamSuccessRate * current.usageCount + 100) / newUsageCount
          : (current.teamSuccessRate * current.usageCount) / newUsageCount;

        this.collaborationHistory.set(agentId, {
          ...current,
          usageCount: newUsageCount,
          teamSuccessRate: Math.round(newSuccessRate)
        });
      }
    }
  }

  async getRecommendedTeams(projectType: string, teamSize: number = 3): Promise<string[]> {
    // Simple recommendation logic based on project type
    const recommendations: Record<string, string[]> = {
      'web-development': ['1', '2', '4'], // Architect, UX, DevOps
      'data-project': ['3', '2', '5'],   // Data Scientist, UX, Security
      'security-audit': ['5', '1', '3'], // Security, Architect, Data
      'ui-redesign': ['2', '1', '4'],    // UX, Architect, DevOps
      'system-architecture': ['1', '4', '5'] // Architect, DevOps, Security
    };

    return recommendations[projectType] || recommendations['web-development'];
  }
}

export default new CollaborationService();
