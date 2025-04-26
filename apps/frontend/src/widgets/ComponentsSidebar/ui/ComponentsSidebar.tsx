import { useTypeStore } from '../model/store';
import { ComponentsSidebarProps } from '../model/types';
import styles from './styles.module.scss';

import { Sidebar } from '@/entities/Sidebar/ui/Sidebar';

export const ComponentsSidebar = ({ nodeLabels }: ComponentsSidebarProps) => {
  const setType = useTypeStore((state) => state.setType);

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Sidebar
      title="Добавление компонентов"
      position="left"
      className={styles.sidebar}
    >
      <div className={styles.description}>
        You can drag these nodes to the pane on the right.
      </div>
      <div>
        {nodeLabels.map((label) => (
          <div
            key={label}
            className={styles.nodeItem}
            draggable
            onDragStart={(event) => onDragStart(event, label)}
          >
            <div className={styles.nodePreview}>{label}</div>
          </div>
        ))}
      </div>
    </Sidebar>
  );
};
