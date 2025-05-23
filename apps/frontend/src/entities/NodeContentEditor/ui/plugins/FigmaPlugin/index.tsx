import type { JSX } from 'react';
import { useEffect } from 'react';
import {
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from 'lexical';

import { $createFigmaNode, FigmaNode } from '../../nodes/FigmaNode';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';

export const INSERT_FIGMA_COMMAND: LexicalCommand<string> = createCommand(
  'INSERT_FIGMA_COMMAND'
);

export default function FigmaPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([FigmaNode])) {
      throw new Error('FigmaPlugin: FigmaNode not registered on editor');
    }

    return editor.registerCommand<string>(
      INSERT_FIGMA_COMMAND,
      (payload) => {
        const figmaNode = $createFigmaNode(payload);
        $insertNodeToNearestRoot(figmaNode);
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
