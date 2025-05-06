import { Flex, Layout, Space, Typography } from 'antd';

import { MapHeaderProps } from '../model';
import styles from './MapHeader.module.scss';

import { SaveButton } from '@/features/canvas/ui/SaveButton';
import { useCanvasStore } from '@/shared/model/store/canvasStore';
import { gaps } from '@/shared/styles/theme';

const { Header } = Layout;

export const MapHeader = ({ canvas }: MapHeaderProps) => {
  const canvasData = useCanvasStore.use.canvasData();

  const isEdit = useCanvasStore.use.isEdit();

  const saveCanvas = { ...canvas, data: canvasData };

  return (
    <Header className={styles.header}>
      <Flex
        justify="space-between"
        align="center"
        className={styles.content}
        gap={gaps.lg}
      >
        <Typography.Title level={3} className={styles.title}>
          {canvas.title}
        </Typography.Title>
        {isEdit && (
          <Space className={styles.button}>
            <SaveButton canvas={saveCanvas} />
          </Space>
        )}
      </Flex>
    </Header>
  );
};
