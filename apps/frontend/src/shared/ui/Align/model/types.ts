import { LexicalEditor } from 'lexical';

import { AlignType } from '@/shared/model';

export type AlignComponentProps = {
  children: React.ReactNode;
};

export type AlignVerticalProps = {
  handleChange: (align: AlignType) => void;
  alignItems?: AlignType;
};

export type AlignHorizontalProps = {
  handleChange: (align: AlignType) => void;
  justifyContent?: AlignType;
};

export type FontSizeProps = {
  selectionFontSize: string;
  disabled: boolean;
  editor: LexicalEditor;
};
