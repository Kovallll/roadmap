import { JSX } from 'react';
import { CommandPayloadType, LexicalCommand, LexicalEditor } from 'lexical';

import { INITIAL_TOOLBAR_STATE } from '../../lib';

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

export type ToolbarOptions = {
  Icon: JSX.Element;
  title: string;
  dispatchCommand: {
    type: LexicalCommand<unknown>;
    payload?: CommandPayloadType<LexicalCommand<unknown>>;
  };
  isActive: boolean;
  ariaLabel: string;
  type: string;
  shortcut?: string;
};

export type TransformButtonType = Omit<ToolbarOptions, 'shortcut'>;
export type HistoryControlsType = Omit<ToolbarOptions, 'shortcut' | 'type'>;
export type PositionFormatType = Pick<
  ToolbarOptions,
  'shortcut' | 'Icon' | 'title' | 'dispatchCommand' | 'type'
>;
export type TextFormatOptionsType = Omit<ToolbarOptions, 'type'>;
export type BlockFormatOptionsType = Omit<
  ToolbarOptions,
  'isActive' | 'dispatchCommand' | 'ariaLabel'
> & {
  onClick: (
    editor: LexicalEditor,
    blockType?: string,
    headingSize?: string
  ) => void;
};
export type InsertOptionsType = Pick<ToolbarOptions, 'Icon' | 'title'> & {
  dispatchCommand?: {
    type: LexicalCommand<unknown>;
    payload?: CommandPayloadType<LexicalCommand<unknown>>;
  };
  modalType?: string;
};
