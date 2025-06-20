import { Button, Tooltip } from 'antd';
import cn from 'classnames';

import styles from './styles.module.scss';

import { useTheme } from '@/shared/model';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

export const ThemeButton = () => {
  const { toggleTheme, themeName } = useTheme();

  return (
    <Tooltip title={themeName === 'dark' ? 'Светлая тема' : 'Тёмная тема'}>
      <Button
        shape="circle"
        icon={themeName === 'dark' ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleTheme}
        className={cn(styles.toggleBtn)}
      />
    </Tooltip>
  );
};
