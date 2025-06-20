import PlusIcon from 'public/images/icons/plus.svg?react';

import { EmbedConfigs } from '../../plugins/AutoEmbedPlugin';
import { InsertImageDialog } from '../../plugins/ImagesPlugin';
import { InsertTableDialog } from '../../plugins/TablePlugin';
import { DropDown } from '../DropDown';
import { DropDownItem } from '../DropDownItem';

import {
  InsertDropDownProps,
  InsertOptionsType,
  useModal,
  useToolbar,
} from '@/entities/NodeContentEditor/model';
import { useTheme } from '@/shared/model';
import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin';

export const InsertDropDown = ({ activeEditor }: InsertDropDownProps) => {
  const [modal, showModal] = useModal();
  const { insertOptions } = useToolbar();
  const { colors } = useTheme();

  const handleClickInsertOption =
    (
      dispatchCommand: InsertOptionsType['dispatchCommand'],
      modalType: InsertOptionsType['modalType']
    ) =>
    () => {
      if (!modalType && !dispatchCommand) return;
      if (dispatchCommand) {
        activeEditor.dispatchCommand(
          dispatchCommand.type,
          dispatchCommand.payload
        );
      }
      switch (modalType) {
        case 'image': {
          showModal('Insert Image', (onClose) => (
            <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
          ));
          break;
        }
        case 'table': {
          showModal('Insert Table', (onClose) => (
            <InsertTableDialog activeEditor={activeEditor} onClose={onClose} />
          ));
          break;
        }
        default:
          break;
      }
    };

  return (
    <>
      <DropDown
        buttonLabel="Insert"
        buttonAriaLabel="Insert specialized editor node"
        buttonIconClassName="icon"
        iconComponent={<PlusIcon fill={colors.contrPrimary} />}
      >
        {insertOptions.map((item) => (
          <DropDownItem
            onClick={handleClickInsertOption(
              item.dispatchCommand,
              item.modalType
            )}
            item={item}
          />
        ))}
        {EmbedConfigs.map((item) => (
          <DropDownItem
            key={item.contentName}
            onClick={() => {
              activeEditor.dispatchCommand(INSERT_EMBED_COMMAND, item.type);
            }}
            item={{ title: item.contentName, Icon: item.icon }}
          />
        ))}
      </DropDown>
      {modal}
    </>
  );
};
