import { Layout, Typography } from 'antd';
import cn from 'classnames';

import { SidebarProps } from '../model';
import styles from './styles.module.scss';
const { Sider } = Layout;

export const Sidebar = ({
  title,
  position = 'right',
  className,
  children,
  ...props
}: SidebarProps) => {
  return (
    <Sider
      className={cn(styles.sidebar, className)}
      id="sidebar"
      style={{
        [position]: 0,
      }}
      {...props}
    >
      {title && <Typography.Title level={4}>{title}</Typography.Title>}
      {children}
    </Sider>
  );
};
