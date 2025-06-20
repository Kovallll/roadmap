import { Flex } from 'antd';
import cn from 'classnames';

import { BaseNodeProps, NodeStatus, Styles, useTheme } from '../../model';
import styles from './styles.module.scss';

import {
  defaultNodeHeight,
  defaultNodeWidth,
  getStatusColor,
  handles,
} from '@/shared/lib';
import { useCanvasStore } from '@/shared/model/store';
import { fontSizes } from '@/shared/styles/theme';
import { Handle } from '@xyflow/react';

export const BaseNode = ({ nodeProps, className, children }: BaseNodeProps) => {
  const { data } = nodeProps;
  const isEdit = useCanvasStore.use.isEdit();
  const { colors } = useTheme();

  const fontSize = Number(data?.fontSize ?? fontSizes.lg);
  const status = String(data?.status);
  const backgroundColor = String(data?.backgroundColor);
  const width = Number(data?.width ?? defaultNodeWidth);
  const height = (data?.height ?? defaultNodeHeight) as string | number;

  const customColor = String(data?.color ?? 'inherit');

  const color =
    status === NodeStatus.PENDING || status === NodeStatus.CLOSE
      ? customColor
      : getStatusColor(status);
  const borderColor = getStatusColor(status, colors.contrPrimary);

  const nodeStyles: Styles = {
    fontSize,
    backgroundColor,
    color,
    border: `1px solid ${borderColor}`,
    height,
    width,
  };

  const nodeClassName = cn(styles.baseNode, {
    [styles[className ?? '']]: !!className,
  });

  return (
    <Flex className={nodeClassName} style={nodeStyles}>
      {handles.map(({ position, id, className }) => (
        <Handle
          key={id}
          type="source"
          position={position}
          id={id}
          className={cn(styles.handle, className, { [styles.hidden]: !isEdit })}
          isConnectable={isEdit}
          isConnectableStart
          isConnectableEnd
        />
      ))}
      {children}
    </Flex>
  );
};
