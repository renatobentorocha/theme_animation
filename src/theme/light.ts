import { themeVariables, ThemeVariables } from './variables';

export const lightThemeVariables: ThemeVariables = {
  ...themeVariables,
  colors: {
    ...themeVariables.colors,
    systemColors: {
      red: '#FF3B30',
      orange: '#FF9500',
      yellow: '#FFCC00',
      green: '#34C759',
      teal: '#5AC8FA',
      blue: '#007AFF',
      indigo: '#5856D6',
      purple: '#AF52DE',
      pink: '#FF2D55',
    },
    systemGrayscale: {
      gray_1: '#8E8E93',
      gray_2: '#AEAEB2',
      gray_3: '#C7C7CC',
      gray_4: '#D1D1D6',
      gray_5: '#E5E5EA',
      gray_6: '#F2F2F7',
    },
    label: {
      primary: '#000',
      secondary: '#3C3C4399',
      tertiary: '#3C3C434D',
      quarternary: '#3C3C432E',
    },
    background: {
      main: '#ffffff',
      surface_1: '#fafafa',
      surface_2: '#f5f5f5',
      stroke: '#d1d1d6',
    },
  },
};
