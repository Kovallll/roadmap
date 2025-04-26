import { getUser } from '../../api';

import { useQuery } from '@tanstack/react-query';

export const useUser = (userName: string) => {
  return useQuery({
    queryKey: ['getUser', userName],
    queryFn: () => getUser(userName),
  });
};
