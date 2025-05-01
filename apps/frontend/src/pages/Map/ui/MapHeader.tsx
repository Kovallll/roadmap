import { Flex, Layout, Space, Typography } from 'antd';

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
      <Flex
        justify="space-between"
        align="center"
        className={styles.content}
        gap={24}
      >
        <Typography.Title level={3} style={{ margin: 0 }}>
          {canvas.title}
        </Typography.Title>
        <Space className={styles.button}>
          <SaveButton canvas={saveCanvas} />
        </Space>
      </Flex>
    </Header>
  );
};
