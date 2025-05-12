import { ElementFormatType } from 'lexical';

import { INITIAL_TOOLBAR_STATE } from '../lib';

import { Node } from '@xyflow/react';

export type NodeContentEditorProps = {
  selectedNode: Node | null;
  handleUpdate: (field: string, value: string | number | null) => void;
};

type ToolbarState = typeof INITIAL_TOOLBAR_STATE;

// Utility type to get keys and infer value types
type ToolbarStateKey = keyof ToolbarState;
type ToolbarStateValue<Key extends ToolbarStateKey> = ToolbarState[Key];

export type ContextShape = {
  toolbarState: ToolbarState;
  updateToolbarState<Key extends ToolbarStateKey>(
    key: Key,
    value: ToolbarStateValue<Key>
  ): void;
};
