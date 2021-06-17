import React from 'react';
import { BaseText, Box } from './Bases';

export function SubHeader() {
  return (
    <Box width="100%" flexDirection="row" justifyContent="space-between">
      <BaseText
        color="label.secondary"
        fontSize={18}
        lineHeight={'24px'}
        fontWeight={500}
      >
        Popular posts
      </BaseText>

      <BaseText
        color="systemColors.blue"
        fontSize={18}
        lineHeight={'24px'}
        fontWeight={600}
      >
        See all
      </BaseText>
    </Box>
  );
}
