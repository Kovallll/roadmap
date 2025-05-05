import { Flex } from 'antd';
import cn from 'classnames';

import { BaseNodeProps } from '../../model';
import { minResizerHeight, minResizerWidth } from './constants';
import styles from './styles.module.scss';

import { handles } from '@/shared/lib';
import { colors } from '@/shared/styles/theme';
import { useSelectedNodeStore } from '@/widgets/NodeSidebar/model';
import { Handle, NodeResizer } from '@xyflow/react';

export const BaseNode = ({ nodeProps, className, children }: BaseNodeProps) => {
  const { data, id } = nodeProps;
  const selectedNode = useSelectedNodeStore.use.selectedNode();

  const fontSize = Number(data?.fontSize);
  const backgroundColor = String(data?.backgroundColor);
  const color = String(data?.color);

  const nodeStyles = {
    fontSize,
    backgroundColor,
    color,
  };

  const isResizerVisible = selectedNode?.id === id;

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
        {handles.map(({ position, id, className }) => (
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
