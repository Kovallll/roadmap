import { Layout, Space, Typography } from 'antd';

import { MapHeaderProps } from '../model';
import styles from './MapHeader.module.scss';

import { useCanvasStore } from '@/features/canvas/model/store';
import { SaveButton } from '@/features/canvas/ui/SaveButton';
const { Header } = Layout;

export const MapHeader = ({ canvas }: MapHeaderProps) => {
  const canvasData = useCanvasStore.use.canvasData();

  const saveCanvas = { ...canvas, data: canvasData };
  return (
    <Header className={styles.header}>
      <Space
        style={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography.Title level={3} style={{ margin: 0 }}>
          Карта Разработки
        </Typography.Title>
        <SaveButton canvas={saveCanvas} />
      </Space>
    </Header>
  );
};
