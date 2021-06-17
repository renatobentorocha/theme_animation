import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { ThemeProvider } from 'styled-components';

import Animated, {
  Easing,
  Extrapolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { interpolatePath, parse } from 'react-native-redash';
import Svg, { Path } from 'react-native-svg';

import {
  HandlerStateChangeEvent,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { darkThemeVariables } from './src/theme/dark';
import { Post } from './src/components/Post';
import { lightThemeVariables } from './src/theme/light';

const { width } = Dimensions.get('screen');

const AnimatedPath = Animated.createAnimatedComponent(Path);

const R = 32.5;
const MOON_RADIUS = 40;
const CONTAINER_SIZE = 65;
const PADDING_HORIZONTAL = 15;
const TRANSLATE_X_END =
  width - PADDING_HORIZONTAL * 2 - (CONTAINER_SIZE - MOON_RADIUS / 2);

type ThemeState = 'light' | 'dark';

const sunPath = `
    M ${0}, ${32.5}
    a ${R},${R} 0 1,0 ${R * 2},0
    a ${R},${R} 0 1,0 ${-1 * (R * 2)},0
  `;

const moonPath = `
    M ${34}, ${0}
    A ${40},${40} 
    0 0 0,
    ${34} 65

    ${30},${30} 
    0 1 1,
    ${34} 0
  `;

const p1 = parse(sunPath);
const p2 = parse(moonPath);

export default function App() {
  const progress = useSharedValue(0);
  const themeState = useSharedValue<ThemeState>('light');

  const onHandlerStateChange = useAnimatedGestureHandler<
    HandlerStateChangeEvent<TapGestureHandlerEventPayload>
  >({
    onEnd: () => {
      themeState.value = themeState.value === 'light' ? 'dark' : 'light';
    },
  });

  const animatedProps = useAnimatedProps(() => {
    const d = interpolatePath(
      progress.value,
      [0, TRANSLATE_X_END],
      [p1, p2],
      Extrapolate.CLAMP,
    );

    const fill = interpolateColor(
      progress.value,
      [
        0,
        TRANSLATE_X_END / 4,
        TRANSLATE_X_END / 3,
        TRANSLATE_X_END / 2,
        TRANSLATE_X_END / 2.3,
        TRANSLATE_X_END,
      ],
      ['#FDB813', '#FDB813', '#8d6508', '#473302', '#332400', '#1b1b1b'],
    );

    return {
      d,
      fill,
    };
  });

  const style = useAnimatedStyle(() => {
    const direction = themeState.value === 'light' ? 0 : TRANSLATE_X_END;

    progress.value = withTiming(direction, {
      duration: 1500,
      easing: Easing.inOut(Easing.linear),
    });

    return { transform: [{ translateX: progress.value }] };
  });

  return (
    <ThemeProvider theme={lightThemeVariables}>
      <View style={styles.container}>
        <Post />
        <Post bg="#FFAF66" />
        {/* <Animated.View style={styles.button_container}>
          <TapGestureHandler onHandlerStateChange={onHandlerStateChange}>
            <Animated.View
              style={[{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }, style]}
            >
              <Svg width={CONTAINER_SIZE} height={CONTAINER_SIZE}>
                <AnimatedPath animatedProps={animatedProps} />
              </Svg>
            </Animated.View>
          </TapGestureHandler>
        </Animated.View> */}

        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  button_container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
  },
});
