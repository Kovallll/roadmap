import type { JSX } from 'react';
import { useEffect } from 'react';
import {
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from 'lexical';

import { $createTweetNode, TweetNode } from '../../nodes/TweetNode';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';

export const INSERT_TWEET_COMMAND: LexicalCommand<string> = createCommand(
  'INSERT_TWEET_COMMAND'
);

export default function TwitterPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([TweetNode])) {
      throw new Error('TwitterPlugin: TweetNode not registered on editor');
    }

    return editor.registerCommand<string>(
      INSERT_TWEET_COMMAND,
      (payload) => {
        const tweetNode = $createTweetNode(payload);
        $insertNodeToNearestRoot(tweetNode);

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
