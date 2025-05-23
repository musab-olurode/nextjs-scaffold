import { helloKeys } from '@/lib/api/queryKeys';
import { getHello } from '@/lib/api/requests/hello';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useHello = (
	options?: Partial<UseQueryOptions<unknown, AxiosError, string, string[]>>,
) => {
	return useQuery({
		queryKey: [helloKeys.read],
		queryFn: getHello,
		...options,
	});
};
