import { getUser } from '../../api';

import { useQuery } from '@tanstack/react-query';

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['getUser', id],
    queryFn: () => getUser(id),
  });
};
