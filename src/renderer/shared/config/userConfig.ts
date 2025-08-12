interface UserConfig {
  layout?: any;
}

export function loadUserConfig(): UserConfig {
  try {
    const saved = localStorage.getItem('userConfig');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function saveUserConfig(config: UserConfig): void {
  try {
    const current = loadUserConfig();
    const updated = { ...current, ...config };
    localStorage.setItem('userConfig', JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save user config:', error);
  }
}
