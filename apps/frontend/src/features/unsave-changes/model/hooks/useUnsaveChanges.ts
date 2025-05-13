import { useCallback } from 'react';
import { unstable_usePrompt, useBeforeUnload } from 'react-router-dom';

export const useUnsaveChanges = (when = true) => {
  unstable_usePrompt({
    when,
    message: 'У вас есть несохранённые изменения. Покинуть страницу?',
  });

  useBeforeUnload(
    useCallback(
      (e: BeforeUnloadEvent) => {
        if (when) {
          e.preventDefault();
          e.returnValue =
            'У вас есть несохраненные изменения. Вы уверены, что хотите уйти?';
        }
      },
      [when]
    ),
    { capture: true }
  );
};
