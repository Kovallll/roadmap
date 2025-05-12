import { ContentArea } from './ContentArea/ContentArea';

import PlaygroundNodes from '@/entities/NodeContentEditor/ui/nodes/PlaygroundNodes';
import PlaygroundEditorTheme from '@/entities/NodeContentEditor/ui/themes/PlaygroundEditorTheme';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

export const NodeContentViewer = () => {
  const initialConfig = {
    editorState: null,
    namespace: 'ReadOnlyViewer',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ContentArea />
    </LexicalComposer>
  );
};
