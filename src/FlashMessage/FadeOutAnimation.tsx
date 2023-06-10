'use client';

import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';
import { keyframes, SxProps } from '@mui/system';

const fadeOutToRight = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-250px);
    opacity: 0;
  }`;

const fadeOutToLeft = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(250px);
    opacity: 0;
  }`;

type FadeOutAnimationProps = {
  start: boolean;
  duration: string;
  children?: ReactNode;
  sx?: SxProps;
  toLeft?: boolean;
};

export const FadeOutAnimation: FC<FadeOutAnimationProps> = ({ children, sx, duration, start, toLeft }) => (
  <Box
    sx={{
      ...sx,
      ...(start
        ? { animation: `${toLeft ? fadeOutToLeft : fadeOutToRight} ${duration || '0.5'}s ease-out backwards;` }
        : {}),
    }}
  >
    {children}
  </Box>
);
