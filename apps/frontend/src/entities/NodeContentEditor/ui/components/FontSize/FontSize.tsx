import { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { LexicalEditor } from 'lexical';
import AddSignIcon from 'public/images/icons/add-sign.svg?react';
import MinusSignIcon from 'public/images/icons/minus-sign.svg?react';

import { SHORTCUTS } from '../../plugins/ShortcutsPlugin/shortcuts';
import styles from './styles.module.scss';

import {
  updateFontSize,
  updateFontSizeInSelection,
  UpdateFontSizeType,
} from '@/entities/NodeContentEditor/lib';
import {
  MAX_ALLOWED_FONT_SIZE,
  MIN_ALLOWED_FONT_SIZE,
} from '@/shared/ui/TextViewEditors/lib';

export function parseAllowedFontSize(input: string): string {
  const match = input.match(/^(\d+(?:\.\d+)?)px$/);
  if (match) {
    const n = Number(match[1]);
    if (n >= MIN_ALLOWED_FONT_SIZE && n <= MAX_ALLOWED_FONT_SIZE) {
      return input;
    }
  }
  return '';
}

export function FontSize({
  selectionFontSize,
  editor,
}: {
  selectionFontSize: string;
  editor: LexicalEditor;
}) {
  const [inputValue, setInputValue] = useState<string>(selectionFontSize);
  const [inputChangeFlag, setInputChangeFlag] = useState<boolean>(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValueNumber = Number(inputValue);

    if (e.key === 'Tab') {
      return;
    }
    if (['e', 'E', '+', '-'].includes(e.key) || isNaN(inputValueNumber)) {
      e.preventDefault();
      setInputValue('');
      return;
    }
    setInputChangeFlag(true);
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();

      updateFontSizeByInputValue(inputValueNumber);
    }
  };

  const handleInputBlur = () => {
    if (inputValue !== '' && inputChangeFlag) {
      const inputValueNumber = Number(inputValue);
      updateFontSizeByInputValue(inputValueNumber);
    }
  };

  const handleIncrementClick = () => {
    updateFontSize(editor, UpdateFontSizeType.increment, inputValue);
  };

  const handleDecrementClick = () => {
    updateFontSize(editor, UpdateFontSizeType.decrement, inputValue);
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const updateFontSizeByInputValue = (inputValueNumber: number) => {
    let updatedFontSize = inputValueNumber;
    if (inputValueNumber > MAX_ALLOWED_FONT_SIZE) {
      updatedFontSize = MAX_ALLOWED_FONT_SIZE;
    } else if (inputValueNumber < MIN_ALLOWED_FONT_SIZE) {
      updatedFontSize = MIN_ALLOWED_FONT_SIZE;
    }

    setInputValue(String(updatedFontSize));
    updateFontSizeInSelection(editor, String(updatedFontSize) + 'px', null);
    setInputChangeFlag(false);
  };

  useEffect(() => {
    setInputValue(selectionFontSize);
  }, [selectionFontSize]);

  const isIncrementDisabled =
    selectionFontSize !== '' && Number(inputValue) >= MAX_ALLOWED_FONT_SIZE;
  const isDecrementDisabled =
    selectionFontSize !== '' && Number(inputValue) <= MIN_ALLOWED_FONT_SIZE;

  return (
    <>
      <Button
        disabled={isDecrementDisabled}
        onClick={handleDecrementClick}
        className={styles.button}
        aria-label="Decrease font size"
        title={`Decrease font size (${SHORTCUTS.DECREASE_FONT_SIZE})`}
      >
        <div className={styles.icon}>
          <MinusSignIcon opacity={isDecrementDisabled ? 0.3 : 1} />
        </div>
      </Button>

      <Input
        type="number"
        title="Font size"
        value={inputValue}
        className={styles.input}
        min={MIN_ALLOWED_FONT_SIZE}
        max={MAX_ALLOWED_FONT_SIZE}
        onChange={handleInputValueChange}
        onKeyDown={handleKeyPress}
        onBlur={handleInputBlur}
      />

      <Button
        disabled={isIncrementDisabled}
        onClick={handleIncrementClick}
        className={styles.button}
        aria-label="Increase font size"
        title={`Increase font size (${SHORTCUTS.INCREASE_FONT_SIZE})`}
      >
        <div className={styles.icon}>
          <AddSignIcon opacity={isIncrementDisabled ? 0.3 : 1} />
        </div>
      </Button>
    </>
  );
}
