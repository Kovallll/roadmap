import CustomNode from '@/entities/CustomNode/ui/CustomNode';
import TextNode from '@/entities/TextNode/ui/TextNode';
import { Position } from '@xyflow/react';
import styles from '../ui/BaseNode/styles.module.scss';
import { BaseEdge } from '../ui/BaseEdge/BaseEdge';

export const nodeTypes = {
  customNode: CustomNode,
  textNode: TextNode,
};

export const edgeTypes = {
  baseEdge: BaseEdge,
};

export const nodeLabels = Object.keys(nodeTypes);
export const alignDiff = 5;

export const handles = [
  {
    position: Position.Right,
    id: 'right',
    className: styles.right,
  },
  {
    position: Position.Left,
    id: 'left',
    className: styles.left,
  },
  {
    position: Position.Top,
    id: 'top',
    className: styles.top,
  },
  {
    position: Position.Bottom,
    id: 'bottom',
    className: styles.bottom,
  },
];
