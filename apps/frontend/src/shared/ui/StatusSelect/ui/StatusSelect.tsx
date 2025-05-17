import { memo } from 'react';
import { Flex, Select, Typography } from 'antd';

import { getStyledLabel } from '../lib';
import styles from './styles.module.scss';

import { useSaveCanvas } from '@/features/canvas/model';
import { nodeStatuses } from '@/shared/lib';
import {
  NodeStatus,
  useCanvasStore,
  useSelectedNodeStore,
} from '@/shared/model';
import { useReactFlow } from '@xyflow/react';

const { Text } = Typography;

export const StatusSelect = memo(() => {
  const { updateNode } = useReactFlow();
  const selectedNode = useSelectedNodeStore.use.selectedNode();
  const canvas = useCanvasStore.use.canvas();
  const { mutate } = useSaveCanvas(canvas?.id ?? '', false);

  const nodeStatus =
    (selectedNode?.data?.status as string) || NodeStatus.PENDING;

  if (!selectedNode || !canvas) return null;

  const handleChangeStatus = (status: string) => {
    if (!canvas.data?.nodes) return;

    const updatedCanvas = {
      ...canvas,
      data: {
        ...canvas.data,
        nodes: canvas.data.nodes.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  status,
                },
              }
            : node
        ),
      },
    };

    mutate(updatedCanvas);

    updateNode(selectedNode.id, (oldNode) => ({
      ...oldNode,
      data: {
        ...oldNode.data,
        status,
      },
    }));
  };

  return (
    <Select
      className={styles.select}
      value={{ value: nodeStatus, label: getStyledLabel(nodeStatus) }}
      labelInValue
      onChange={({ value }) => handleChangeStatus(value)}
      options={nodeStatuses.map((opt) => ({
        ...opt,
        label: getStyledLabel(opt.value, opt.color),
      }))}
      optionRender={(option) => (
        <Flex>
          <Text style={{ color: option.data.color }}>{option.data.label}</Text>
        </Flex>
      )}
    />
  );
});
