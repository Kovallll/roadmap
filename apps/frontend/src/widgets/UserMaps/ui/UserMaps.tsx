import { Card, Flex, Input, Typography } from 'antd';

import { useSearch } from '../model';
import styles from './styles.module.scss';

import { useCanvases } from '@/features/canvas/model';
import { CreateButton } from '@/features/canvas/ui/CreateButton';
import { DeleteButton } from '@/features/canvas/ui/DeleteButton';
import { EditButton } from '@/features/canvas/ui/EditButton';
import { SettingButton } from '@/features/canvas/ui/SettingButton';
import { ViewButton } from '@/features/canvas/ui/ViewButton';
import { useUserStore } from '@/features/user/model';
import { gaps } from '@/shared/styles/theme';
import { Spinner } from '@/shared/ui/Spinner/ui/Spinner';
import { User } from '@roadmap/user/types';

export const UserMaps = () => {
  const user = useUserStore.use.user() as User;

  const { data: canvases, isLoading, isError } = useCanvases(user?.id);

  const canvasList = Array.isArray(canvases) ? canvases : [];

  const { handleSearch, search, searchedCanvases } = useSearch(canvasList);

  if (isLoading || !user) return <Spinner />;
  if (isError) return <div>Ошибка при загрузке карт.</div>;

  return (
    <Flex vertical gap={gaps.lg} className={styles.container}>
      <Flex justify="space-between" align="center" wrap="wrap">
        <Input
          placeholder="Поиск по названию"
          value={search}
          onChange={handleSearch}
          className={styles.search}
        />
        <Flex className={styles.crateButton}>
          <CreateButton userId={user.id} />
        </Flex>
      </Flex>

      <Flex vertical className={styles.mapCards}>
        {searchedCanvases.length ? (
          searchedCanvases.map((canvas) => (
            <Card key={canvas.id} hoverable className={styles.mapCard}>
              <Flex justify="space-between">
                <Flex vertical>
                  <Typography.Text className={styles.title}>
                    {canvas.title}
                  </Typography.Text>
                  <Typography.Text className={styles.description}>
                    {canvas.description}
                  </Typography.Text>
                </Flex>
                <Flex align="center" gap={gaps.md}>
                  <EditButton canvasId={canvas.id} />
                  <ViewButton canvasId={canvas.id} />
                  <SettingButton canvas={canvas} />
                  <DeleteButton canvasId={canvas.id} />
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
