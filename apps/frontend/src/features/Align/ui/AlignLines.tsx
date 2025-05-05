import styles from './styles.module.scss';

import { useAlignLinesStore } from '@/features/align/model';

export const AlignLines = () => {
  const lines = useAlignLinesStore.use.lines();

  return (
    <div className={styles.lines}>
      {lines.map((line, index) => (
        <div
          key={index}
          className={styles.line}
          style={{
            width: line.type === 'x' ? '100%' : '2px',
            height: line.type === 'y' ? '100%' : '2px',
            left: line.type === 'y' ? line.value : 0,
            top: line.type === 'x' ? line.value : 0,
            transform:
              line.type === 'x' ? 'translateY(-50%)' : 'translateX(-50%)',
          }}
        />
      ))}
    </div>
  );
};
