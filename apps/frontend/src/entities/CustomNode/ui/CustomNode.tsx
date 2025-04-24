import { memo } from 'react';

import { Handle, NodeProps, Position } from '@xyflow/react';

const CustomNode = ({ isConnectable, ...props }: NodeProps) => {
  return (
    <div {...props} draggable={false}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className=""
      />
      <div>CustomNode</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(CustomNode);
