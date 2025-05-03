import { InputNumber, Typography } from 'antd';
import { ColorPicker } from 'antd';

import { store } from '../model/store';
import styles from './styles.module.scss';

import { ListEditor } from '@/entities/Nodes/List/ui/ListEditor';
import { Sidebar } from '@/entities/Sidebar/ui/Sidebar';
import { colors } from '@/shared/styles/theme/theme';
import { useReactFlow } from '@xyflow/react';

export const NodeSidebar = () => {
  const { selectedNode, setSelectedNode } = store();
  const { updateNode } = useReactFlow();

  if (!selectedNode) return null;

  const handleUpdate = (field: string, value: string | number | null) => {
    updateNode(selectedNode.id, (prev) => {
      const newData = {
        ...prev.data,
        [field]: value,
      };
      setSelectedNode({ ...selectedNode, data: newData });
      return {
        data: newData,
      };
    });
  };

  const additionalEditors = [{ type: 'List', editor: <ListEditor /> }];

  return (
    <Sidebar title="Редактирование узла" className={styles.sidebar}>
      {additionalEditors.map(
        (item) => selectedNode.type === item.type && item.editor
      )}
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
          value={(selectedNode.data?.color as string) || colors.black}
          onChange={(color) => handleUpdate('color', color.toHexString())}
        />
      </div>
      <div className={styles.field}>
        <Typography.Text className={styles.label}>Цвет фона</Typography.Text>
        <ColorPicker
          value={(selectedNode.data?.backgroundColor as string) || colors.white}
          onChange={(color) =>
            handleUpdate('backgroundColor', color.toHexString())
          }
        />
      </div>
    </Sidebar>
  );
};
