import { memo, useCallback } from 'react';
import { Button, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import styles from './styles.module.scss';

import { ListItem } from '@/shared/model';
import { useSelectedNodeStore } from '@/shared/model/store';
import { useReactFlow } from '@xyflow/react';

export const ListEditor = memo(() => {
  const { updateNodeData } = useReactFlow();
  const selectedNode = useSelectedNodeStore.use.selectedNode();

  const handleAddItem = useCallback(() => {
    if (!selectedNode?.id) return;

    const newItem: ListItem = { id: uuidv4(), label: '' };

    updateNodeData(selectedNode.id, (prev) => {
      const currentItems: ListItem[] = Array.isArray(prev?.data?.items)
        ? [...(prev?.data?.items as ListItem[])]
        : [];
      return {
        ...prev,
        items: [...currentItems, newItem],
      };
    });
  }, [selectedNode, updateNodeData]);

  return (
    <>
      <Typography.Text className={styles.label}>
        Добавление нового пункта
      </Typography.Text>
      <Button onClick={handleAddItem} className={styles.addButton}>
        Добавить
      </Button>
    </>
  );
});
