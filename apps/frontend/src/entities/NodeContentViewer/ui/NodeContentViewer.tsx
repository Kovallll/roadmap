import { useState } from 'react';
import { Divider, Flex, Select, Typography } from 'antd';

import { NodeContentViewerProps } from '../model';
import styles from './styles.module.scss';

import { useSaveCanvas } from '@/features/canvas/model';
import { nodeStatuses } from '@/shared/lib';
import { useCanvasStore } from '@/shared/model';
import { useReactFlow } from '@xyflow/react';

const { Title, Paragraph, Link, Text } = Typography;

export const NodeContentViewer = ({ selectedNode }: NodeContentViewerProps) => {
  const nodeStatus = (selectedNode?.data?.status as string) || '';
  const [status, setStatus] = useState(nodeStatus);
  const { updateNode } = useReactFlow();
  const canvas = useCanvasStore.use.canvas();

  const { mutate } = useSaveCanvas(canvas?.id ?? '', false);

  if (!selectedNode || !canvas) return null;

  const description = (selectedNode?.data?.description as string) || '';
  const title = (selectedNode?.data?.title as string) || '';
  const linkTitle = (selectedNode?.data?.linkTitle as string) || '';
  const link = (selectedNode?.data?.link as string) || '';

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
    <div className={styles.viewer}>
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
            <Text style={{ color: option.data.color }}>
              {option.data.label}
            </Text>
          </Flex>
        )}
      />
      {title && <Title level={1}>{title}</Title>}

      {description && <Paragraph>{description}</Paragraph>}

      {link && (
        <>
          <Divider orientation="left">
            <Text>Ссылки</Text>
          </Divider>
          <div className={styles.linkSection}>
            <Link href={link} target="_blank" rel="noopener noreferrer">
              {linkTitle ?? 'Полезный ресурс'}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
