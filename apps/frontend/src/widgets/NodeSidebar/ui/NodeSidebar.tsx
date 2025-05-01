import { Input, InputNumber, Typography } from 'antd';
import { ColorPicker } from 'antd';

import { store } from '../model/store';
import styles from './styles.module.scss';

import { Sidebar } from '@/entities/Sidebar/ui/Sidebar';
import { useReactFlow } from '@xyflow/react';

export const NodeSidebar = () => {
  const { selectedNode, setSelectedNode } = store();
  const { updateNode } = useReactFlow();

  if (!selectedNode) return null;

  const handleUpdate = (field: string, value: any) => {
    const updated = {
      ...selectedNode,
      data: {
        ...selectedNode.data,
        [field]: value,
      },
    };
    setSelectedNode(updated);
    updateNode(updated.id, updated);
  };

  return (
    <Sidebar title="Редактирование узла" className={styles.sidebar}>
      <div className={styles.field}>
        <Typography.Text className={styles.label}>Название</Typography.Text>
        <Input
          value={(selectedNode.data?.label as string) || ''}
          onChange={(e) => handleUpdate('label', e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <Typography.Text className={styles.label}>
          Размер шрифта
        </Typography.Text>
        <InputNumber
          min={8}
          max={72}
          value={(selectedNode.data?.fontSize as number) || 14}
          onChange={(value) => handleUpdate('fontSize', value)}
          style={{ width: '100%' }}
        />
      </div>

      <div className={styles.field}>
        <Typography.Text className={styles.label}>Цвет текста</Typography.Text>
        <ColorPicker
          value={(selectedNode.data?.color as string) || '#000000'}
          onChange={(color) => handleUpdate('color', color.toHexString())}
          style={{ width: '100%' }}
        />
      </div>

      <div className={styles.field}>
        <Typography.Text className={styles.label}>Цвет фона</Typography.Text>
        <ColorPicker
          value={(selectedNode.data?.backgroundColor as string) || '#ffffff'}
          onChange={(color) =>
            handleUpdate('backgroundColor', color.toHexString())
          }
          style={{ width: '100%' }}
        />
      </div>
    </Sidebar>
  );
};
