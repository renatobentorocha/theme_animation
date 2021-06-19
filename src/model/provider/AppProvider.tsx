import React, { useState } from 'react';
import { lightThemeVariables } from '../../theme/light';
import { ThemeVariables } from '../../theme/variables';

export type ThemeState = 'light' | 'dark';

export type ProviderProps = {
  selectedTheme: ThemeState;
  handleSelectedTheme?: (selectedTheme: ThemeState) => void;
  theme: ThemeVariables;
  handleTheme?: (themeVariables: ThemeVariables) => void;
};

export const AppContext = React.createContext<ProviderProps>({
  selectedTheme: 'light',
  theme: lightThemeVariables,
});

export const AppProvider: React.FC = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeState>('light');
  const [theme, setTheme] = useState<ThemeVariables>(lightThemeVariables);

  const handleTheme = (themeVariables: ThemeVariables) => {
    setTheme(themeVariables);
  };

  const handleSelectedTheme = (themeState: ThemeState) => {
    setSelectedTheme(themeState);
  };

  return (
    <AppContext.Provider
      value={{ theme, handleTheme, selectedTheme, handleSelectedTheme }}
    >
      {children}
    </AppContext.Provider>
  );
};
