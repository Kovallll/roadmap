import { Divider, Typography } from 'antd';
import {
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  INDENT_CONTENT_COMMAND,
  LexicalEditor,
  OUTDENT_CONTENT_COMMAND,
} from 'lexical';

import { DropDown, DropDownItem } from '../../components/DropDown';

import { ELEMENT_FORMAT_OPTIONS } from '@/entities/NodeContentEditor/lib';
import { SHORTCUTS } from '@/shared/ui/TextViewEditors/lib';

export function ElementFormatDropdown({
  editor,
  value,
  isRTL,
  disabled = false,
}: {
  editor: LexicalEditor;
  value: ElementFormatType;
  isRTL: boolean;
  disabled: boolean;
}) {
  const formatOption = ELEMENT_FORMAT_OPTIONS[value || 'left'];

  return (
    <DropDown
      disabled={disabled}
      buttonLabel={formatOption.name}
      buttonIconClassName={`icon ${
        isRTL ? formatOption.iconRTL : formatOption.icon
      }`}
      buttonClassName="toolbar-item spaced alignment"
      buttonAriaLabel="Formatting options for text alignment"
    >
      <DropDownItem
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
        className="item wide"
      >
        <div className="icon-text-container">
          <i className="icon left-align" />
          <Typography.Text className="text">Left Align</Typography.Text>
        </div>
        <Typography.Text className="shortcut">
          {SHORTCUTS.LEFT_ALIGN}
        </Typography.Text>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
        className="item wide"
      >
        <div className="icon-text-container">
          <i className="icon center-align" />
          <Typography.Text className="text">Center Align</Typography.Text>
        </div>
        <Typography.Text className="shortcut">
          {SHORTCUTS.CENTER_ALIGN}
        </Typography.Text>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
        className="item wide"
      >
        <div className="icon-text-container">
          <i className="icon right-align" />
          <Typography.Text className="text">Right Align</Typography.Text>
        </div>
        <Typography.Text className="shortcut">
          {SHORTCUTS.RIGHT_ALIGN}
        </Typography.Text>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
        className="item wide"
      >
        <div className="icon-text-container">
          <i className="icon justify-align" />
          <Typography.Text className="text">Justify Align</Typography.Text>
        </div>
        <Typography.Text className="shortcut">
          {SHORTCUTS.JUSTIFY_ALIGN}
        </Typography.Text>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'start');
        }}
        className="item wide"
      >
        <i
          className={`icon ${
            isRTL
              ? ELEMENT_FORMAT_OPTIONS.start.iconRTL
              : ELEMENT_FORMAT_OPTIONS.start.icon
          }`}
        />
        <Typography.Text className="text">Start Align</Typography.Text>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'end');
        }}
        className="item wide"
      >
        <i
          className={`icon ${
            isRTL
              ? ELEMENT_FORMAT_OPTIONS.end.iconRTL
              : ELEMENT_FORMAT_OPTIONS.end.icon
          }`}
        />
        <Typography.Text className="text">End Align</Typography.Text>
      </DropDownItem>
      <Divider />
      <DropDownItem
        onClick={() => {
          editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
        }}
        className="item wide"
      >
        <div className="icon-text-container">
          <i className={'icon ' + (isRTL ? 'indent' : 'outdent')} />
          <Typography.Text className="text">Outdent</Typography.Text>
        </div>
        <Typography.Text className="shortcut">
          {SHORTCUTS.OUTDENT}
        </Typography.Text>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
        }}
        className="item wide"
      >
        <div className="icon-text-container">
          <i className={'icon ' + (isRTL ? 'outdent' : 'indent')} />
          <Typography.Text className="text">Indent</Typography.Text>
        </div>
        <Typography.Text className="shortcut">
          {SHORTCUTS.INDENT}
        </Typography.Text>
      </DropDownItem>
    </DropDown>
  );
}
