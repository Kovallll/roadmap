import { Flex } from 'antd';

import { ContentArea } from './ContentArea/ContentArea';
import styles from './styles.module.scss';

import { editorTheme } from '@/entities/NodeContentEditor/lib';
import EditorNodes from '@/entities/NodeContentEditor/ui/nodes/EditorNodes';
import { StatusSelect } from '@/shared/ui/StatusSelect/ui/StatusSelect';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

export const NodeContentViewer = () => {
  const initialConfig = {
    editorState: null,
    namespace: 'ReadOnlyViewer',
    nodes: [...EditorNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: editorTheme,
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
