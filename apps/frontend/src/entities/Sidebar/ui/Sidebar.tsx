import { Layout, Typography } from 'antd';
import cn from 'classnames';

import { SidebarProps } from '../model';
import styles from './styles.module.scss';

import { Styles } from '@/shared/model';
const { Sider } = Layout;

export const Sidebar = ({
  title,
  position = 'right',
  className,
  children,
  width,
  ...props
}: SidebarProps) => {
  const sidebarStyles: Styles = {
    [position]: 0,
    '--width': `${width ?? 16}vw`,
  };

  return (
    <Sider
      className={cn(styles.sidebar, className)}
      id="sidebar"
      style={sidebarStyles}
      {...props}
    >
      {title && (
        <Typography.Title level={4} className={styles.title}>
          {title}
        </Typography.Title>
      )}
      {children}
    </Sider>
  );
};
