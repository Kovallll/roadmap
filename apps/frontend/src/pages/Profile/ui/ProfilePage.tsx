import { useState } from 'react';
import { Avatar, Flex, Layout, Menu, Typography } from 'antd';

import { tabs } from '../libs';
import styles from './styles.module.scss';

import { LogoutButton } from '@/entities/Logout/ui/LogoutButton';
import { useUserStore } from '@/features/user/model';
import { UserOutlined } from '@ant-design/icons';

const { Content, Sider, Header } = Layout;
const { Text } = Typography;

const ProfilePage = () => {
  const [selectedMenu, setSelectedMenu] = useState(tabs[0].key);

  const selectedTab = tabs.find((tab) => tab.key === selectedMenu);

  const user = useUserStore.use.user();
  if (!user) return null;

  return (
    <Layout className={styles.profileLayout}>
      <Sider width={240} className={styles.sider}>
        <Flex vertical>
          <div className={styles.logo}>Roadmap</div>
          <Flex vertical gap={16}>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[selectedMenu]}
              onClick={({ key }) => setSelectedMenu(key)}
              items={tabs}
            />
            <LogoutButton />
          </Flex>
        </Flex>
      </Sider>

      <Layout>
        <Header className={styles.header}>
          <div />
          <div className={styles.profileInfo}>
            <Avatar icon={<UserOutlined />} />
            <Text className={styles.username}>{user?.username}</Text>
          </div>
        </Header>

        <Content className={styles.content}>{selectedTab?.content}</Content>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
