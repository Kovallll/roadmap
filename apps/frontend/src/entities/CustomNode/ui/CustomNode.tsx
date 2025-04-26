import { memo } from 'react';

import { BaseNode } from '@/shared/ui/BaseNode/BaseNode';
import { NodeProps } from '@xyflow/react';

const CustomNode = (props: NodeProps) => {
  return (
    <BaseNode nodeProps={props}>
      <div>CustomNode</div>
    </BaseNode>
  );
};

export default memo(CustomNode);
