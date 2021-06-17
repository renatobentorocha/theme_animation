import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, BaseText } from './Bases';

export function Button() {
  return (
    <TouchableOpacity>
      <Box
        alignItems="center"
        justifyContent="center"
        width="100%"
        height={52}
        bg="systemColors.blue"
        borderRadius={8}
      >
        <BaseText
          color="#fff"
          fontSize={18}
          lineHeight={'24px'}
          fontWeight={600}
        >
          Call To Action
        </BaseText>
      </Box>
    </TouchableOpacity>
  );
}
