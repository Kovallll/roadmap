import { type ShowFlashMessage, useFlashMessageContext } from '../../model';

export const useFlashMessage = (): ShowFlashMessage => {
  return useFlashMessageContext();
};
