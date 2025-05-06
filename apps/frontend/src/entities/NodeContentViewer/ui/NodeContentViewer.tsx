import { Divider, Typography } from 'antd';

import { NodeContentViewerProps } from '../model';
import styles from './styles.module.scss';

import { StatusSelect } from '@/shared/ui/StatusSelect/ui/StatusSelect';

const { Title, Paragraph, Link, Text } = Typography;

export const NodeContentViewer = ({ selectedNode }: NodeContentViewerProps) => {
  if (!selectedNode) return null;

  const description = (selectedNode?.data?.description as string) || '';
  const title = (selectedNode?.data?.title as string) || '';
  const linkTitle = (selectedNode?.data?.linkTitle as string) || '';
  const link = (selectedNode?.data?.link as string) || '';

  return (
    <div className={styles.viewer}>
      <StatusSelect />
      {title && <Title level={1}>{title}</Title>}

      {description && <Paragraph>{description}</Paragraph>}

      {link && (
        <>
          <Divider orientation="left">
            <Text>Ссылки</Text>
          </Divider>
          <div className={styles.linkSection}>
            <Link href={link} target="_blank" rel="noopener noreferrer">
              {linkTitle ?? 'Полезный ресурс'}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
