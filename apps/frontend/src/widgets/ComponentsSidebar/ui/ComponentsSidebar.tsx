import { Typography } from 'antd';

import { useTypeStore } from '../model';
import { ComponentsSidebarProps } from '../model';
import styles from './styles.module.scss';

import { Sidebar } from '@/entities/Sidebar/ui/Sidebar';
import { useCanvasStore } from '@/shared/model';

export const ComponentsSidebar = ({ nodeLabels }: ComponentsSidebarProps) => {
  const setType = useTypeStore((state) => state.setType);

  const isEdit = useCanvasStore.use.isEdit();

  if (!isEdit) return null;

  const onDragStart =
    (nodeType: string) => (event: React.DragEvent<HTMLDivElement>) => {
      setType(nodeType);
      event.dataTransfer.effectAllowed = 'move';
    };

  return (
    <Sidebar
      title="Добавление компонентов"
      position="left"
      className={styles.sidebar}
    >
      <div>
        {nodeLabels.map((label) => (
          <div
            key={label}
            className={styles.nodeItem}
            draggable
            onDragStart={onDragStart(label)}
          >
            <Typography.Text className={styles.nodePreview}>
              {label}
            </Typography.Text>
          </div>
        ))}
      </div>
    </Sidebar>
  );
};
