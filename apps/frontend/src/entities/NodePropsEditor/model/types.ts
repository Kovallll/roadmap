import { Node } from '@xyflow/react';

export type NodePropsEditorProps = {
  selectedNode: Node | null;
  handleUpdate: (field: string, value: string | number | null) => void;
};
