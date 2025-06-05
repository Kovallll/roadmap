export * from './colors';
export * from './dropdown';
export * from './toolbar';
export * from './settings';

import { HTMLAttributes, HTMLInputTypeAttribute, JSX, ReactNode } from 'react';
import { LexicalEditor, SerializedEditorState } from 'lexical';

import { ToolbarOptions } from './toolbar';

import { Node } from '@xyflow/react';

export type NodeContentEditorProps = {
  selectedNode: Node | null;
  handleUpdate: (field: string, value: string | number | null) => void;
};

export type EditorHeaderProps = {
  serializedContent: SerializedEditorState | null;
  onCloseDrawer: () => void;
};

export type CodeLanguageDropDownProps = {
  onCodeLanguageSelect: (value: string) => void;
};

export type DropDownItemProps = {
  item: Partial<ToolbarOptions>;
  onClick: () => void;
} & Omit<HTMLAttributes<HTMLButtonElement>, 'onClick' | 'color'>;

export type TransformButtonsProps = {
  activeEditor: LexicalEditor;
  setIsLinkEditMode: (isLinkEditMode: boolean) => void;
};

export type FormatDropDownProps = {
  activeEditor: LexicalEditor;
};

export type HistoryControlsProps = {
  activeEditor: LexicalEditor;
};

export type InsertDropDownProps = {
  activeEditor: LexicalEditor;
};

export type DropDownProps = {
  disabled?: boolean;
  buttonAriaLabel?: string;
  buttonClassName?: string;
  buttonIconClassName?: string;
  buttonLabel?: string;
  children?: ReactNode;
  stopCloseOnClickSelf?: boolean;
  iconComponent?: JSX.Element;
};

export type DropdownColorPickerProps = {
  stopCloseOnClickSelf?: boolean;
  color: string;
  onChange?: (color: string, skipHistoryStack: boolean) => void;
} & DropDownProps;

export type ColorPickerProps = {
  color: string;
  onChange?: (value: string, skipHistoryStack: boolean) => void;
};

export type TextInputProps = Readonly<{
  'data-test-id'?: string;
  label: string;
  onChange: (val: string) => void;
  placeholder?: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  labelClassName?: string;
  containerClassName?: string;
}> &
  Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'>;
