import { DropDown } from '../DropDown';
import { DropDownItem } from '../DropDownItem';

import { CODE_LANGUAGE_OPTIONS } from '@/entities/NodeContentEditor/lib';
import {
  CodeLanguageDropDownProps,
  useToolbarState,
} from '@/entities/NodeContentEditor/model';
import { getLanguageFriendlyName } from '@lexical/code';

export const CodeLanguageDropDown = ({
  onCodeLanguageSelect,
}: CodeLanguageDropDownProps) => {
  const { toolbarState } = useToolbarState();

  return (
    <DropDown
      buttonLabel={getLanguageFriendlyName(toolbarState.codeLanguage)}
      buttonAriaLabel="Select language"
    >
      {CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
        return (
          <DropDownItem
            onClick={() => onCodeLanguageSelect(value)}
            key={value}
            item={{
              title: name,
              isActive: value === toolbarState.codeLanguage,
            }}
          />
        );
      })}
    </DropDown>
  );
};
