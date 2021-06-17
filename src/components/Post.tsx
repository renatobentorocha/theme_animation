import React from 'react';
import { BaseText, Box } from './Bases';

export function Post({ bg = '#9897F4' }: { bg?: string }) {
  return (
    <Box
      width={188}
      height={180}
      {...{ bg }}
      borderRadius={16}
      py={16}
      px={8}
      justifyContent="space-between"
    >
      <BaseText color="#fff" fontSize={20}>
        Popular article title
      </BaseText>
      <BaseText color="#fff" fontSize={17}>
        Short section description
      </BaseText>
      <BaseText color="label.primary" fontSize={12}>
        👨‍🦳 John Doe
      </BaseText>
    </Box>
  );
}
