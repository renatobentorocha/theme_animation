import React, { useContext, useEffect } from 'react';
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
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export function App() {
  const { theme } = useContext(AppContext);
  const progress = useSharedValue(0.88);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1500,
      easing: Easing.inOut(Easing.ease),
    });
  }, [theme]);

  const style = useAnimatedStyle(() => {
    console.log(progress.value);

    return { opacity: interpolate(progress.value, [0, 1], [0.6, 1]) };
  });

  return (
    <ThemeProvider theme={theme}>
      <AnimatedBox bg="background.main" flex={1} style={style}>
        <Header />
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
