import { useEffect } from 'react';
import { ElementFormatType, LexicalEditor } from 'lexical';

import { DropDown } from '../../components/DropDown';
import { DropDownItem } from '../DropDownItem';
import styles from './styles.module.scss';

import {
  useToolbar,
  useToolbarState,
} from '@/entities/NodeContentEditor/model';

export const PositionFormatDropDown = ({
  editor,
}: {
  editor: LexicalEditor;
}) => {
  const { toolbarState, updateToolbarState } = useToolbarState();
  const { positionFormatOptions } = useToolbar();

  const option =
    positionFormatOptions.find(
      (item) => item.type === toolbarState.elementFormat
    ) ?? positionFormatOptions[0];

  useEffect(() => {
    updateToolbarState('elementFormat', option.type as ElementFormatType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const label = option?.title ?? 'Left Align';
  const PreviewIcon = option?.Icon;

  return (
    <DropDown
      buttonLabel={label}
      buttonIconClassName={styles.previewIcon}
      buttonAriaLabel="Formatting options for text alignment"
      iconComponent={PreviewIcon}
    >
      {positionFormatOptions.map((item) => (
        <DropDownItem
          onClick={() => {
            editor.dispatchCommand(
              item.dispatchCommand.type,
              item.dispatchCommand.payload
            );
            updateToolbarState('elementFormat', item.type as ElementFormatType);
          }}
          item={{ ...item, isActive: toolbarState.elementFormat === item.type }}
        />
      ))}
    </DropDown>
  );
};
