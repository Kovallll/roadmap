import { SerializedEditorState } from 'lexical';
import { INITIAL_TOOLBAR_STATE } from '../lib';

import { Node } from '@xyflow/react';

export type NodeContentEditorProps = {
  selectedNode: Node | null;
  handleUpdate: (field: string, value: string | number | null) => void;
};

export type ToolbarState = typeof INITIAL_TOOLBAR_STATE;

// Utility type to get keys and infer value types
export type ToolbarStateKey = keyof ToolbarState;
export type ToolbarStateValue<Key extends ToolbarStateKey> = ToolbarState[Key];

export type ContextShape = {
  toolbarState: ToolbarState;
  updateToolbarState<Key extends ToolbarStateKey>(
    key: Key,
    value: ToolbarStateValue<Key>
  ): void;
};

export type EditorHeaderProps = {
  serializedContent: SerializedEditorState | null;
  onCloseDrawer: () => void;
};

export type DropDownContextType = {
  registerItem: (ref: React.RefObject<HTMLButtonElement | null>) => void;
};
