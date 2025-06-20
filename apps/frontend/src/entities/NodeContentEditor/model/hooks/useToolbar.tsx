import {
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import RedoIcon from 'public/images/icons/arrow-clockwise.svg?react';
import UndoIcon from 'public/images/icons/arrow-counterclockwise.svg?react';
import CaretRightFillIcon from 'public/images/icons/caret-right-fill.svg?react';
import QuoteIcon from 'public/images/icons/chat-square-quote.svg?react';
import CodeIcon from 'public/images/icons/code.svg?react';
import FileImageIcon from 'public/images/icons/file-image.svg?react';
import HighlighterIcon from 'public/images/icons/highlighter.svg?react';
import HorizontalRuleIcon from 'public/images/icons/horizontal-rule.svg?react';
import IndentAlignIcon from 'public/images/icons/indent.svg?react';
import JustifyAlignIcon from 'public/images/icons/justify.svg?react';
import LinkIcon from 'public/images/icons/link.svg?react';
import NumberedListIcon from 'public/images/icons/list-ol.svg?react';
import BulletListIcon from 'public/images/icons/list-ul.svg?react';
import OutdentAlignIcon from 'public/images/icons/outdent.svg?react';
import CheckListIcon from 'public/images/icons/square-check.svg?react';
import TableIcon from 'public/images/icons/table.svg?react';
import CenterAlignIcon from 'public/images/icons/text-center.svg?react';
import LeftAlignIcon from 'public/images/icons/text-left.svg?react';
import ParagraphIcon from 'public/images/icons/text-paragraph.svg?react';
import RightAlignIcon from 'public/images/icons/text-right.svg?react';
import BoldIcon from 'public/images/icons/type-bold.svg?react';
import CapitalizeIcon from 'public/images/icons/type-capitalize.svg?react';
import H1Icon from 'public/images/icons/type-h1.svg?react';
import H2Icon from 'public/images/icons/type-h2.svg?react';
import H3Icon from 'public/images/icons/type-h3.svg?react';
import ItalicIcon from 'public/images/icons/type-italic.svg?react';
import LowercaseIcon from 'public/images/icons/type-lowercase.svg?react';
import StrikethroughIcon from 'public/images/icons/type-strikethrough.svg?react';
import SubscriptIcon from 'public/images/icons/type-subscript.svg?react';
import SuperscriptIcon from 'public/images/icons/type-superscript.svg?react';
import UnderlineIcon from 'public/images/icons/type-underline.svg?react';
import UppercaseIcon from 'public/images/icons/type-uppercase.svg?react';

import {
  BlockTypes,
  formatBulletList,
  formatCheckList,
  formatCode,
  formatHeading,
  formatNumberedList,
  formatParagraph,
  formatQuote,
  TransformType,
} from '../../lib';
import { INSERT_COLLAPSIBLE_COMMAND } from '../../ui/plugins/CollapsiblePlugin';
import { useToolbarState } from '../context';
import {
  BlockFormatOptionsType,
  HistoryControlsType,
  InsertOptionsType,
  PositionFormatType,
  TextFormatOptionsType,
  TransformButtonType,
} from '../types';

import { useTheme } from '@/shared/model';
import { SHORTCUTS } from '@/shared/ui/Align/lib';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import { IS_APPLE } from '@lexical/utils';

export const useToolbar = () => {
  const { toolbarState } = useToolbarState();
  const { colors } = useTheme();

  const blockFormatOptions: BlockFormatOptionsType[] = [
    {
      onClick: formatParagraph,
      type: BlockTypes.PARAGRAPH,
      Icon: <ParagraphIcon fill={colors.contrPrimary} />,
      title: 'Normal',
      shortcut: SHORTCUTS.NORMAL,
    },
    {
      onClick: formatHeading,
      type: BlockTypes.H1,
      Icon: <H1Icon fill={colors.contrPrimary} />,
      title: 'Heading 1',
      shortcut: SHORTCUTS.HEADING1,
    },
    {
      onClick: formatHeading,
      type: BlockTypes.H2,
      Icon: <H2Icon fill={colors.contrPrimary} />,
      title: 'Heading 2',
      shortcut: SHORTCUTS.HEADING2,
    },
    {
      onClick: formatHeading,
      type: BlockTypes.H3,
      Icon: <H3Icon fill={colors.contrPrimary} />,
      title: 'Heading 3',
      shortcut: SHORTCUTS.HEADING3,
    },
    {
      onClick: formatBulletList,
      type: BlockTypes.BULLET,
      Icon: <BulletListIcon fill={colors.contrPrimary} />,
      title: 'Bullet List',
      shortcut: SHORTCUTS.BULLET_LIST,
    },
    {
      onClick: formatNumberedList,
      type: BlockTypes.NUMBER,
      Icon: <NumberedListIcon fill={colors.contrPrimary} />,
      title: 'Numbered List',
      shortcut: SHORTCUTS.NUMBERED_LIST,
    },
    {
      onClick: formatCheckList,
      type: BlockTypes.CHECK,
      Icon: <CheckListIcon fill={colors.contrPrimary} />,
      title: 'Check List',
      shortcut: SHORTCUTS.CHECK_LIST,
    },
    {
      onClick: formatQuote,
      type: BlockTypes.QUOTE,
      Icon: <QuoteIcon fill={colors.contrPrimary} />,
      title: 'Quote',
      shortcut: SHORTCUTS.QUOTE,
    },
    {
      onClick: formatCode,
      type: BlockTypes.CODE,
      Icon: <CodeIcon fill={colors.contrPrimary} />,
      title: 'Code Block',
      shortcut: SHORTCUTS.CODE_BLOCK,
    },
  ];

  const textFormatOptions: TextFormatOptionsType[] = [
    {
      dispatchCommand: { type: FORMAT_TEXT_COMMAND, payload: 'lowercase' },
      isActive: toolbarState.isLowercase,
      Icon: <LowercaseIcon fill={colors.contrPrimary} />,
      title: 'Lowercase',
      shortcut: SHORTCUTS.LOWERCASE,
      ariaLabel: 'Format text to lowercase',
    },
    {
      dispatchCommand: { type: FORMAT_TEXT_COMMAND, payload: 'uppercase' },
      isActive: toolbarState.isUppercase,
      Icon: <UppercaseIcon fill={colors.contrPrimary} />,
      title: 'Uppercase',
      shortcut: SHORTCUTS.UPPERCASE,
      ariaLabel: 'Format text to uppercase',
    },
    {
      dispatchCommand: { type: FORMAT_TEXT_COMMAND, payload: 'capitalize' },
      isActive: toolbarState.isCapitalize,
      Icon: <CapitalizeIcon stroke={colors.contrPrimary} />,
      title: 'Capitalize',
      shortcut: SHORTCUTS.CAPITALIZE,
      ariaLabel: 'Format text to capitalize',
    },
    {
      dispatchCommand: { type: FORMAT_TEXT_COMMAND, payload: 'strikethrough' },
      isActive: toolbarState.isStrikethrough,
      Icon: <StrikethroughIcon fill={colors.contrPrimary} />,
      title: 'Strikethrough',
      shortcut: SHORTCUTS.STRIKETHROUGH,
      ariaLabel: 'Format text with a strikethrough',
    },
    {
      dispatchCommand: { type: FORMAT_TEXT_COMMAND, payload: 'subscript' },
      isActive: toolbarState.isSubscript,
      Icon: <SubscriptIcon stroke={colors.contrPrimary} />,
      title: 'Subscript',
      shortcut: SHORTCUTS.SUBSCRIPT,
      ariaLabel: 'Format text with a subscript',
    },
    {
      dispatchCommand: { type: FORMAT_TEXT_COMMAND, payload: 'superscript' },
      isActive: toolbarState.isSuperscript,
      Icon: <SuperscriptIcon stroke={colors.contrPrimary} />,
      title: 'Superscript',
      shortcut: SHORTCUTS.SUPERSCRIPT,
      ariaLabel: 'Format text with a superscript',
    },
    {
      dispatchCommand: { type: FORMAT_TEXT_COMMAND, payload: 'highlight' },
      isActive: toolbarState.isHighlight,
      Icon: <HighlighterIcon fill={colors.contrPrimary} />,
      title: 'Highlight',
      ariaLabel: 'Format text with a highlight',
    },
  ];

  const transformButtons: TransformButtonType[] = [
    {
      type: TransformType.BOLD,
      dispatchCommand: {
        type: FORMAT_TEXT_COMMAND,
        payload: TransformType.BOLD,
      },
      isActive: toolbarState.isBold,
      Icon: <BoldIcon fill={colors.contrPrimary} />,
      title: `Bold (${SHORTCUTS.BOLD})`,
      ariaLabel: `Format text as bold. Shortcut: ${SHORTCUTS.BOLD}`,
    },
    {
      type: TransformType.ITALIC,
      dispatchCommand: {
        type: FORMAT_TEXT_COMMAND,
        payload: TransformType.ITALIC,
      },
      isActive: toolbarState.isItalic,
      Icon: <ItalicIcon fill={colors.contrPrimary} />,
      title: `Italic (${SHORTCUTS.ITALIC})`,
      ariaLabel: `Format text as italics. Shortcut: ${SHORTCUTS.ITALIC}`,
    },
    {
      type: TransformType.UNDERLINE,
      dispatchCommand: {
        type: FORMAT_TEXT_COMMAND,
        payload: TransformType.UNDERLINE,
      },
      isActive: toolbarState.isUnderline,
      Icon: <UnderlineIcon fill={colors.contrPrimary} />,
      title: `Underline (${SHORTCUTS.UNDERLINE})`,
      ariaLabel: `Format text to underlined. Shortcut: ${SHORTCUTS.UNDERLINE}`,
    },
    {
      type: TransformType.CODE,
      dispatchCommand: {
        type: FORMAT_TEXT_COMMAND,
        payload: TransformType.CODE,
      },
      isActive: toolbarState.isCode,
      Icon: <CodeIcon fill={colors.contrPrimary} />,
      title: `Insert code block (${SHORTCUTS.INSERT_CODE_BLOCK})`,
      ariaLabel: 'Insert code block',
    },
    {
      type: TransformType.LINK,
      dispatchCommand: { type: TOGGLE_LINK_COMMAND, payload: null },
      isActive: toolbarState.isLink,
      Icon: <LinkIcon fill={colors.contrPrimary} />,
      title: `Insert link (${SHORTCUTS.INSERT_LINK})`,
      ariaLabel: 'Insert link',
    },
  ];

  const historyControls: HistoryControlsType[] = [
    {
      dispatchCommand: { type: UNDO_COMMAND, payload: undefined },
      isActive: toolbarState.canUndo,
      Icon: <UndoIcon fill={colors.contrPrimary} />,
      title: IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)',
      ariaLabel: 'Undo',
    },
    {
      dispatchCommand: { type: REDO_COMMAND, payload: undefined },
      isActive: toolbarState.canRedo,
      Icon: <RedoIcon fill={colors.contrPrimary} />,
      title: IS_APPLE ? 'Redo (⇧⌘Z)' : 'Redo (Ctrl+Y)',
      ariaLabel: 'Redo',
    },
  ];

  const positionFormatOptions: PositionFormatType[] = [
    {
      type: 'left',
      dispatchCommand: { type: FORMAT_ELEMENT_COMMAND, payload: 'left' },
      Icon: <LeftAlignIcon fill={colors.contrPrimary} />,
      title: 'Left Align',
      shortcut: SHORTCUTS.LEFT_ALIGN,
    },
    {
      type: 'center',
      dispatchCommand: { type: FORMAT_ELEMENT_COMMAND, payload: 'center' },
      Icon: <CenterAlignIcon fill={colors.contrPrimary} />,
      title: 'Center Align',
      shortcut: SHORTCUTS.CENTER_ALIGN,
    },
    {
      type: 'right',
      dispatchCommand: { type: FORMAT_ELEMENT_COMMAND, payload: 'right' },
      Icon: <RightAlignIcon fill={colors.contrPrimary} />,
      title: 'Right Align',
      shortcut: SHORTCUTS.RIGHT_ALIGN,
    },
    {
      type: 'justify',
      dispatchCommand: { type: FORMAT_ELEMENT_COMMAND, payload: 'justify' },
      Icon: <JustifyAlignIcon fill={colors.contrPrimary} />,
      title: 'Justify Align',
      shortcut: SHORTCUTS.JUSTIFY_ALIGN,
    },
    {
      type: 'indent',
      dispatchCommand: { type: INDENT_CONTENT_COMMAND, payload: undefined },
      Icon: <IndentAlignIcon fill={colors.contrPrimary} />,
      title: 'Indent',
      shortcut: SHORTCUTS.INDENT,
    },
    {
      type: 'outdent',
      dispatchCommand: { type: OUTDENT_CONTENT_COMMAND, payload: undefined },
      Icon: <OutdentAlignIcon fill={colors.contrPrimary} />,
      title: 'Outdent',
      shortcut: SHORTCUTS.OUTDENT,
    },
  ];

  const insertOptions: InsertOptionsType[] = [
    {
      dispatchCommand: {
        type: INSERT_HORIZONTAL_RULE_COMMAND,
        payload: undefined,
      },
      Icon: <HorizontalRuleIcon fill={colors.contrPrimary} />,
      title: 'Horizontal Rule',
    },
    {
      dispatchCommand: {
        type: INSERT_COLLAPSIBLE_COMMAND,
        payload: undefined,
      },
      Icon: <CaretRightFillIcon fill={colors.contrPrimary} />,
      title: 'Collapsible container',
    },
    {
      Icon: <FileImageIcon fill={colors.contrPrimary} />,
      title: 'Image',
      modalType: 'image',
    },
    {
      Icon: <TableIcon fill={colors.contrPrimary} />,
      title: 'Table',
      modalType: 'table',
    },
  ];

  return {
    historyControls,
    transformButtons,
    textFormatOptions,
    insertOptions,
    positionFormatOptions,
    blockFormatOptions,
  };
};
