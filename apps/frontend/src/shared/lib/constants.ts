import { TextNode } from '@/entities/Nodes/Text/ui/TextNode';
import { Position } from '@xyflow/react';
import styles from '../ui/BaseNode/styles.module.scss';
import { BaseEdge } from '../ui/BaseEdge/BaseEdge';
import { NoteNode } from '@/entities/Nodes/Note/ui/Note';
import { ListNode } from '@/entities/Nodes/List/ui/List';
import { NodeStatus } from '../model';
import { colors } from '../styles/theme';

export const nodeTypes = {
  Text: TextNode,
  Note: NoteNode,
  List: ListNode,
};

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
