import { Button, Flex, Layout, Typography } from 'antd';

import { EditorHeaderProps } from '../../model';
import styles from './styles.module.scss';

import { selectedNodeStore } from '@/shared/model';
import { useReactFlow } from '@xyflow/react';

export const EditorHeader = ({
  serializedContent,
  onCloseDrawer,
}: EditorHeaderProps) => {
  const { updateNode } = useReactFlow();
  const { selectedNode, setSelectedNode } = selectedNodeStore();
  if (!selectedNode) return null;
  const title = selectedNode?.data.label as string;

  const handleSaveContent = () => {
    const newData = { ...selectedNode.data, content: serializedContent };
    updateNode(selectedNode.id, { data: newData });
    setSelectedNode({
      ...selectedNode,
      data: newData,
    });
    onCloseDrawer();
  };

  return (
    <Layout.Header className={styles.editorHeader}>
      <Flex
        justify="space-between"
        align="center"
        className={styles.headerContent}
      >
        <Typography.Title className={styles.title}>{title}</Typography.Title>
        <Button onClick={handleSaveContent}>Сохранить описание</Button>
      </Flex>
    </Layout.Header>
  );
};
