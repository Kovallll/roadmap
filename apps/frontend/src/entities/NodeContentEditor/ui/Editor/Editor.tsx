import type { JSX } from 'react';
import { SerializedEditorState } from 'lexical';

import { placeholder } from '../../lib';
import { useEditor, useSettings } from '../../model';
import { useSharedHistoryContext } from '../../model';
import { ContentEditable } from '../components/ContentEditable';
import { EditorToolbar } from '../EditorToolbar/EditorToolbar';
import AutocompletePlugin from '../plugins/AutocompletePlugin';
import AutoEmbedPlugin from '../plugins/AutoEmbedPlugin';
import AutoLinkPlugin from '../plugins/AutoLinkPlugin';
import CodeHighlightPlugin from '../plugins/CodeHighlightPlugin';
import CollapsiblePlugin from '../plugins/CollapsiblePlugin';
import ComponentPickerPlugin from '../plugins/ComponentPickerPlugin';
import ContextMenuPlugin from '../plugins/ContextMenuPlugin';
import DragDropPaste from '../plugins/DragDropPastePlugin';
import DraggableBlockPlugin from '../plugins/DraggableBlockPlugin';
import FigmaPlugin from '../plugins/FigmaPlugin';
import FloatingLinkEditorPlugin from '../plugins/FloatingLinkEditorPlugin';
import FloatingTextFormatToolbarPlugin from '../plugins/FloatingTextFormatToolbarPlugin';
import ImagesPlugin from '../plugins/ImagesPlugin';
import KeywordsPlugin from '../plugins/KeywordsPlugin';
import LinkPlugin from '../plugins/LinkPlugin';
import ShortcutsPlugin from '../plugins/ShortcutsPlugin';
import SpecialTextPlugin from '../plugins/SpecialTextPlugin';
import TabFocusPlugin from '../plugins/TabFocusPlugin';
import TableCellActionMenuPlugin from '../plugins/TableActionMenuPlugin';
import TableCellResizer from '../plugins/TableCellResizer';
import TableHoverActionsPlugin from '../plugins/TableHoverActionsPlugin';
import TableOfContentsPlugin from '../plugins/TableOfContentsPlugin';
import TwitterPlugin from '../plugins/TwitterPlugin';
import YouTubePlugin from '../plugins/YouTubePlugin';
import styles from './styles.module.scss';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { SelectionAlwaysOnDisplay } from '@lexical/react/LexicalSelectionAlwaysOnDisplay';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';

export const Editor = ({
  editContent,
  initialSerializedContent,
}: {
  editContent: (content: SerializedEditorState) => void;
  initialSerializedContent: SerializedEditorState;
}): JSX.Element => {
  const { historyState } = useSharedHistoryContext();
  const isEditable = useLexicalEditable();

  const {
    settings: {
      isCharLimit,
      hasLinkAttributes,
      isCharLimitUtf8,
      showTreeView,
      tableCellMerge,
      tableCellBackgroundColor,
      tableHorizontalScroll,
      selectionAlwaysOnDisplay,
      listStrictIndent,
      isAutocomplete,
      showTableOfContents,
      shouldUseLexicalContextMenu,
      shouldAllowHighlightingWithBrackets,
    },
  } = useSettings();

  const {
    floatingAnchorElem,
    isSmallWidthViewport,
    onChange,
    onRef,
    activeEditor,
    editor,
    isLinkEditMode,
    setActiveEditor,
    setIsLinkEditMode,
  } = useEditor(editContent, initialSerializedContent);

  return (
    <div className={styles.editor}>
      <EditorToolbar
        editor={editor}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
        setIsLinkEditMode={setIsLinkEditMode}
      />

      <ShortcutsPlugin
        editor={activeEditor}
        setIsLinkEditMode={setIsLinkEditMode}
      />

      <div
        className={`editor-container ${showTreeView ? 'tree-view' : ''}`}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <DragDropPaste />
        <AutoFocusPlugin />
        {selectionAlwaysOnDisplay && <SelectionAlwaysOnDisplay />}
        <ClearEditorPlugin />
        <ComponentPickerPlugin />
        <AutoEmbedPlugin />
        <HashtagPlugin />
        <KeywordsPlugin />
        <AutoLinkPlugin />

        <HistoryPlugin externalHistoryState={historyState} />
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor" ref={onRef}>
                <ContentEditable placeholder={placeholder} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <CodeHighlightPlugin />
        <ListPlugin hasStrictIndent={listStrictIndent} />
        <CheckListPlugin />
        <TablePlugin
          hasCellMerge={tableCellMerge}
          hasCellBackgroundColor={tableCellBackgroundColor}
          hasHorizontalScroll={tableHorizontalScroll}
        />
        <TableCellResizer />
        <ImagesPlugin />
        <LinkPlugin hasLinkAttributes={hasLinkAttributes} />
        <TwitterPlugin />
        <YouTubePlugin />
        <FigmaPlugin />
        <ClickableLinkPlugin disabled={isEditable} />
        <HorizontalRulePlugin />
        <TabFocusPlugin />
        <TabIndentationPlugin maxIndent={7} />
        <CollapsiblePlugin />
        <OnChangePlugin onChange={onChange} />
        {floatingAnchorElem && (
          <>
            <FloatingLinkEditorPlugin
              anchorElem={floatingAnchorElem}
              isLinkEditMode={isLinkEditMode}
              setIsLinkEditMode={setIsLinkEditMode}
            />
            <TableCellActionMenuPlugin
              anchorElem={floatingAnchorElem}
              cellMerge={true}
            />
          </>
        )}
        {floatingAnchorElem && !isSmallWidthViewport && (
          <>
            <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
            <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
            <FloatingTextFormatToolbarPlugin
              anchorElem={floatingAnchorElem}
              setIsLinkEditMode={setIsLinkEditMode}
            />
          </>
        )}

        {(isCharLimit || isCharLimitUtf8) && (
          <CharacterLimitPlugin
            charset={isCharLimit ? 'UTF-16' : 'UTF-8'}
            maxLength={5}
          />
        )}
        {isAutocomplete && <AutocompletePlugin />}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
        {shouldUseLexicalContextMenu && <ContextMenuPlugin />}
        {shouldAllowHighlightingWithBrackets && <SpecialTextPlugin />}
      </div>
    </div>
  );
};
