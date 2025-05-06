import { Node } from '@xyflow/react';

export type NodeContentEditorProps = {
  selectedNode: Node | null;
  handleUpdate: (field: string, value: string | number | null) => void;
};
