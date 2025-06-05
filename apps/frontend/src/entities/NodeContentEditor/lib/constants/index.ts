import { ElementFormatType } from 'lexical';

import { rootTypeToRootName } from './toolbar';

import { DEFAULT_FONT_SIZE } from '@/shared/ui/Align/lib';

export {
  CODE_LANGUAGE_OPTIONS,
  ELEMENT_FORMAT_OPTIONS,
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_OPTIONS,
  rootTypeToRootName,
} from './toolbar';

export * from './enums';
export * from './settings';

export const INITIAL_TOOLBAR_STATE = {
  bgColor: '#fff',
  blockType: 'paragraph',
  canRedo: false,
  canUndo: false,
  codeLanguage: '',
  elementFormat: 'left' as ElementFormatType,
  fontColor: '#fff',
  fontFamily: 'Arial',
  fontSize: `${DEFAULT_FONT_SIZE}px`,
  fontSizeInputValue: `${DEFAULT_FONT_SIZE}`,
  isBold: false,
  isCode: false,
  isHighlight: false,
  isImageCaption: false,
  isItalic: false,
  isLink: false,
  isRTL: false,
  isStrikethrough: false,
  isSubscript: false,
  isSuperscript: false,
  isUnderline: false,
  isLowercase: false,
  isUppercase: false,
  isCapitalize: false,
  rootType: 'root' as keyof typeof rootTypeToRootName,
};

export const dropDownPadding = 4;

export const COLOR_PICKER_WIDTH = 214;
export const COLOR_PICKER_HEIGHT = 150;

export const basicColors = [
  '#d0021b',
  '#f5a623',
  '#f8e71c',
  '#8b572a',
  '#7ed321',
  '#417505',
  '#bd10e0',
  '#9013fe',
  '#4a90e2',
  '#50e3c2',
  '#b8e986',
  '#000000',
  '#4a4a4a',
  '#9b9b9b',
  '#ffffff',
];

export const placeholder = 'Enter some text...';
