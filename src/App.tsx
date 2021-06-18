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
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export function App() {
  const { theme } = useContext(AppContext);
  const toValue = useSharedValue(1);

  const styles = useAnimatedStyle(() => {
    const opacity = withTiming(toValue.value, {
      duration: 2000,
      easing: Easing.inOut(Easing.linear),
    });

    return { opacity };
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <AnimatedBox bg="background.main" flex={1} style={styles}>
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
