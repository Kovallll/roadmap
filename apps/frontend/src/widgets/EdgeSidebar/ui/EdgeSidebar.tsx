import { store } from '../model/store';
import styles from './styles.module.scss';

import { Sidebar } from '@/entities/Sidebar/ui/Sidebar';
import { useReactFlow } from '@xyflow/react';

export const EdgeSidebar = () => {
  const { selectedEdge, setSelectedEdge } = store();
  const { setEdges } = useReactFlow();

  if (!selectedEdge) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedEdge) return;
    const updatedEdge = { ...selectedEdge, label: e.target.value };
    setSelectedEdge(updatedEdge);
    setEdges((eds) =>
      eds.map((ed) => (ed.id === updatedEdge.id ? updatedEdge : ed))
    );
  };

  return (
    <Sidebar title="Редактирование связи" className={styles.sidebar}>
      <label className={styles.label}>Тип</label>
      <input value={selectedEdge?.type || ''} onChange={handleChange} />
    </Sidebar>
  );
};
