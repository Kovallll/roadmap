import { EditProfile } from '@/widgets/EditProfile/ui/EditProfile';
import { UserMaps } from '@/widgets/UserMaps/ui/UserMaps';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

export const siderWidth = 240;

export const tabs = [
  {
    key: 'maps',
    label: 'Карты',
    icon: <AppstoreOutlined />,
    content: <UserMaps />,
  },
  {
    key: 'settings',
    label: 'Настройки',
    icon: <SettingOutlined />,
    content: <EditProfile />,
  },
  { key: 'Something1', label: 'Something1', icon: <SettingOutlined /> },
  { key: 'settings2', label: 'Something2', icon: <SettingOutlined /> },
  { key: 'settings3', label: 'Something3', icon: <SettingOutlined /> },
  { key: 'settings4', label: 'Something4', icon: <SettingOutlined /> },
  { key: 'settings5', label: 'Something5', icon: <SettingOutlined /> },
  { key: 'settings6', label: 'Something6', icon: <SettingOutlined /> },
  { key: 'settings7', label: 'Something7', icon: <SettingOutlined /> },
  { key: 'settings8', label: 'Something8', icon: <SettingOutlined /> },
];
