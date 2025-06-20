import type { JSX } from 'react';

import styles from './styles.module.scss';

import './ContentEditable.css';
import { ContentEditable as LexicalContentEditable } from '@lexical/react/LexicalContentEditable';

type Props = {
  className?: string;
  placeholderClassName?: string;
  placeholder: string;
};

export function ContentEditable({
  className,
  placeholder,
  placeholderClassName,
}: Props): JSX.Element {
  return (
    <LexicalContentEditable
      className={className ?? styles.contentEditable}
      aria-placeholder={placeholder}
      placeholder={
        <div className={placeholderClassName ?? 'ContentEditable__placeholder'}>
          {placeholder}
        </div>
      }
    />
  );
}
