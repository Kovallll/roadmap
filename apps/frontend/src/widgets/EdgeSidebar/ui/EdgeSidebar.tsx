import {
  ColorPicker,
  Divider,
  Drawer,
  Input,
  InputNumber,
  Select,
  Typography,
} from 'antd';
import { AggregationColor } from 'antd/es/color-picker/color';
import { set } from 'lodash';

import { EdgeTypes, edgeTypes } from '../lib';
import { EdgeSidebarProps, store } from '../model';
import styles from './styles.module.scss';

import { capitalizeText } from '@/shared/lib';
import { theme } from '@/shared/styles/theme';
import { useReactFlow } from '@xyflow/react';

const { Option } = Select;

export const EdgeSidebar = ({ isOpen, handleChangeOpen }: EdgeSidebarProps) => {
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
    handleUpdate('data.type', type.toLocaleLowerCase());
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

  const onClose = () => {
    handleChangeOpen(false);
  };

  const lineColor =
    (selectedEdge.data?.strokeColor as string) || theme.default.black;
  const lineWidth = (selectedEdge.data?.strokeWidth as string) || '1';
  const textColor = (selectedEdge.data?.color as string) || theme.default.black;
  const type = (selectedEdge.data?.type as string) || EdgeTypes.Default;
  const label = (selectedEdge.data?.label as string) ?? '';

  return (
    <Drawer
      placement={'right'}
      closable={false}
      onClose={onClose}
      open={isOpen}
      className={styles.drawer}
      mask={false}
      keyboard
    >
      <Typography.Title level={2} className={styles.title}>
        Редактирование cвязи
      </Typography.Title>
      <Divider />
      <Typography.Text className={styles.label}>Тип связи</Typography.Text>
      <Select
        value={capitalizeText(type)}
        onChange={handleChangeSelect}
        className={styles.select}
      >
        {edgeTypes.map((type) => (
          <Option value={type}>
            <Typography.Text>{type}</Typography.Text>
          </Option>
        ))}
      </Select>
      <Typography.Text className={styles.label}>Цвет линии</Typography.Text>
      <ColorPicker value={lineColor} onChange={handleChangeLineColor} />
      <Typography.Text className={styles.label}>Цвет Текста</Typography.Text>
      <ColorPicker value={textColor} onChange={handleChangeTextColor} />
      <Typography.Text className={styles.label}>Текст на связи</Typography.Text>
      <Input value={label} onChange={handleChangeLabel} />
      <Typography.Text className={styles.label}>Толщина линии</Typography.Text>
      <InputNumber
        type="number"
        value={lineWidth}
        onChange={handleChangeLineWidth}
      />
    </Drawer>
  );
};
