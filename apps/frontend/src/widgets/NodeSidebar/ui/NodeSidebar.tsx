import { InputNumber, Typography } from 'antd';
import { ColorPicker } from 'antd';
import { AggregationColor } from 'antd/es/color-picker/color';

import { additionalEditors, store } from '../model';
import styles from './styles.module.scss';

import { Sidebar } from '@/entities/Sidebar/ui/Sidebar';
import { colors, fontSizes } from '@/shared/styles/theme';
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

  const handleChangeFontSize = (value: number | null) => {
    handleUpdate('fontSize', value);
  };

  const handleChangeTextColor = (color: AggregationColor) => {
    handleUpdate('color', color.toHexString());
  };

  const handleChangeBgColor = (color: AggregationColor) => {
    handleUpdate('backgroundColor', color.toHexString());
  };

  const fontSize = (selectedNode.data?.fontSize as number) || fontSizes.xs;
  const textColor = (selectedNode.data?.color as string) || colors.black;
  const bgColor =
    (selectedNode.data?.backgroundColor as string) || colors.white;

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
          value={fontSize}
          onChange={handleChangeFontSize}
          className={styles.numberInput}
        />
      </div>
      <div className={styles.field}>
        <Typography.Text className={styles.label}>Цвет текста</Typography.Text>
        <ColorPicker value={textColor} onChange={handleChangeTextColor} />
      </div>
      <div className={styles.field}>
        <Typography.Text className={styles.label}>Цвет фона</Typography.Text>
        <ColorPicker value={bgColor} onChange={handleChangeBgColor} />
      </div>
    </Sidebar>
  );
};
