import { Flex } from 'antd';

import { AlignComponentProps } from '../model';
import { Horizontal } from './Horizontal/Horizontal';
import { Vertical } from './Vertical/Vertical';

import { gaps } from '@/shared/styles/theme';

export const AlignComponent = ({ children }: AlignComponentProps) => {
  return (
    <Flex vertical gap={gaps.md}>
      {children}
    </Flex>
  );
};

export const Align = Object.assign(AlignComponent, {
  Vertical,
  Horizontal,
});
