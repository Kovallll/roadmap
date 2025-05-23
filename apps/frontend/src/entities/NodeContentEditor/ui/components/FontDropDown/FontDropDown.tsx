import { JSX, useCallback } from 'react';
import { $getSelection, LexicalEditor } from 'lexical';

import { DropDown } from '../DropDown';
import { DropDownItem } from '../DropDownItem';
import styles from './styles.module.scss';

import {
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_OPTIONS,
} from '@/entities/NodeContentEditor/lib';
import { $patchStyleText } from '@lexical/selection';

export function FontDropDown({
  editor,
  value,
  style,
  disabled = false,
}: {
  editor: LexicalEditor;
  value: string;
  style: string;
  disabled?: boolean;
}): JSX.Element {
  const handleClick = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if (selection !== null) {
          $patchStyleText(selection, {
            [style]: option,
          });
        }
      });
    },
    [editor, style]
  );

  const buttonAriaLabel =
    style === 'font-family'
      ? 'Formatting options for font family'
      : 'Formatting options for font size';

  return (
    <DropDown
      buttonClassName={styles.dropDown}
      disabled={disabled}
      buttonLabel={value}
      buttonIconClassName={
        style === 'font-family' ? 'icon block-type font-family' : ''
      }
      buttonAriaLabel={buttonAriaLabel}
    >
      {(style === 'font-family' ? FONT_FAMILY_OPTIONS : FONT_SIZE_OPTIONS).map(
        ([option, text]) => (
          <DropDownItem
            onClick={() => handleClick(option)}
            key={option}
            item={{ title: text, isActive: value === option }}
          />
        )
      )}
    </DropDown>
  );
}
