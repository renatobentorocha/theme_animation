import React, { useRef, useState } from 'react';
import { Transition, Transitioning } from 'react-native-reanimated';
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
  const transition = <Transition.Change interpolation="easeInOut" />;

  const ref = useRef();

  const handleTheme = (themeVariables: ThemeVariables) => {
    ref?.current?.animateNextTransition();
    setTheme(themeVariables);
    ref?.current?.animateNextTransition();
  };
  return (
    <AppContext.Provider value={{ theme, handleTheme }}>
      <Transitioning.View style={{ flex: 1 }} ref={ref} transition={transition}>
        {children}
      </Transitioning.View>
    </AppContext.Provider>
  );
};
