import { themeVariables, ThemeVariables } from './variables';

export const darkThemeVariables: ThemeVariables = {
  ...themeVariables,
  colors: {
    ...themeVariables.colors,
    systemColors: {
      red: '#FF453A',
      orange: '#FF9F0A',
      yellow: '#FFD60A',
      green: '#32D74B',
      teal: '#64D2FF',
      blue: '#0A84FF',
      indigo: '#5856D6',
      purple: '#BF5AF2',
      pink: '#FF375F',
    },
    systemGrayscale: {
      gray_1: '#8E8E93',
      gray_2: '#636366',
      gray_3: '#48484A',
      gray_4: '#3A3A3C',
      gray_5: '#2C2C2E',
      gray_6: '#1C1C1E',
    },
    label: {
      primary: '#fff',
      secondary: '#EBEBF599',
      tertiary: '#EBEBF54D',
      quarternary: '#EBEBF52E',
    },
    background: {
      main: '#000',
      surface_1: '#161616',
      surface_2: '#1b1b1b',
      stroke: '#3a3a3c',
    },
  },
};
