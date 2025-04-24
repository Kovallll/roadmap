import { store } from '../model/store';
import styles from './styles.module.scss';

import { useReactFlow } from '@xyflow/react';

export const EdgeSidebar = () => {
  const { selectedEdge, setSelectedEdge } = store();
  const { setEdges } = useReactFlow();
  console.log(selectedEdge, 'selectedEdge');
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
    <div className={styles.sidebar}>
      <h2>Редактирование связи</h2>

      <label>Тип</label>
      <input value={selectedEdge?.type || ''} onChange={handleChange} />
    </div>
  );
};
