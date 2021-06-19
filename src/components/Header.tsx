import React, { useContext, useEffect } from 'react';
import { StyleSheet, Dimensions, ViewStyle, StyleProp } from 'react-native';
import {
  HandlerStateChangeEvent,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { interpolatePath, parse } from 'react-native-redash';
import Svg, { Path } from 'react-native-svg';
import { AppContext } from '../model/provider/AppProvider';
import { darkThemeVariables } from '../theme/dark';
import { lightThemeVariables } from '../theme/light';
import { BaseText, Box } from './Bases';

const { width } = Dimensions.get('screen');
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedBox = Animated.createAnimatedComponent(Box);

const R = 32.5;
const MOON_RADIUS = 40;
const INVERT_MOON_RADIUS = 30;
const CONTAINER_SIZE = 65;
const PADDING_HORIZONTAL = 15;
const TRANSLATE_X_END =
  width - PADDING_HORIZONTAL * 2 - (CONTAINER_SIZE - MOON_RADIUS / 2);

const sunPath = `
    M ${0}, ${R}
    a ${R},${R} 0 1,0 ${R * 2},0
    a ${R},${R} 0 1,0 ${-1 * (R * 2)},0
  `;

const moonPath = `
    M ${34}, ${0}
    A ${MOON_RADIUS},${MOON_RADIUS} 
    0 0 0,
    ${34} 65

    ${INVERT_MOON_RADIUS},${INVERT_MOON_RADIUS} 
    0 1 1,
    ${34} 0
  `;

const p1 = parse(sunPath);
const p2 = parse(moonPath);

export function Header({
  style,
}: {
  style: { backgroundColor: string | number };
}) {
  const { handleTheme, selectedTheme, handleSelectedTheme } =
    useContext(AppContext);

  const progress = useSharedValue(0);

  const onHandlerStateChange = useAnimatedGestureHandler<
    HandlerStateChangeEvent<TapGestureHandlerEventPayload>
  >({
    onEnd: () => {
      handleSelectedTheme &&
        runOnJS(handleSelectedTheme)(
          selectedTheme === 'light' ? 'dark' : 'light',
        );
    },
  });

  useEffect(() => {
    if (selectedTheme === 'dark') {
      handleTheme && handleTheme(darkThemeVariables);
    } else {
      handleTheme && handleTheme(lightThemeVariables);
    }
  }, [selectedTheme, handleTheme]);

  const animatedProps = useAnimatedProps(() => {
    const d = interpolatePath(
      progress.value,
      [0, TRANSLATE_X_END],
      [p1, p2],
      Extrapolate.CLAMP,
    );

    const fill = interpolateColor(
      progress.value,
      [0, 0.33, 0.4999, 0.59999, 0.777, 1],
      ['#FDB813', '#FDB813', '#8d6508', '#473302', '#EBEBF54D', '#EBEBF599'],
    );

    return {
      d,
      fill,
    };
  });

  useEffect(() => {
    const direction = selectedTheme === 'light' ? 0 : TRANSLATE_X_END;

    progress.value = withTiming(direction, {
      duration: 1500,
      easing: Easing.inOut(Easing.linear),
    });
  }, [selectedTheme]);

  return (
    <AnimatedBox
      width="100%"
      height={140}
      justifyContent="flex-end"
      px={16}
      style={style}
    >
      <Box style={styles.button_container}>
        <TapGestureHandler onHandlerStateChange={onHandlerStateChange}>
          <Animated.View
            style={[
              {
                width: CONTAINER_SIZE,
                height: CONTAINER_SIZE,
              },
            ]}
          >
            <Svg width={CONTAINER_SIZE} height={CONTAINER_SIZE}>
              <AnimatedPath animatedProps={animatedProps} />
            </Svg>
          </Animated.View>
        </TapGestureHandler>
      </Box>
      <BaseText
        color="label.primary"
        fontSize={32}
        lineHeight={'36px'}
        fontWeight="bold"
      >
        Home
      </BaseText>
    </AnimatedBox>
  );
}

const styles = StyleSheet.create({
  button_container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
