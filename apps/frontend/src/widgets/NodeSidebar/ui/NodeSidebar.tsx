import { store } from '../model/store';
import styles from './styles.module.scss';

import { Sidebar } from '@/entities/Sidebar/ui/Sidebar';
import { useReactFlow } from '@xyflow/react';

export const NodeSidebar = () => {
  const { selectedNode, setSelectedNode } = store();
  const { updateNode } = useReactFlow();

  if (!selectedNode) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = { ...selectedNode, data: { label: e.target.value } };
    setSelectedNode(updated);
    updateNode(updated.id, updated);
  };

  return (
    <Sidebar title="Редактирование узла" className={styles.sidebar}>
      <label className={styles.label}>Название</label>
      <input
        value={(selectedNode.data?.label as string) || ''}
        onChange={handleChange}
      />
    </Sidebar>
  );
};
