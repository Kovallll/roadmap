import { Flex } from 'antd';
import cn from 'classnames';

import { AlignHorizontalProps } from '../../../model';
import styles from '../styles.module.scss';

import { AlignTypes } from '@/shared/model';
import { gaps } from '@/shared/styles/theme';
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
} from '@ant-design/icons';

export const Horizontal = ({
  justifyContent,
  handleChange,
}: AlignHorizontalProps) => {
  const handleChangeJustifyStart = () => {
    handleChange(AlignTypes.START);
  };

  const handleChangeJustifyCenter = () => {
    handleChange(AlignTypes.CENTER);
  };

  const handleChangeJustifyEnd = () => {
    handleChange(AlignTypes.END);
  };

  return (
    <Flex gap={gaps.lg}>
      <AlignLeftOutlined
        onClick={handleChangeJustifyStart}
        className={cn(styles.alignIcon, {
          [styles.active]: justifyContent === AlignTypes.START,
        })}
      />
      <AlignCenterOutlined
        onClick={handleChangeJustifyCenter}
        className={cn(styles.alignIcon, {
          [styles.active]: justifyContent === AlignTypes.CENTER,
        })}
      />
      <AlignRightOutlined
        onClick={handleChangeJustifyEnd}
        className={cn(styles.alignIcon, {
          [styles.active]: justifyContent === AlignTypes.END,
        })}
      />
    </Flex>
  );
};
