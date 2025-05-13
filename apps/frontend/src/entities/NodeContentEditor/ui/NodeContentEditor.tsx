import { useState } from 'react';
import { SerializedEditorState } from 'lexical';

import { editorTheme } from '../lib';
import { SharedHistoryContext } from '../model';
import { ToolbarContext } from '../model';
import { Editor } from './Editor/Editor';
import { EditorHeader } from './EditorHeader/EditorHeader';
import EditorNodes from './nodes/EditorNodes';
import { TableContext } from './plugins/TablePlugin';

import './styles.css';
import { selectedNodeStore } from '@/shared/model';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

export const NodeContentEditor = ({
  onCloseDrawer,
}: {
  onCloseDrawer: () => void;
}) => {
  const [serializedContent, setSerializedContent] =
    useState<SerializedEditorState | null>(null);
  const { selectedNode } = selectedNodeStore();

  const initialConfig = {
    editorState: null,
    namespace: 'Editor',
    nodes: [...EditorNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: editorTheme,
  };
  if (!selectedNode) return null;
  const content = selectedNode.data.content as SerializedEditorState;

  const handleEditContent = (content: SerializedEditorState) => {
    setSerializedContent(content);
  };

  return (
    <>
      <EditorHeader
        serializedContent={serializedContent}
        onCloseDrawer={onCloseDrawer}
      />
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <TableContext>
            <ToolbarContext>
              <Editor
                editContent={handleEditContent}
                initialSerializedContent={content}
              />
            </ToolbarContext>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </>
  );
};
