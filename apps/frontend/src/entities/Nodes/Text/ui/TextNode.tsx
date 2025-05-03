import { memo, useCallback } from 'react';

import { areNodePropsEqual } from '../../libs';

import { BaseNode } from '@/shared/ui/BaseNode/BaseNode';
import { TextArea } from '@/shared/ui/TextArea/TextArea';
import { NodeProps, useReactFlow } from '@xyflow/react';

const TextNode = (props: NodeProps) => {
  const { data, id } = props;
  const { updateNodeData } = useReactFlow();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateNodeData(id, (prev) => ({ ...prev, label: e.target.value }));
    },
    [id, updateNodeData]
  );

  return (
    <BaseNode nodeProps={props} className="textNode">
      <TextArea
        value={String(data.label)}
        onChange={handleChange}
        data={data}
      />
    </BaseNode>
  );
};

export default memo(TextNode, areNodePropsEqual);
