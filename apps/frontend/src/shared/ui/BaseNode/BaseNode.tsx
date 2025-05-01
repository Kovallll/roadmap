import { Flex } from 'antd';
import cn from 'classnames';

import { BaseNodeProps } from '../../model';
import styles from './styles.module.scss';

import { handles } from '@/shared/lib';
import { Handle } from '@xyflow/react';

export const BaseNode = ({ nodeProps, className, children }: BaseNodeProps) => {
  const { data } = nodeProps;

  return (
    <Flex
      className={cn(styles.baseNode, className)}
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
      {!!data?.label && (
        <div className={styles.content}>{String(data?.label)}</div>
      )}
      {children}
    </Flex>
  );
};
