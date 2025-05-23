import { JSX } from 'react';
import { LexicalEditor } from 'lexical';

import { DropDown } from '../DropDown';
import { DropDownItem } from '../DropDownItem';

import {
  useToolbar,
  useToolbarState,
} from '@/entities/NodeContentEditor/model';

export function BlockFormatDropDown({
  editor,
}: {
  editor: LexicalEditor;
}): JSX.Element {
  const { toolbarState } = useToolbarState();
  const blockType = toolbarState.blockType;

  const { blockFormatOptions } = useToolbar();

  const activeFormat =
    blockFormatOptions.find(({ type }) => type === blockType) ??
    blockFormatOptions[0];

  return (
    <DropDown
      buttonIconClassName={'icon block-type ' + blockType}
      buttonLabel={activeFormat.title}
      buttonAriaLabel="Formatting options for text style"
      iconComponent={activeFormat.Icon}
    >
      {blockFormatOptions.map((item) => {
        return (
          <DropDownItem
            key={item.title}
            onClick={() => item.onClick(editor, blockType, item.type)}
            item={{
              ...item,
              isActive: blockType === item.type,
            }}
          />
        );
      })}
    </DropDown>
  );
}
