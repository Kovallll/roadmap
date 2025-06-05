import { useEffect, useState } from 'react';
import { EditorState, SerializedEditorState } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CAN_USE_DOM } from '@lexical/utils';

export const useEditor = (
  editContent: (content: SerializedEditorState) => void,
  initialSerializedContent: SerializedEditorState
) => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    if (initialSerializedContent) {
      const parsed = editor.parseEditorState(initialSerializedContent);
      editor.setEditorState(parsed);
    }
  }, [initialSerializedContent, editor]);

  const onChange = (editorState: EditorState) => {
    const json = editorState.toJSON();
    editContent(json);
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener('resize', updateViewPortWidth);

    return () => {
      window.removeEventListener('resize', updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  return {
    onRef,
    onChange,
    floatingAnchorElem,
    isSmallWidthViewport,
    editor,
    activeEditor,
    setActiveEditor,
    isLinkEditMode,
    setIsLinkEditMode,
  };
};
