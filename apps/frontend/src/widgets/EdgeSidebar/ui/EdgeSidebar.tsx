import { ColorPicker, Input, InputNumber, Select, Typography } from 'antd';
import { AggregationColor } from 'antd/es/color-picker/color';
import { set } from 'lodash';

import { store } from '../model';
import { EdgeTypes, edgeTypes } from './constants';
import styles from './styles.module.scss';

import { Sidebar } from '@/entities/Sidebar/ui/Sidebar';
import { colors } from '@/shared/styles/theme';
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
      setSelectedEdge(newData);
      return newData;
    });
  };

  const handleChangeSelect = (type: string) => {
    handleUpdate('type', type);
  };

  const handleChangeLineWidth = (value: string | null) => {
    handleUpdate('data.strokeWidth', value);
  };

  const handleChangeLineColor = (color: AggregationColor) => {
    handleUpdate('data.strokeColor', color.toHexString());
  };

  const handleChangeTextColor = (color: AggregationColor) => {
    handleUpdate('data.color', color.toHexString());
  };

  const handleChangeLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdate('data.label', e.target.value);
  };

  const lineColor = (selectedEdge.data?.strokeColor as string) || colors.black;
  const lineWidth = (selectedEdge.data?.strokeWidth as string) || '';
  const textColor = (selectedEdge.data?.color as string) || colors.black;
  const type = selectedEdge?.type || EdgeTypes.Default;
  const label = (selectedEdge.data?.label as string) || '';

  return (
    <Sidebar title="Редактирование связи" className={styles.sidebar}>
      <Typography.Text className={styles.label}>Тип связи</Typography.Text>
      <Select
        value={type}
        onChange={handleChangeSelect}
        className={styles.select}
      >
        {edgeTypes.map((type) => (
          <Option value={type} className={styles.option}>
            {type}
          </Option>
        ))}
      </Select>
      {selectedEdge?.type === EdgeTypes.Custom && (
        <>
          <Typography.Text className={styles.label}>Цвет линии</Typography.Text>
          <ColorPicker value={lineColor} onChange={handleChangeLineColor} />
          <Typography.Text className={styles.label}>
            Цвет Текста
          </Typography.Text>
          <ColorPicker value={textColor} onChange={handleChangeTextColor} />
          <Typography.Text className={styles.label}>
            Текст на связи
          </Typography.Text>
          <Input value={label} onChange={handleChangeLabel} />
          <Typography.Text className={styles.label}>
            Толщина линии
          </Typography.Text>
          <InputNumber
            type="number"
            value={lineWidth}
            onChange={handleChangeLineWidth}
          />
        </>
      )}
    </Sidebar>
  );
};
