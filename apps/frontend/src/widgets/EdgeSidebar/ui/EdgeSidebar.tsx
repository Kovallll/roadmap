import { ColorPicker, Input, InputNumber, Select, Typography } from 'antd';
import { set } from 'lodash';

import { store } from '../model/store';
import styles from './styles.module.scss';

import { Sidebar } from '@/entities/Sidebar/ui/Sidebar';
import { colors } from '@/shared/styles/theme/theme';
import { useReactFlow } from '@xyflow/react';

const { Option } = Select;

export const EdgeSidebar = () => {
  const { selectedEdge, setSelectedEdge } = store();
  const { updateEdge } = useReactFlow();

  if (!selectedEdge) return null;

  const handleUpdate = (field: string, value: string | number | null) => {
    updateEdge(selectedEdge.id, (prev) => {
      const newData = { ...prev };
      set(newData, field, value);
      console.log(newData, 'newData');
      setSelectedEdge(newData);
      return newData;
    });
  };

  const edgeTypes = ['Default', 'Step', 'SmoothStep', 'Straight', 'Custom'];

  return (
    <Sidebar title="Редактирование связи" className={styles.sidebar}>
      <Typography.Text className={styles.label}>Тип связи</Typography.Text>
      <Select
        value={selectedEdge?.type || 'Default'}
        onChange={(type) => handleUpdate('type', type)}
        className={styles.select}
      >
        {edgeTypes.map((type) => (
          <Option value={type.toLocaleLowerCase()} className={styles.option}>
            {type}
          </Option>
        ))}
      </Select>
      {selectedEdge?.type === 'custom' && (
        <>
          <Typography.Text className={styles.label}>Цвет линии</Typography.Text>
          <ColorPicker
            value={(selectedEdge.data?.strokeColor as string) || colors.black}
            onChange={(color) =>
              handleUpdate('data.strokeColor', color.toHexString())
            }
          />
          <Typography.Text className={styles.label}>
            Цвет Текста
          </Typography.Text>
          <ColorPicker
            value={(selectedEdge.data?.color as string) || colors.black}
            onChange={(color) =>
              handleUpdate('data.color', color.toHexString())
            }
          />
          <Typography.Text className={styles.label}>
            Текст на связи
          </Typography.Text>
          <Input
            value={(selectedEdge.data?.label as string) || ''}
            onChange={(e) => handleUpdate('data.label', e.target.value)}
          />
          <Typography.Text className={styles.label}>
            Толщина линии
          </Typography.Text>
          <InputNumber
            type="number"
            value={(selectedEdge.data?.strokeWidth as string) || ''}
            onChange={(value) => handleUpdate('data.strokeWidth', value)}
          />
        </>
      )}
    </Sidebar>
  );
};
