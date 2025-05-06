import { Tabs } from 'antd';

import styles from './styles.module.scss';

import { NodeContentEditor } from '@/entities/NodeContentEditor/ui/NodeContentEditor';
import { NodeContentViewer } from '@/entities/NodeContentViewer/ui/NodeContentViewer';
import { NodePropsEditor } from '@/entities/NodePropsEditor/ui/NodePropsEditor';
import { Sidebar } from '@/entities/Sidebar/ui/Sidebar';
import { selectedNodeStore, useCanvasStore } from '@/shared/model/store';
import { useReactFlow } from '@xyflow/react';

export const NodeSidebar = () => {
  const { selectedNode, setSelectedNode } = selectedNodeStore();
  const { updateNode } = useReactFlow();

  const isEdit = useCanvasStore.use.isEdit();

  if (!selectedNode) return null;

  const handleUpdate = (
    field: string,
    value: string | number | null | object
  ) => {
    updateNode(selectedNode.id, (prev) => {
      const newData = {
        ...prev.data,
        [field]: value,
      };
      setSelectedNode({ ...selectedNode, data: newData });
      return {
        data: newData,
      };
    });
  };

  const tabs = [
    {
      key: 'props',
      label: 'Свойства',
      children: (
        <NodePropsEditor
          selectedNode={selectedNode}
          handleUpdate={handleUpdate}
        />
      ),
    },
    {
      key: 'content',
      label: 'Контент',
      children: (
        <NodeContentEditor
          selectedNode={selectedNode}
          handleUpdate={handleUpdate}
        />
      ),
    },
  ];

  const width = isEdit ? 200 : 500;
  const title = isEdit ? 'Редактирование узла' : '';

  return (
    <Sidebar title={title} className={styles.sidebar} width={width}>
      {isEdit ? (
        <Tabs defaultActiveKey="code" items={tabs} />
      ) : (
        <NodeContentViewer selectedNode={selectedNode} />
      )}
    </Sidebar>
  );
};
