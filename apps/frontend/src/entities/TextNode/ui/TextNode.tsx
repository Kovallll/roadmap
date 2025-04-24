import { memo } from 'react';

import { Handle, NodeProps, Position } from '@xyflow/react';

const TextNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div
      style={{
        background: '#fff',
        border: '2px solid #d6bcfa',
        borderRadius: 12,
        padding: 16,
        maxWidth: 400,
        fontSize: 14,
        fontWeight: 500,
        color: '#333',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        lineHeight: 1.5,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ visibility: 'hidden' }}
      />
      <div>{data?.label as string}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ visibility: 'hidden' }}
      />
    </div>
  );
};

export default memo(TextNode);
