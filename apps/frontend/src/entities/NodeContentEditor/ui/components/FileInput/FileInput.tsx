import type { JSX } from 'react';
import { useState } from 'react';
import { Button, Flex, Typography, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

import styles from './styles.module.scss';

import { UploadOutlined } from '@ant-design/icons';

type Props = Readonly<{
  'data-test-id'?: string;
  accept?: string;
  label: string;
  onChange: (files: FileList | null) => void;
}>;

export function FileInput({
  accept,
  label,
  onChange,
  'data-test-id': dataTestId,
}: Props): JSX.Element {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList);

    const files = new DataTransfer();
    newFileList.forEach((file) => {
      if (file.originFileObj) {
        files.items.add(file.originFileObj);
      }
    });

    onChange(files.files.length ? files.files : null);
  };

  return (
    <Flex justify="space-between" align="center">
      <Typography.Text className={styles.label}>{label}</Typography.Text>
      <Upload
        accept={accept}
        fileList={fileList}
        listType="picture"
        beforeUpload={() => false}
        onChange={handleChange}
        data-test-id={dataTestId}
      >
        <Button>
          <UploadOutlined /> Загрузить файл
        </Button>
      </Upload>
    </Flex>
  );
}
