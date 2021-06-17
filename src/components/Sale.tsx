import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { BaseText, Box } from './Bases';

export function Sale() {
  return (
    <Box alignItems="center" justifyContent="center">
      <BaseText
        color="label.primary"
        fontSize={20}
        lineHeight={'28px'}
        fontWeight={'bold'}
      >
        Some title
      </BaseText>
      <Box width={291} height={269}>
        <Image
          source={require('../assets/saly.png')}
          style={StyleSheet.absoluteFill}
        />
      </Box>
    </Box>
  );
}
