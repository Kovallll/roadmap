import { Input, Typography } from 'antd';

import { NodeContentEditorProps } from '../model';
import styles from './styles.module.scss';

import { TextArea } from '@/shared/ui/TextArea/TextArea';

export const NodeContentEditor = ({
  selectedNode,
  handleUpdate,
}: NodeContentEditorProps) => {
  if (!selectedNode) return null;

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleUpdate('description', e.target.value);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdate('title', e.target.value);
  };

  const handleChangeLinkTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdate('linkTitle', e.target.value);
  };

  const handleChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdate('link', e.target.value);
  };

  const description = (selectedNode?.data?.description as string) || '';
  const title = (selectedNode?.data?.title as string) || '';
  const linkTitle = (selectedNode?.data?.linkTitle as string) || '';
  const link = (selectedNode?.data?.link as string) || '';

  return (
    <div className={styles.field}>
      <Typography.Text className={styles.label}>Заголовок</Typography.Text>
      <Input
        value={title}
        onChange={handleChangeTitle}
        placeholder="Добавьте заголовок"
        className={styles.title}
      />
      <Typography.Text className={styles.label}>Описание</Typography.Text>
      <TextArea
        value={description}
        onChange={handleChangeDescription}
        placeholder="Добавьте описание"
        className={styles.description}
      />

      <Typography.Text className={styles.label}>
        Заголовок ссылки
      </Typography.Text>
      <Input
        value={linkTitle}
        onChange={handleChangeLinkTitle}
        placeholder="Заголовок"
        className={styles.title}
      />
      <Typography.Text className={styles.label}>Ссылка</Typography.Text>
      <Input
        value={link}
        onChange={handleChangeLink}
        placeholder="Ссылка на внешний ресурс"
        className={styles.title}
      />
    </div>
  );
};
