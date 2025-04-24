import styles from './app.module.scss';

import '@xyflow/react/dist/style.css';
import Canvas from '@/pages/Canvas/ui/Canvas';

export default function App() {
  return (
    <div className={styles.app}>
      <Canvas />
    </div>
  );
}
