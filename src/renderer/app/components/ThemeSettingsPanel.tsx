import React, { useState } from 'react';
import { useThemeStore, type Theme } from '../store/theme/themeStore';

interface ThemeSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeSettingsPanel: React.FC<ThemeSettingsPanelProps> = ({ isOpen, onClose }) => {
  const {
    currentTheme,
    savedThemes,
    presetThemes,
    updateThemeColors,
    updateThemeTypography,
    updateThemeSpacing,
    saveTheme,
    loadTheme,
    resetToDefault,
  } = useThemeStore();

  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing' | 'presets'>('colors');
  const [saveThemeName, setSaveThemeName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  if (!isOpen) return null;

  const handleColorChange = (colorKey: keyof typeof currentTheme.colors, value: string) => {
    updateThemeColors({ [colorKey]: value });
  };

  const handleTypographyChange = (key: string, value: string) => {
    if (currentTheme.typography) {
      updateThemeTypography({ [key]: value });
    }
  };

  const handleSpacingChange = (key: string, value: string) => {
    if (currentTheme.spacing) {
      updateThemeSpacing({ [key]: value });
    }
  };

  const handleSaveTheme = () => {
    if (saveThemeName.trim()) {
      saveTheme(saveThemeName.trim());
      setSaveThemeName('');
      setShowSaveDialog(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Theme Settings</h2>

            <div className="flex items-center space-x-3">
              <button
                onClick={resetToDefault}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Reset to Default
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            {(['colors', 'typography', 'spacing', 'presets'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'colors' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white">Color Customization</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(currentTheme.colors).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => handleColorChange(key as keyof typeof currentTheme.colors, e.target.value)}
                          className="w-12 h-8 rounded border border-gray-600"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleColorChange(key as keyof typeof currentTheme.colors, e.target.value)}
                          className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                          placeholder="Hex color code"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'typography' && currentTheme.typography && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white">Typography</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Font Family</label>
                    <input
                      type="text"
                      value={currentTheme.typography.fontFamily}
                      onChange={(e) => handleTypographyChange('fontFamily', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Font Size</label>
                    <input
                      type="text"
                      value={currentTheme.typography.fontSize}
                      onChange={(e) => handleTypographyChange('fontSize', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'spacing' && currentTheme.spacing && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white">Spacing</h3>
                <div className="space-y-4">
                  {Object.entries(currentTheme.spacing).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {key.charAt(0).toUpperCase() + key.slice(1)} Spacing
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleSpacingChange(key, e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                        placeholder="e.g., 16px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'presets' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Preset Themes</h3>
                  <button
                    onClick={() => setShowSaveDialog(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Save Current Theme
                  </button>
                </div>

                                 {/* Preset Themes */}
                 <div className="grid grid-cols-2 gap-4">
                   {presetThemes.map((theme: Theme) => (
                    <div
                      key={theme.id}
                      className="p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                      onClick={() => loadTheme(theme.id)}
                    >
                      <h4 className="font-medium text-white mb-2">{theme.name}</h4>
                      <div className="flex space-x-2">
                        <div
                          className="w-6 h-6 rounded border border-gray-500"
                          style={{ backgroundColor: theme.colors.background }}
                        />
                        <div
                          className="w-6 h-6 rounded border border-gray-500"
                          style={{ backgroundColor: theme.colors.surface }}
                        />
                        <div
                          className="w-6 h-6 rounded border border-gray-500"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Saved Themes */}
                {savedThemes.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-white">Saved Themes</h4>
                                         <div className="grid grid-cols-2 gap-4">
                       {savedThemes.map((theme: Theme) => (
                        <div
                          key={theme.id}
                          className="p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                          onClick={() => loadTheme(theme.id)}
                        >
                          <h4 className="font-medium text-white mb-2">{theme.name}</h4>
                          <div className="flex space-x-2">
                            <div
                              className="w-6 h-6 rounded border border-gray-500"
                              style={{ backgroundColor: theme.colors.background }}
                            />
                            <div
                              className="w-6 h-6 rounded border border-gray-500"
                              style={{ backgroundColor: theme.colors.surface }}
                            />
                            <div
                              className="w-6 h-6 rounded border border-gray-500"
                              style={{ backgroundColor: theme.colors.primary }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Theme Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-medium text-white mb-4">Save Theme</h3>
            <input
              type="text"
              value={saveThemeName}
              onChange={(e) => setSaveThemeName(e.target.value)}
              placeholder="Theme name"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleSaveTheme}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeSettingsPanel;
