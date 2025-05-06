import { NodeProps } from '@xyflow/react';

export const areNodePropsEqual = (prev: NodeProps, next: NodeProps) => {
  console.log(prev, next);
  return (
    prev.id === next.id &&
    prev.data.label === next.data.label &&
    prev.data.fontSize === next.data.fontSize &&
    prev.data.color === next.data.color &&
    prev.data.backgroundColor === next.data.backgroundColor &&
    prev.data.status === next.data.status
  );
};
