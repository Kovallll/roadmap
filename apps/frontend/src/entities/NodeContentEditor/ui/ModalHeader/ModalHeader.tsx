import { Button, Flex, Typography } from 'antd';

import styles from './styles.module.scss';

import { useSelectedNodeStore } from '@/shared/model';
import { gaps } from '@/shared/styles/theme';

export const ModalHeader = () => {
  const selectedNode = useSelectedNodeStore.use.selectedNode();
  const title = selectedNode?.data.label as string;

  return (
    <Flex className={styles.container} gap={gaps.md}>
      <Flex justify="space-between">
        <Typography.Title level={2}>{title}</Typography.Title>
        <Button>Save</Button>
      </Flex>
    </Flex>
  );
};
