import React, { useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider } from 'styled-components';

import { Post } from './components/Post';

import { Box } from './components/Bases';
import { Header } from './components/Header';
import { SubHeader } from './components/SubHeader';
import { Sale } from './components/Sale';
import { Button } from './components/Button';
import { AppContext } from './model/provider/AppProvider';

import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { lightThemeVariables } from './theme/light';
import { darkThemeVariables } from './theme/dark';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export function App() {
  const { theme, selectedTheme } = useContext(AppContext);
  const progress = useSharedValue(0);
  const backgroundColor = useSharedValue<string | number>(
    lightThemeVariables.colors.background.main,
  );

  const style = useAnimatedStyle(() => {
    const direction = selectedTheme === 'light' ? 0 : 1;

    progress.value = withTiming(direction, {
      duration: 1500,
      easing: Easing.inOut(Easing.linear),
    });

    backgroundColor.value = interpolateColor(
      progress.value,
      [0, 1],
      [
        lightThemeVariables.colors.background.main,
        darkThemeVariables.colors.background.main,
      ],
    );

    return { backgroundColor: backgroundColor.value };
  });

  const headerStyle = useAnimatedStyle(() => {
    const direction = selectedTheme === 'light' ? 0 : 1;

    progress.value = withTiming(direction, {
      duration: 1300,
      easing: Easing.inOut(Easing.linear),
    });

    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [
          lightThemeVariables.colors.background.surface_1,
          darkThemeVariables.colors.background.surface_1,
        ],
      ),
    };
  });

  return (
    <ThemeProvider theme={theme}>
      <AnimatedBox flex={1} style={style}>
        <Header style={headerStyle} />
        <Box mt={20} mb={16} px={16}>
          <SubHeader />
        </Box>
        <Box>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingLeft: 16 }}
            showsHorizontalScrollIndicator={false}
          >
            <Post />
            <Post ml={16} bg="#FFAF66" />
            <Post ml={16} />
          </ScrollView>
        </Box>
        <Box py={StyleSheet.hairlineWidth} bg="background.stroke" my={16} />
        <Sale />
        <Box px={16}>
          <Button />
        </Box>

        <StatusBar style="auto" />
      </AnimatedBox>
    </ThemeProvider>
  );
}
