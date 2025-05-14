import type { JSX } from 'react';
import { Dispatch, useCallback, useEffect, useState } from 'react';
import { Button, Divider, Typography } from 'antd';
import cn from 'classnames';
import {
  $getNodeByKey,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  HISTORIC_TAG,
  LexicalEditor,
  NodeKey,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import BoldIcon from 'public/images/icons/type-bold.svg?react';

import {
  blockTypeToBlockName,
  CODE_LANGUAGE_OPTIONS,
  dropDownActiveClass,
  getSelectedNode,
} from '../../lib';
import { sanitizeUrl } from '../../lib';
import { useModal, useToolbarState } from '../../model';
import {
  DropDown,
  DropdownColorPicker,
  DropDownItem,
} from '../components/DropDown';
import { FontSize } from '../components/FontSize';
import { EmbedConfigs } from '../plugins/AutoEmbedPlugin';
import { INSERT_COLLAPSIBLE_COMMAND } from '../plugins/CollapsiblePlugin';
import { InsertImageDialog } from '../plugins/ImagesPlugin';
import { InsertTableDialog } from '../plugins/TablePlugin';
import { BlockFormatDropDown } from './BlockFormatDropDown/BlockFormatDropDown';
import { ElementFormatDropdown } from './ElementFormatDropdown/ElementFormatDropdown';
import { FontDropDown } from './FontDropDown/FontDropDown';
import styles from './styles.module.scss';

import { Styles } from '@/shared/model';
import { colors } from '@/shared/styles/theme';
import { SHORTCUTS } from '@/shared/ui/TextViewEditors/lib';
import {
  $isCodeNode,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from '@lexical/code';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isListNode, ListNode } from '@lexical/list';
import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import { $isHeadingNode } from '@lexical/rich-text';
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
} from '@lexical/selection';
import { $isTableNode, $isTableSelection } from '@lexical/table';
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  $isEditorIsNestedEditor,
  IS_APPLE,
  mergeRegister,
} from '@lexical/utils';

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
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
    null
  );
  const [modal, showModal] = useModal();
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const { toolbarState, updateToolbarState } = useToolbarState();

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      if (activeEditor !== editor && $isEditorIsNestedEditor(activeEditor)) {
        const rootElement = activeEditor.getRootElement();
        updateToolbarState(
          'isImageCaption',
          !!rootElement?.parentElement?.classList.contains(
            'image-caption-container'
          )
        );
      } else {
        updateToolbarState('isImageCaption', false);
      }

      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      updateToolbarState('isRTL', $isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      const isLink = $isLinkNode(parent) || $isLinkNode(node);
      updateToolbarState('isLink', isLink);

      const tableNode = $findMatchingParent(node, $isTableNode);
      if ($isTableNode(tableNode)) {
        updateToolbarState('rootType', 'table');
      } else {
        updateToolbarState('rootType', 'root');
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();

          updateToolbarState('blockType', type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            updateToolbarState(
              'blockType',
              type as keyof typeof blockTypeToBlockName
            );
          }
          if ($isCodeNode(element)) {
            const language =
              element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
            updateToolbarState(
              'codeLanguage',
              language ? CODE_LANGUAGE_MAP[language] || language : ''
            );
            return;
          }
        }
      }
      // Handle buttons
      updateToolbarState(
        'fontColor',
        $getSelectionStyleValueForProperty(selection, 'color', '#000')
      );
      updateToolbarState(
        'bgColor',
        $getSelectionStyleValueForProperty(
          selection,
          'background-color',
          '#fff'
        )
      );
      updateToolbarState(
        'fontFamily',
        $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial')
      );
      let matchingParent;
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline()
        );
      }

      // If matchingParent is a valid node, pass it's format type
      updateToolbarState(
        'elementFormat',
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
          ? node.getFormatType()
          : parent?.getFormatType() || 'left'
      );
    }
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      // Update text format
      updateToolbarState('isBold', selection.hasFormat('bold'));
      updateToolbarState('isItalic', selection.hasFormat('italic'));
      updateToolbarState('isUnderline', selection.hasFormat('underline'));
      updateToolbarState(
        'isStrikethrough',
        selection.hasFormat('strikethrough')
      );
      updateToolbarState('isSubscript', selection.hasFormat('subscript'));
      updateToolbarState('isSuperscript', selection.hasFormat('superscript'));
      updateToolbarState('isHighlight', selection.hasFormat('highlight'));
      updateToolbarState('isCode', selection.hasFormat('code'));
      updateToolbarState(
        'fontSize',
        $getSelectionStyleValueForProperty(selection, 'font-size', '15px')
      );
      updateToolbarState('isLowercase', selection.hasFormat('lowercase'));
      updateToolbarState('isUppercase', selection.hasFormat('uppercase'));
      updateToolbarState('isCapitalize', selection.hasFormat('capitalize'));
    }
  }, [activeEditor, editor, updateToolbarState]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        $updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, $updateToolbar, setActiveEditor]);

  useEffect(() => {
    activeEditor.getEditorState().read(() => {
      $updateToolbar();
    });
  }, [activeEditor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          updateToolbarState('canUndo', payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          updateToolbarState('canRedo', payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [$updateToolbar, activeEditor, editor, updateToolbarState]);

  const applyStyleText = useCallback(
    (styles: Record<string, string>, skipHistoryStack?: boolean) => {
      activeEditor.update(
        () => {
          const selection = $getSelection();
          if (selection !== null) {
            $patchStyleText(selection, styles);
          }
        },
        skipHistoryStack ? { tag: HISTORIC_TAG } : {}
      );
    },
    [activeEditor]
  );

  const onFontColorSelect = useCallback(
    (value: string, skipHistoryStack: boolean) => {
      applyStyleText({ color: value }, skipHistoryStack);
    },
    [applyStyleText]
  );

  const onBgColorSelect = useCallback(
    (value: string, skipHistoryStack: boolean) => {
      applyStyleText({ 'background-color': value }, skipHistoryStack);
    },
    [applyStyleText]
  );

  const insertLink = useCallback(() => {
    if (!toolbarState.isLink) {
      setIsLinkEditMode(true);
      activeEditor.dispatchCommand(
        TOGGLE_LINK_COMMAND,
        sanitizeUrl('https://')
      );
    } else {
      setIsLinkEditMode(false);
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [activeEditor, setIsLinkEditMode, toolbarState.isLink]);

  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [activeEditor, selectedElementKey]
  );

  const canViewerSeeInsertDropdown = !toolbarState.isImageCaption;
  const canViewerSeeInsertCodeButton = !toolbarState.isImageCaption;

  const toolbarStyles: Styles = {
    '--boldColor': toolbarState.isBold ? colors.secondary : colors.primary,
  };

  return (
    <div className="toolbar" style={toolbarStyles}>
      <Button
        disabled={!toolbarState.canUndo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        title={IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <i className="format undo" />
      </Button>
      <Button
        disabled={!toolbarState.canRedo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        title={IS_APPLE ? 'Redo (⇧⌘Z)' : 'Redo (Ctrl+Y)'}
        className="toolbar-item"
        aria-label="Redo"
      >
        <i className="format redo" />
      </Button>
      <Divider type="vertical" className={styles.divider} />
      {toolbarState.blockType in blockTypeToBlockName &&
        activeEditor === editor && (
          <>
            <BlockFormatDropDown
              disabled={!isEditable}
              blockType={toolbarState.blockType}
              rootType={toolbarState.rootType}
              editor={activeEditor}
            />
          </>
        )}
      {toolbarState.blockType === 'code' ? (
        <DropDown
          disabled={!isEditable}
          buttonClassName="toolbar-item code-language"
          buttonLabel={getLanguageFriendlyName(toolbarState.codeLanguage)}
          buttonAriaLabel="Select language"
        >
          {CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
            return (
              <DropDownItem
                className={`item ${dropDownActiveClass(
                  value === toolbarState.codeLanguage
                )}`}
                onClick={() => onCodeLanguageSelect(value)}
                key={value}
              >
                <Typography.Text className="text">{name}</Typography.Text>
              </DropDownItem>
            );
          })}
        </DropDown>
      ) : (
        <>
          <FontDropDown
            disabled={!isEditable}
            style={'font-family'}
            value={toolbarState.fontFamily}
            editor={activeEditor}
          />
          <Divider type="vertical" className={styles.divider} />
          <FontSize
            selectionFontSize={toolbarState.fontSize.slice(0, -2)}
            editor={activeEditor}
            disabled={!isEditable}
          />
          <Divider type="vertical" className={styles.divider} />
          <Button
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
            }}
            className={cn(styles.button, styles.bold)}
            title={`Bold (${SHORTCUTS.BOLD})`}
            aria-label={`Format text as bold. Shortcut: ${SHORTCUTS.BOLD}`}
          >
            <BoldIcon
              fill={toolbarState.isBold ? colors.secondary : colors.white}
            />
          </Button>
          <Button
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
            }}
            className={
              'toolbar-item spaced ' + (toolbarState.isItalic ? 'active' : '')
            }
            title={`Italic (${SHORTCUTS.ITALIC})`}
            aria-label={`Format text as italics. Shortcut: ${SHORTCUTS.ITALIC}`}
          >
            <i className="format italic" />
          </Button>
          <Button
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
            }}
            className={
              'toolbar-item spaced ' +
              (toolbarState.isUnderline ? 'active' : '')
            }
            title={`Underline (${SHORTCUTS.UNDERLINE})`}
            aria-label={`Format text to underlined. Shortcut: ${SHORTCUTS.UNDERLINE}`}
          >
            <i className="format underline" />
          </Button>
          {canViewerSeeInsertCodeButton && (
            <Button
              disabled={!isEditable}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
              }}
              className={
                'toolbar-item spaced ' + (toolbarState.isCode ? 'active' : '')
              }
              title={`Insert code block (${SHORTCUTS.INSERT_CODE_BLOCK})`}
              aria-label="Insert code block"
            >
              <i className="format code" />
            </Button>
          )}
          <Button
            disabled={!isEditable}
            onClick={insertLink}
            className={
              'toolbar-item spaced ' + (toolbarState.isLink ? 'active' : '')
            }
            aria-label="Insert link"
            title={`Insert link (${SHORTCUTS.INSERT_LINK})`}
          >
            <i className="format link" />
          </Button>
          <DropdownColorPicker
            disabled={!isEditable}
            buttonClassName="toolbar-item color-picker"
            buttonAriaLabel="Formatting text color"
            buttonIconClassName="icon font-color"
            color={toolbarState.fontColor}
            onChange={onFontColorSelect}
            title="text color"
          />
          <DropdownColorPicker
            disabled={!isEditable}
            buttonClassName="toolbar-item color-picker"
            buttonAriaLabel="Formatting background color"
            buttonIconClassName="icon bg-color"
            color={toolbarState.bgColor}
            onChange={onBgColorSelect}
            title="bg color"
          />
          <DropDown
            disabled={!isEditable}
            buttonClassName="toolbar-item spaced"
            buttonLabel=""
            buttonAriaLabel="Formatting options for additional text styles"
            buttonIconClassName="icon dropdown-more"
          >
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'lowercase');
              }}
              className={
                'item wide ' + dropDownActiveClass(toolbarState.isLowercase)
              }
              title="Lowercase"
              aria-label="Format text to lowercase"
            >
              <div className="icon-text-container">
                <i className="icon lowercase" />
                <Typography.Text className="text">Lowercase</Typography.Text>
              </div>
              <Typography.Text className="shortcut">
                {SHORTCUTS.LOWERCASE}
              </Typography.Text>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'uppercase');
              }}
              className={
                'item wide ' + dropDownActiveClass(toolbarState.isUppercase)
              }
              title="Uppercase"
              aria-label="Format text to uppercase"
            >
              <div className="icon-text-container">
                <i className="icon uppercase" />
                <Typography.Text className="text">Uppercase</Typography.Text>
              </div>
              <Typography.Text className="shortcut">
                {SHORTCUTS.UPPERCASE}
              </Typography.Text>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'capitalize');
              }}
              className={
                'item wide ' + dropDownActiveClass(toolbarState.isCapitalize)
              }
              title="Capitalize"
              aria-label="Format text to capitalize"
            >
              <div className="icon-text-container">
                <i className="icon capitalize" />
                <Typography.Text className="text">Capitalize</Typography.Text>
              </div>
              <Typography.Text className="shortcut">
                {SHORTCUTS.CAPITALIZE}
              </Typography.Text>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(
                  FORMAT_TEXT_COMMAND,
                  'strikethrough'
                );
              }}
              className={
                'item wide ' + dropDownActiveClass(toolbarState.isStrikethrough)
              }
              title="Strikethrough"
              aria-label="Format text with a strikethrough"
            >
              <div className="icon-text-container">
                <i className="icon strikethrough" />
                <Typography.Text className="text">
                  Strikethrough
                </Typography.Text>
              </div>
              <Typography.Text className="shortcut">
                {SHORTCUTS.STRIKETHROUGH}
              </Typography.Text>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
              }}
              className={
                'item wide ' + dropDownActiveClass(toolbarState.isSubscript)
              }
              title="Subscript"
              aria-label="Format text with a subscript"
            >
              <div className="icon-text-container">
                <i className="icon subscript" />
                <Typography.Text className="text">Subscript</Typography.Text>
              </div>
              <Typography.Text className="shortcut">
                {SHORTCUTS.SUBSCRIPT}
              </Typography.Text>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(
                  FORMAT_TEXT_COMMAND,
                  'superscript'
                );
              }}
              className={
                'item wide ' + dropDownActiveClass(toolbarState.isSuperscript)
              }
              title="Superscript"
              aria-label="Format text with a superscript"
            >
              <div className="icon-text-container">
                <i className="icon superscript" />
                <Typography.Text className="text">Superscript</Typography.Text>
              </div>
              <Typography.Text className="shortcut">
                {SHORTCUTS.SUPERSCRIPT}
              </Typography.Text>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight');
              }}
              className={
                'item wide ' + dropDownActiveClass(toolbarState.isHighlight)
              }
              title="Highlight"
              aria-label="Format text with a highlight"
            >
              <div className="icon-text-container">
                <i className="icon highlight" />
                <Typography.Text className="text">Highlight</Typography.Text>
              </div>
            </DropDownItem>
          </DropDown>
          {canViewerSeeInsertDropdown && (
            <>
              <Divider type="vertical" className={styles.divider} />
              <DropDown
                disabled={!isEditable}
                buttonClassName="toolbar-item spaced"
                buttonLabel="Insert"
                buttonAriaLabel="Insert specialized editor node"
                buttonIconClassName="icon plus"
              >
                <DropDownItem
                  onClick={() => {
                    activeEditor.dispatchCommand(
                      INSERT_HORIZONTAL_RULE_COMMAND,
                      undefined
                    );
                  }}
                  className="item"
                >
                  <i className="icon horizontal-rule" />
                  <Typography.Text className="text">
                    Horizontal Rule
                  </Typography.Text>
                </DropDownItem>

                <DropDownItem
                  onClick={() => {
                    showModal('Insert Image', (onClose) => (
                      <InsertImageDialog
                        activeEditor={activeEditor}
                        onClose={onClose}
                      />
                    ));
                  }}
                  className="item"
                >
                  <i className="icon image" />
                  <Typography.Text className="text">Image</Typography.Text>
                </DropDownItem>
                <DropDownItem
                  onClick={() => {
                    showModal('Insert Table', (onClose) => (
                      <InsertTableDialog
                        activeEditor={activeEditor}
                        onClose={onClose}
                      />
                    ));
                  }}
                  className="item"
                >
                  <i className="icon table" />
                  <Typography.Text className="text">Table</Typography.Text>
                </DropDownItem>
                <DropDownItem
                  onClick={() => {
                    editor.dispatchCommand(
                      INSERT_COLLAPSIBLE_COMMAND,
                      undefined
                    );
                  }}
                  className="item"
                >
                  <i className="icon caret-right" />
                  <Typography.Text className="text">
                    Collapsible container
                  </Typography.Text>
                </DropDownItem>
                {EmbedConfigs.map((embedConfig) => (
                  <DropDownItem
                    key={embedConfig.type}
                    onClick={() => {
                      activeEditor.dispatchCommand(
                        INSERT_EMBED_COMMAND,
                        embedConfig.type
                      );
                    }}
                    className="item"
                  >
                    {embedConfig.icon}
                    <Typography.Text className="text">
                      {embedConfig.contentName}
                    </Typography.Text>
                  </DropDownItem>
                ))}
              </DropDown>
            </>
          )}
        </>
      )}
      <Divider type="vertical" className={styles.divider} />
      <ElementFormatDropdown
        disabled={!isEditable}
        value={toolbarState.elementFormat}
        editor={activeEditor}
        isRTL={toolbarState.isRTL}
      />

      {modal}
    </div>
  );
}
