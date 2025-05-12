import { AlignTypes, NodeStatus } from '../model';
import { colors } from '../styles/theme';
import { BaseEdge } from '../ui/BaseEdge/BaseEdge';
import styles from '../ui/BaseNode/styles.module.scss';

import { NoteNode } from '@/entities/Nodes/Note/ui/Note';
import { TextNode } from '@/entities/Nodes/Text/ui/TextNode';
import { Position } from '@xyflow/react';

export const nodeTypes = {
  Text: TextNode,
  Note: NoteNode,
};

export const defaultNodeWidth = 100;
export const defaultNodeHeight = 'auto';

export const nodeStatuses = [
  { color: colors.success, value: NodeStatus.DONE },
  { color: colors.secondary, value: NodeStatus.IN_PROGRESS },
  { color: colors.disabled, value: NodeStatus.PENDING },
  { color: colors.black, value: NodeStatus.CLOSE },
];

export const edgeTypes = {
  custom: BaseEdge,
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

export const textAlignMap: Record<string, 'left' | 'center' | 'right'> = {
  [AlignTypes.START]: 'left',
  [AlignTypes.CENTER]: 'center',
  [AlignTypes.END]: 'right',
};
