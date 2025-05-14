import type { JSX } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { Modal, Typography } from 'antd';

export const useModal = (): [
  JSX.Element | null,
  (title: string, showModal: (onClose: () => void) => JSX.Element) => void
] => {
  const [modalContent, setModalContent] = useState<null | {
    content: JSX.Element;
    title: string;
  }>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = useCallback(() => {
    setModalContent(null);
    setIsOpen(false);
  }, []);

  const showModal = useCallback(
    (title: string, getContent: (onClose: () => void) => JSX.Element) => {
      setModalContent({
        content: getContent(onClose),
        title,
      });
      setIsOpen(true);
    },
    [onClose]
  );

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null;
    }
    const { title, content } = modalContent;

    return (
      <Modal
        open={isOpen}
        onCancel={onClose}
        onClose={onClose}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <Typography.Title style={{ color: 'black' }}>{title}</Typography.Title>
        {content}
      </Modal>
    );
  }, [isOpen, modalContent, onClose]);

  return [modal, showModal];
};
