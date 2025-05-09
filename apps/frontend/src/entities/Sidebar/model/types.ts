import { SiderProps } from 'antd';
import { ReactNode } from 'react';

export type SidebarProps = {
  children: ReactNode;
  title?: string;
  position?: 'left' | 'right';
  className?: string;
  width?: number;
} & SiderProps;
