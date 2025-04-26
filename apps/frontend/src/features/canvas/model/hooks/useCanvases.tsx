import { getUserCanvases } from '../../api';

import { useQuery } from '@tanstack/react-query';

export const useCanvases = (userId: string) => {
  return useQuery({
    queryKey: ['getCanvases'],
    queryFn: () => getUserCanvases(userId),
  });
};
