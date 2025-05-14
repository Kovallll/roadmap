import { JSX } from 'react';
import { Typography } from 'antd';
import { LexicalEditor } from 'lexical';

import { DropDown, DropDownItem } from '../../components/DropDown';

import {
  blockTypeToBlockName,
  dropDownActiveClass,
  formatBulletList,
  formatCheckList,
  formatCode,
  formatHeading,
  formatNumberedList,
  formatParagraph,
  formatQuote,
  rootTypeToRootName,
} from '@/entities/NodeContentEditor/lib';
import { SHORTCUTS } from '@/shared/ui/TextViewEditors/lib';

export function BlockFormatDropDown({
  editor,
  blockType,
  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  rootType: keyof typeof rootTypeToRootName;
  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element {
  return (
    <DropDown
      disabled={disabled}
      buttonClassName="toolbar-item block-controls"
      buttonIconClassName={'icon block-type ' + blockType}
      buttonLabel={blockTypeToBlockName[blockType]}
      buttonAriaLabel="Formatting options for text style"
    >
      <DropDownItem
        className={
          'item wide ' + dropDownActiveClass(blockType === 'paragraph')
        }
        onClick={() => formatParagraph(editor)}
      >
        <div className="icon-text-container">
          <i className="icon paragraph" />
          <Typography.Text className="text">Normal</Typography.Text>
        </div>
        <Typography.Text className="shortcut">
          {SHORTCUTS.NORMAL}
        </Typography.Text>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'h1')}
        onClick={() => formatHeading(editor, blockType, 'h1')}
      >
        <div className="icon-text-container">
          <i className="icon h1" />
          <Typography.Text className="text">Heading 1</Typography.Text>
        </div>
        <Typography.Text className="shortcut">
          {SHORTCUTS.HEADING1}
        </Typography.Text>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'h2')}
        onClick={() => formatHeading(editor, blockType, 'h2')}
      >
        <div className="icon-text-container">
          <i className="icon h2" />
          <Typography.Text className="text">Heading 2</Typography.Text>
        </div>
        <Typography.Text className="shortcut">
          {SHORTCUTS.HEADING2}
        </Typography.Text>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'h3')}
        onClick={() => formatHeading(editor, blockType, 'h3')}
      >
        <div className="icon-text-container">
          <i className="icon h3" />
          <Typography.Text className="text">Heading 3</Typography.Text>
        </div>
        <Typography.Text className="shortcut">
          {SHORTCUTS.HEADING3}
        </Typography.Text>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'bullet')}
        onClick={() => formatBulletList(editor, blockType)}
      >
        <div className="icon-text-container">
          <i className="icon bullet-list" />
          <Typography.Text className="text">Bullet List</Typography.Text>
        </div>
        <Typography.Text className="shortcut">
          {SHORTCUTS.BULLET_LIST}
        </Typography.Text>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'number')}
        onClick={() => formatNumberedList(editor, blockType)}
      >
        <div className="icon-text-container">
          <i className="icon numbered-list" />
          <Typography.Text className="text">Numbered List</Typography.Text>
        </div>
        <Typography.Text className="shortcut">
          {SHORTCUTS.NUMBERED_LIST}
        </Typography.Text>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'check')}
        onClick={() => formatCheckList(editor, blockType)}
      >
        <div className="icon-text-container">
          <i className="icon check-list" />
          <Typography.Text className="text">Check List</Typography.Text>
        </div>
        <Typography.Text className="shortcut">
          {SHORTCUTS.CHECK_LIST}
        </Typography.Text>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'quote')}
        onClick={() => formatQuote(editor, blockType)}
      >
        <div className="icon-text-container">
          <i className="icon quote" />
          <Typography.Text className="text">Quote</Typography.Text>
        </div>
        <Typography.Text className="shortcut">
          {SHORTCUTS.QUOTE}
        </Typography.Text>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'code')}
        onClick={() => formatCode(editor, blockType)}
      >
        <div className="icon-text-container">
          <i className="icon code" />
          <Typography.Text className="text">Code Block</Typography.Text>
        </div>
        <Typography.Text className="shortcut">
          {SHORTCUTS.CODE_BLOCK}
        </Typography.Text>
      </DropDownItem>
    </DropDown>
  );
}
