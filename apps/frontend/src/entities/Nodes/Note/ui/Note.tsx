import { memo, useCallback } from 'react';

import styles from './styles.module.scss';

import { BaseNode } from '@/shared/ui/BaseNode/BaseNode';
import { TextArea } from '@/shared/ui/TextArea/TextArea';
import { useReactFlow } from '@xyflow/react';
import { NodeProps } from '@xyflow/react';

export const NoteNode = memo((props: NodeProps) => {
  const { data, id } = props;
  const { updateNodeData } = useReactFlow();

  const handleChange = useCallback(
    (value: string) => {
      updateNodeData(id, { ...data, label: value });
    },
    [id, data, updateNodeData]
  );

  const label = String(data.label);

  return (
    <>
      <BaseNode nodeProps={props} className={styles.note}>
        <TextArea value={label} onChange={handleChange} data={data} />
      </BaseNode>
    </>
  );
});
