import { getUserCanvasById } from '../../api';

import { useQuery } from '@tanstack/react-query';

export const useCanvas = (id: string) => {
  return useQuery({
    queryKey: ['getCanvas', id],
    queryFn: () => getUserCanvasById(id),
  });
};
