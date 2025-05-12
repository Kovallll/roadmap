import { useEffect } from 'react';
import { SerializedEditorState } from 'lexical';

import styles from './styles.module.scss';

import { useSelectedNodeStore } from '@/shared/model';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

export const ContentArea = () => {
  const [editor] = useLexicalComposerContext();
  const selectedNode = useSelectedNodeStore.use.selectedNode();

  const content = selectedNode?.data?.content as SerializedEditorState;

  useEffect(() => {
    const parsed = editor.parseEditorState(content);
    editor.setEditorState(parsed);
    editor.setEditable(false);
  }, [editor, content]);

  if (!selectedNode) return null;

  return (
    <>
      <RichTextPlugin
        contentEditable={<ContentEditable className={styles.contentArea} />}
        placeholder={null}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
    </>
  );
};
