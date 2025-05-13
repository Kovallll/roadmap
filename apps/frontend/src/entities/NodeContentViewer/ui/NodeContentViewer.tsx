import { Flex } from 'antd';

import { ContentArea } from './ContentArea/ContentArea';
import styles from './styles.module.scss';

import PlaygroundNodes from '@/entities/NodeContentEditor/ui/nodes/PlaygroundNodes';
import PlaygroundEditorTheme from '@/entities/NodeContentEditor/ui/themes/PlaygroundEditorTheme';
import { StatusSelect } from '@/shared/ui/StatusSelect/ui/StatusSelect';
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
      <Flex className={styles.select}>
        <StatusSelect />
      </Flex>
      <ContentArea />
    </LexicalComposer>
  );
};
