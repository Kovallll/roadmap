import type { JSX } from 'react';
import { Dispatch } from 'react';
import { Divider } from 'antd';
import { LexicalEditor } from 'lexical';
import BgColor from 'public/images/icons/bg-color.svg?react';
import FontColor from 'public/images/icons/font-color.svg?react';

import { useToolbarState, useUpdateToolbar } from '../../model';
import { BlockFormatDropDown } from '../components/BlockFormatDropDown/BlockFormatDropDown';
import { CodeLanguageDropDown } from '../components/CodeLanguageDropDown/CodeLanguageDropDown';
import { DropdownColorPicker } from '../components/DropdownColorPicker';
import { FontDropDown } from '../components/FontDropDown/FontDropDown';
import { FontSize } from '../components/FontSize';
import { HistoryControls } from '../components/HistoryControls';
import { InsertDropDown } from '../components/InsertDropDown';
import { PositionFormatDropDown } from '../components/PositionFormatDropDown';
import { TextFormatDropDown } from '../components/TextFormatDropDown';
import { TransformButtons } from '../components/TransformButtons';
import styles from './styles.module.scss';

import { Styles } from '@/shared/model';

export function EditorToolbar({
  editor,
  activeEditor,
  setActiveEditor,
  setIsLinkEditMode,
}: {
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  setActiveEditor: Dispatch<LexicalEditor>;
  setIsLinkEditMode: Dispatch<boolean>;
}): JSX.Element {
  const { onBgColorSelect, onCodeLanguageSelect, onFontColorSelect } =
    useUpdateToolbar(editor, activeEditor, setActiveEditor);
  const { toolbarState } = useToolbarState();

  const fontIconStyles: Styles = { '--font-color': toolbarState.fontColor };
  const bgIconStyles: Styles = { '--bg-color': toolbarState.bgColor };

  return (
    <div className={styles.toolbar}>
      <HistoryControls activeEditor={activeEditor} />
      <Divider type="vertical" className={styles.divider} />
      <BlockFormatDropDown editor={activeEditor} />
      {toolbarState.blockType === 'code' ? (
        <CodeLanguageDropDown onCodeLanguageSelect={onCodeLanguageSelect} />
      ) : (
        <>
          <FontDropDown
            style={'font-family'}
            value={toolbarState.fontFamily}
            editor={activeEditor}
          />
          <Divider type="vertical" className={styles.divider} />
          <FontSize
            selectionFontSize={toolbarState.fontSize.slice(0, -2)}
            editor={activeEditor}
          />
          <Divider type="vertical" className={styles.divider} />
          <TransformButtons
            activeEditor={activeEditor}
            setIsLinkEditMode={setIsLinkEditMode}
          />
          <DropdownColorPicker
            buttonAriaLabel="Formatting text color"
            color={toolbarState.fontColor}
            onChange={onFontColorSelect}
            iconComponent={
              <FontColor className={styles.fontIcon} style={fontIconStyles} />
            }
          />
          <DropdownColorPicker
            buttonAriaLabel="Formatting background color"
            color={toolbarState.bgColor}
            onChange={onBgColorSelect}
            iconComponent={
              <BgColor className={styles.bgIcon} style={bgIconStyles} />
            }
          />
          <TextFormatDropDown activeEditor={activeEditor} />
          <Divider type="vertical" className={styles.divider} />
          <InsertDropDown activeEditor={activeEditor} />
        </>
      )}
      <Divider type="vertical" className={styles.divider} />
      <PositionFormatDropDown editor={activeEditor} />
    </div>
  );
}
