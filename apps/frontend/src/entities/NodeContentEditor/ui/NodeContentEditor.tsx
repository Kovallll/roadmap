import { useState } from 'react';
import { Button, Flex, Layout, Typography } from 'antd';
import { SerializedEditorState } from 'lexical';

import { SharedHistoryContext } from './context/SharedHistoryContext';
import { ToolbarContext } from './context/ToolbarContext';
import { Editor } from './Editor/Editor';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import { TableContext } from './plugins/TablePlugin';
import styles from './styles.module.scss';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';

import './styles.css';
import { selectedNodeStore } from '@/shared/model';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useReactFlow } from '@xyflow/react';

export const NodeContentEditor = ({
  onCloseDrawer,
}: {
  onCloseDrawer: () => void;
}) => {
  const [serializedContent, setSerializedContent] =
    useState<SerializedEditorState>();
  const { selectedNode, setSelectedNode } = selectedNodeStore();
  const { updateNode } = useReactFlow();

  const initialConfig = {
    editorState: null,
    namespace: 'Playground',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };
  if (!selectedNode) return null;
  const content = selectedNode.data.content as SerializedEditorState;
  const handleSaveContent = () => {
    const newData = { ...selectedNode.data, content: serializedContent };
    updateNode(selectedNode.id, { data: newData });
    setSelectedNode({
      ...selectedNode,
      data: newData,
    });
    onCloseDrawer();
  };

  const hadnleEditContent = (content: SerializedEditorState) => {
    setSerializedContent(content);
  };

  const title = selectedNode?.data.label as string;

  return (
    <>
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
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <TableContext>
            <ToolbarContext>
              <Editor
                editContent={hadnleEditContent}
                initialSerializedContent={content}
              />
            </ToolbarContext>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </>
  );
};
