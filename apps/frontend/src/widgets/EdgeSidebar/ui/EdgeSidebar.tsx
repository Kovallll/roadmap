import { Input, Select, Typography } from 'antd';

import { store } from '../model/store';
import styles from './styles.module.scss';

import { Sidebar } from '@/entities/Sidebar/ui/Sidebar';
import { useReactFlow } from '@xyflow/react';

const { Option } = Select;

export const EdgeSidebar = () => {
  const { selectedEdge, setSelectedEdge } = store();
  const { setEdges } = useReactFlow();

  if (!selectedEdge) return null;

  const handleSelectChange = (value: string) => {
    if (!selectedEdge) return;
    const updatedEdge = { ...selectedEdge, type: value };
    setSelectedEdge(updatedEdge);
    setEdges((edges) =>
      edges.map((edge) => (edge.id === updatedEdge.id ? updatedEdge : edge))
    );
  };

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!selectedEdge) return;
      const updatedEdge = {
        ...selectedEdge,
        data: {
          ...selectedEdge.data,
          [field]: e.target.value,
        },
      };
      setSelectedEdge(updatedEdge);
      setEdges((edges) =>
        edges.map((edge) => (edge.id === updatedEdge.id ? updatedEdge : edge))
      );
    };

  return (
    <Sidebar title="Редактирование связи" className={styles.sidebar}>
      <Typography.Text className={styles.label}>Тип связи</Typography.Text>
      <Select
        value={selectedEdge?.type || 'default'}
        onChange={handleSelectChange}
        className={styles.select}
        style={{ width: '100%' }}
      >
        <Option value="default">Default</Option>
        <Option value="step">Step</Option>
        <Option value="smoothstep">SmoothStep</Option>
        <Option value="straight">Straight</Option>
        <Option value="baseEdge">Base</Option>
      </Select>

      <Typography.Text className={styles.label}>Текст на связи</Typography.Text>
      <Input
        value={(selectedEdge.data?.label as string) || ''}
        onChange={handleInputChange('label')}
      />

      <Typography.Text className={styles.label}>Цвет линии</Typography.Text>
      <Input
        type="color"
        value={(selectedEdge.data?.strokeColor as string) || '#000000'}
        onChange={handleInputChange('strokeColor')}
      />

      <Typography.Text className={styles.label}>Толщина линии</Typography.Text>
      <Input
        type="number"
        value={(selectedEdge.data?.strokeWidth as string) || ''}
        onChange={handleInputChange('strokeWidth')}
      />
    </Sidebar>
  );
};
