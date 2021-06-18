import React, { useState } from 'react';
import { lightThemeVariables } from '../../theme/light';
import { ThemeVariables } from '../../theme/variables';

export type ProviderProps = {
  theme: ThemeVariables;
  handleTheme?: (themeVariables: ThemeVariables) => void;
};

export const AppContext = React.createContext<ProviderProps>({
  theme: lightThemeVariables,
});

export const AppProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeVariables>(lightThemeVariables);

  const handleTheme = (themeVariables: ThemeVariables) => {
    setTheme(themeVariables);
  };

  return (
    <AppContext.Provider value={{ theme, handleTheme }}>
      {children}
    </AppContext.Provider>
  );
};
