import cn from 'classnames';

import { SidebarProps } from '../model';
import styles from './styles.module.scss';

export const Sidebar = ({
  title,
  position = 'right',
  className,
  children,
}: SidebarProps) => {
  return (
    <aside
      className={cn(styles.sidebar, className)}
      style={{
        [position]: 0,
      }}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </aside>
  );
};
