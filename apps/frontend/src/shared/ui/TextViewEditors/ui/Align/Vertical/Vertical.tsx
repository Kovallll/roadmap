import { Flex } from 'antd';
import cn from 'classnames';

import { AlignVerticalProps } from '../../../model';
import styles from '../styles.module.scss';

import { AlignTypes } from '@/shared/model';
import { gaps } from '@/shared/styles/theme';
import {
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';

export const Vertical = ({ alignItems, handleChange }: AlignVerticalProps) => {
  const handleChangeAlignStart = () => {
    handleChange(AlignTypes.START);
  };

  const handleChangeAlignCenter = () => {
    handleChange(AlignTypes.CENTER);
  };

  const handleChangeAlignEnd = () => {
    handleChange(AlignTypes.END);
  };

  return (
    <Flex gap={gaps.lg}>
      <VerticalAlignTopOutlined
        onClick={handleChangeAlignStart}
        className={cn(styles.alignIcon, {
          [styles.active]: alignItems === AlignTypes.START,
        })}
      />
      <VerticalAlignMiddleOutlined
        onClick={handleChangeAlignCenter}
        className={cn(styles.alignIcon, {
          [styles.active]: alignItems === AlignTypes.CENTER,
        })}
      />
      <VerticalAlignBottomOutlined
        onClick={handleChangeAlignEnd}
        className={cn(styles.alignIcon, {
          [styles.active]: alignItems === AlignTypes.END,
        })}
      />
    </Flex>
  );
};
