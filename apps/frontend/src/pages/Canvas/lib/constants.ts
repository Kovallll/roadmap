import CustomNode from '@/entities/CustomNode/ui/CustomNode';
import TextNode from '@/entities/TextNode/ui/TextNode';
import { Edge, Node } from '@xyflow/react';

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    type: 'default',
    data: { label: 'Default Node' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  {
    id: '4',
    type: 'customNode',
    data: { label: 'Custom Node' },
    position: { x: 400, y: 125 },
  },
];

export const nodeTypes = {
  customNode: CustomNode,
  textNode: TextNode,
};

export const nodeLabels = Object.keys(nodeTypes);
