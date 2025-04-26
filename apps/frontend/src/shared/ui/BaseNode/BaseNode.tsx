import cn from 'classnames';

import { BaseNodeProps } from '../../model';
import styles from './styles.module.scss';

import { handles } from '@/shared/lib';
import { Handle } from '@xyflow/react';

export const BaseNode = ({ nodeProps, className, children }: BaseNodeProps) => {
  const { data } = nodeProps;

  return (
    <div className={cn(styles.baseNode, className)}>
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
    </div>
  );
};
