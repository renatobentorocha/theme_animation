import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import Animated, {
  Easing,
  Extrapolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  interpolateColors,
  interpolateColor,
} from 'react-native-reanimated';
import { interpolatePath, parse } from 'react-native-redash';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('screen');

const AnimatedPath = Animated.createAnimatedComponent(Path);

const R = 32.5;

export default function App() {
  const progress = useSharedValue(0);

  progress.value = withTiming(2, {
    duration: 2000,
    easing: Easing.inOut(Easing.linear),
  });

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

  const animatedProps = useAnimatedProps(() => {
    const d = interpolatePath(
      progress.value,
      [0, 2],
      [p1, p2],
      Extrapolate.CLAMP,
    );

    const fill = interpolateColor(
      progress.value,
      [0, 0.2, 0.68999, 0.7, 0.999, 1],
      ['#FDB813', '#FDB813', '#8d6508', '#473302', '#332400', '#1b1b1b'],
    );

    return {
      d,
      fill,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.button_container}>
        <Svg width={65} height={65}>
          <AnimatedPath animatedProps={animatedProps} />
        </Svg>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  button_container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth,
    // paddingHorizontal: 15,
    // paddingVertical: 15,
    borderRadius: 12,
  },
});
