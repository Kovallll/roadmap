import { Flex } from 'antd';
import cn from 'classnames';

import { BaseNodeProps, NodeStatus } from '../../model';
import { minResizerHeight, minResizerWidth } from './constants';
import styles from './styles.module.scss';

import { getStatusColor, handles } from '@/shared/lib';
import { useCanvasStore, useSelectedNodeStore } from '@/shared/model/store';
import { colors } from '@/shared/styles/theme';
import { Handle, NodeResizer } from '@xyflow/react';

export const BaseNode = ({ nodeProps, className, children }: BaseNodeProps) => {
  const { data, id } = nodeProps;
  const selectedNode = useSelectedNodeStore.use.selectedNode();

  const isEdit = useCanvasStore.use.isEdit();

  const fontSize = Number(data?.fontSize);
  const status = String(data?.status);
  const backgroundColor = String(data?.backgroundColor);

  const customColor = String(data?.color ?? 'inherit');
  const color =
    status === NodeStatus.PENDING || status === NodeStatus.CLOSE
      ? customColor
      : getStatusColor(status);
  const borderColor = getStatusColor(status);

  const nodeStyles = {
    fontSize,
    backgroundColor,
    color,
    border: `1px solid ${borderColor}`,
  };

  const isResizerVisible = isEdit && selectedNode?.id === id;

  const nodeClassName = cn(styles.baseNode, {
    [styles[className ?? '']]: !!className,
  });

  return (
    <>
      <NodeResizer
        color={colors.secondary}
        isVisible={isResizerVisible}
        minWidth={minResizerWidth}
        minHeight={minResizerHeight}
      />
      <Flex className={nodeClassName} style={nodeStyles}>
        {isEdit &&
          handles.map(({ position, id, className }) => (
            <Handle
              key={id}
              type="source"
              position={position}
              id={id}
              className={cn(styles.handle, className)}
              isConnectable
              isConnectableStart
              isConnectableEnd
            />
          ))}
        {children}
      </Flex>
    </>
  );
};
