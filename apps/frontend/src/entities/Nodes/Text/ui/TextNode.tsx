import { memo, useCallback } from 'react';

import { areNodePropsEqual } from '../../lib';

import { BaseNode } from '@/shared/ui/BaseNode/BaseNode';
import { TextArea } from '@/shared/ui/TextArea/TextArea';
import { NodeProps, useReactFlow } from '@xyflow/react';

export const TextNode = memo((props: NodeProps) => {
  const { data, id } = props;
  const { updateNodeData } = useReactFlow();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateNodeData(id, (prev) => ({ ...prev, label: e.target.value }));
    },
    [id, updateNodeData]
  );

  const label = String(data.label);

  return (
    <BaseNode nodeProps={props} className="textNode">
      <TextArea value={label} onChange={handleChange} data={data} />
    </BaseNode>
  );
}, areNodePropsEqual);
