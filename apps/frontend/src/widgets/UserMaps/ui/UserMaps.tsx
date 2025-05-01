import { useState } from 'react';
import { Card, Flex, Input, Typography } from 'antd';

import styles from './styles.module.scss';

import { useCanvases } from '@/features/canvas/model/hooks/useCanvases';
import { CreateButton } from '@/features/canvas/ui/CreateButton';
import { EditButton } from '@/features/canvas/ui/EditButton';
import { SettingButton } from '@/features/canvas/ui/SettingButton';
import { useUserStore } from '@/features/user/model';
import { Spinner } from '@/shared/ui/Spinner/ui/Spinner';
import { User } from '@roadmap/user/types';

export const UserMaps = () => {
  const user = useUserStore.use.user() as User;

  const [search, setSearch] = useState('');

  const { data: canvases, isLoading, isError } = useCanvases(user?.id);

  if (isLoading || !user) return <Spinner />;
  if (isError) return <div>Ошибка при загрузке карт.</div>;

  const canvasList = Array.isArray(canvases) ? canvases : [];

  const filteredCanvases = canvasList.filter((canvas) =>
    canvas.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Flex vertical gap={20} className={styles.container}>
      <Flex justify="space-between" align="center" wrap="wrap">
        <Input
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <Flex className={styles.crateButton}>
          <CreateButton userId={user.id} />
        </Flex>
      </Flex>

      <Flex vertical className={styles.maps}>
        {filteredCanvases.length > 0 ? (
          filteredCanvases.map((canvas) => (
            <Card key={canvas.id} hoverable className={styles.map}>
              <Flex justify="space-between">
                <Flex vertical>
                  <Typography.Text className={styles.title}>
                    {canvas.title}
                  </Typography.Text>
                  <Typography.Text className={styles.description}>
                    {canvas.description}
                  </Typography.Text>
                </Flex>
                <Flex align="center" gap={16}>
                  <EditButton canvas={canvas} />
                  <SettingButton canvas={canvas} />
                </Flex>
              </Flex>
            </Card>
          ))
        ) : (
          <Typography.Text>Нет существующих карт!</Typography.Text>
        )}
      </Flex>
    </Flex>
  );
};
