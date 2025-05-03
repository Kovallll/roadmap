import { Flex } from 'antd';
import cn from 'classnames';

import { BaseNodeProps } from '../../model';
import styles from './styles.module.scss';

import { handles } from '@/shared/lib';
import { colors } from '@/shared/styles/theme/theme';
import { useSelectedNodeStore } from '@/widgets/NodeSidebar/model/store';
import { Handle, NodeResizer } from '@xyflow/react';

export const BaseNode = ({ nodeProps, className, children }: BaseNodeProps) => {
  const { data, id } = nodeProps;
  const selectedNode = useSelectedNodeStore.use.selectedNode();
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
        style={{
          fontSize: Number(data?.fontSize),
          backgroundColor: String(data?.backgroundColor),
          color: String(data?.color),
        }}
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
