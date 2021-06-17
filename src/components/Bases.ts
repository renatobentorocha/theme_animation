import styled from 'styled-components/native';

import {
  SpaceProps,
  space,
  ColorProps,
  color,
  LayoutProps,
  layout,
  FlexboxProps,
  flexbox,
  BackgroundProps,
  background,
  BorderProps,
  border,
  PositionProps,
  position,
  ShadowProps,
  shadow,
  TypographyProps,
  typography,
} from 'styled-system';

export type BoxProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  BackgroundProps &
  BorderProps &
  PositionProps &
  ShadowProps;

export const Box = styled.View<BoxProps>`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${background}
  ${border}
  ${position}
  ${shadow}
`;

export type BaseTextProps = ColorProps & TypographyProps;

export const BaseText = styled.Text<BaseTextProps>`
  ${color}
  ${typography}
`;
