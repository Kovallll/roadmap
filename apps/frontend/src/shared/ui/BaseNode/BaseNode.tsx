import { Flex } from 'antd';
import cn from 'classnames';

import { BaseNodeProps } from '../../model';
import styles from './styles.module.scss';

import { handles } from '@/shared/lib';
import { colors } from '@/shared/styles/theme';
import { useSelectedNodeStore } from '@/widgets/NodeSidebar/model/store';
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

  return (
    <>
      <NodeResizer
        color={colors.secondary}
        isVisible={selectedNode?.id === id}
        minWidth={150}
        minHeight={50}
      />
      <Flex
        className={cn(styles.baseNode, {
          [styles[className ?? '']]: !!className,
        })}
        style={nodeStyles}
      >
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
