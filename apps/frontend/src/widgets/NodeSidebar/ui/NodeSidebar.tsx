import { store } from '../model/store';
import styles from './styles.module.scss';

import { useReactFlow } from '@xyflow/react';

export const NodeSidebar = () => {
  const { selectedNode, setSelectedNode } = store();
  const { updateNode } = useReactFlow();
  console.log(selectedNode, 'selectedNode');
  if (!selectedNode) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = { ...selectedNode, data: { label: e.target.value } };
    setSelectedNode(updated);
    updateNode(updated.id, updated);
  };

  return (
    <div className={styles.sidebar}>
      <h2>Редактирование узла</h2>
      <label>Название</label>
      <input
        value={(selectedNode.data?.label as string) || ''}
        onChange={handleChange}
      />
    </div>
  );
};
