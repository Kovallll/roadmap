import { Drawer } from 'antd';
import { set } from 'lodash';

import { NodeSidebarProps } from '../model/types';
import styles from './styles.module.scss';

import { NodeContentViewer } from '@/entities/NodeContentViewer/ui/NodeContentViewer';
import { NodePropsEditor } from '@/entities/NodePropsEditor/ui/NodePropsEditor';
import { selectedNodeStore, useCanvasStore } from '@/shared/model/store';
import { useReactFlow } from '@xyflow/react';

export const NodeSidebar = ({ isOpen, handleChangeOpen }: NodeSidebarProps) => {
  const { selectedNode, setSelectedNode } = selectedNodeStore();
  const { updateNode } = useReactFlow();

  const isEdit = useCanvasStore.use.isEdit();

  if (!selectedNode) return null;

  const handleUpdate = (
    field: string,
    value: string | number | null | object
  ) => {
    updateNode(selectedNode.id, (prev) => {
      const newData = { ...prev.data };
      set(newData, field, value);
      setSelectedNode({ ...selectedNode, data: newData });
      return { data: newData };
    });
  };

  const onClose = () => {
    handleChangeOpen(false);
  };

  return (
    <Drawer
      placement={'right'}
      closable={false}
      onClose={onClose}
      width={isEdit ? 350 : 600}
      open={isOpen}
      className={styles.drawer}
      mask={false}
      keyboard
    >
      {isEdit ? (
        <NodePropsEditor handleUpdate={handleUpdate} onCloseDrawer={onClose} />
      ) : (
        <NodeContentViewer />
      )}
    </Drawer>
  );
};
