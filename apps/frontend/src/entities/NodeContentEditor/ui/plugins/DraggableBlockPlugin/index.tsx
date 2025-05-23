import type { JSX } from 'react';
import { useRef, useState } from 'react';
import { Button } from 'antd';
import { $createParagraphNode, $getNearestNodeFromDOMNode } from 'lexical';
import DragIcon from 'public/images/icons/draggable-block-menu.svg?react';
import PlusIcon from 'public/images/icons/plus.svg?react';

import styles from './styles.module.scss';

import './index.css';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DraggableBlockPlugin_EXPERIMENTAL } from '@lexical/react/LexicalDraggableBlockPlugin';

const DRAGGABLE_BLOCK_MENU_CLASSNAME = 'draggable-block-menu';

function isOnMenu(element: HTMLElement): boolean {
  return !!element.closest(`.${DRAGGABLE_BLOCK_MENU_CLASSNAME}`);
}

export default function DraggableBlockPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const targetLineRef = useRef<HTMLDivElement | null>(null);
  const [draggableElement, setDraggableElement] = useState<HTMLElement | null>(
    null
  );

  function insertBlock(e: React.MouseEvent) {
    if (!draggableElement || !editor) {
      return;
    }

    editor.update(() => {
      const node = $getNearestNodeFromDOMNode(draggableElement);
      if (!node) {
        return;
      }

      const pNode = $createParagraphNode();
      if (e.altKey || e.ctrlKey) {
        node.insertBefore(pNode);
      } else {
        node.insertAfter(pNode);
      }
      pNode.select();
    });
  }

  return (
    <DraggableBlockPlugin_EXPERIMENTAL
      anchorElem={anchorElem}
      menuRef={menuRef as any}
      targetLineRef={targetLineRef as any}
      menuComponent={
        <div ref={menuRef} className="icon draggable-block-menu">
          <Button
            title="Click to add below"
            className={styles.draggableBlock}
            onClick={insertBlock}
          >
            <PlusIcon />
          </Button>
          <Button title="Click to add below" className={styles.draggableBlock}>
            <DragIcon />
          </Button>
        </div>
      }
      targetLineComponent={
        <div ref={targetLineRef} className="draggable-block-target-line" />
      }
      isOnMenu={isOnMenu}
      onElementChanged={setDraggableElement}
    />
  );
}
