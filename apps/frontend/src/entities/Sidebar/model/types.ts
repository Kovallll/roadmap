import { ReactNode } from 'react';
import { SiderProps } from 'antd';

export type SidebarProps = {
  children: ReactNode;
  title?: string;
  position?: 'left' | 'right';
  className?: string;
  width?: number;
} & SiderProps;
