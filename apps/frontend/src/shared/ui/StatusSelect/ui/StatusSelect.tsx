import { useState } from 'react';
import { Flex, Select, Typography } from 'antd';

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

export const StatusSelect = () => {
  const selectedNode = useSelectedNodeStore.use.selectedNode();
  const canvas = useCanvasStore.use.canvas();

  const { updateNode } = useReactFlow();
  const { mutate } = useSaveCanvas(canvas?.id ?? '', false);

  const nodeStatus =
    (selectedNode?.data?.status as string) || NodeStatus.PENDING;
  const [status, setStatus] = useState(nodeStatus);

  if (!selectedNode || !canvas) return null;

  const handleChangeStatus = (status: string) => {
    setStatus(status);
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

  const getStyledLabel = (value: string, color?: string) => (
    <Text
      style={{
        color: color || nodeStatuses.find((s) => s.value === value)?.color,
      }}
    >
      {value}
    </Text>
  );

  return (
    <Select
      className={styles.select}
      value={{ value: status, label: getStyledLabel(status) }}
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
};
