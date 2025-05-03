import { memo, useCallback, useState } from 'react';
import { Button, Flex, List } from 'antd';

import styles from './styles.module.scss';

import { ListItem } from '@/shared/model';
import { BaseNode } from '@/shared/ui/BaseNode/BaseNode';
import { TextArea } from '@/shared/ui/TextArea/TextArea';
import { DeleteOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { NodeProps, useReactFlow } from '@xyflow/react';

export const ListNode = memo((props: NodeProps) => {
  const { data, id } = props;
  const { updateNodeData } = useReactFlow();

  const [collapsed, setCollapsed] = useState(false);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateNodeData(id, (prevData) => ({
        ...prevData,
        label: e.target.value,
      }));
    },
    [id, updateNodeData]
  );

  const handleItemChange = useCallback(
    (itemId: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateNodeData(id, (prev) => {
        const prevData = prev.data;
        const newItems = (prevData.items as ListItem[]).map((item) =>
          item.id === itemId ? { ...item, label: e.target.value } : item
        );
        return { ...prevData, items: newItems };
      });
    },
    [id, updateNodeData]
  );

  const handleItemDelete = useCallback(
    (itemId: string) => () => {
      updateNodeData(id, (prev) => {
        const prevData = prev.data;
        const newItems = (prevData.items as ListItem[]).filter(
          (item) => item.id !== itemId
        );
        return { ...prevData, items: newItems };
      });
    },
    [id, updateNodeData]
  );

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  const items = (data.items ?? []) as ListItem[];

  return (
    <BaseNode nodeProps={props} className={styles.listNode}>
      <Flex vertical className={styles.container}>
        <Flex justify="space-between" align="center">
          <TextArea
            value={String(data.label)}
            onChange={handleTitleChange}
            data={data}
          />
          <Button
            onClick={toggleCollapse}
            size="small"
            className={styles.button}
            icon={collapsed ? <RightOutlined /> : <DownOutlined />}
          />
        </Flex>

        {!collapsed && (
          <List className={styles.content}>
            {items.map((item) => (
              <List.Item key={item.id} className={styles.listItem}>
                <TextArea
                  value={String(item.label)}
                  onChange={handleItemChange(item.id)}
                />
                <Button
                  onClick={handleItemDelete(item.id)}
                  className={styles.button}
                  title="Удалить элемент"
                  icon={<DeleteOutlined className={styles.deleteIcon} />}
                />
              </List.Item>
            ))}
          </List>
        )}
      </Flex>
    </BaseNode>
  );
});
