import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { helloKeys } from '~/lib/api/queryKeys';
import { getHello } from '~/lib/api/requests/hello';
import { AuthData, SuccessResponse } from '~/lib/api/types';

export const useGetHello = (
	options?: Partial<UseQueryOptions<unknown, AxiosError, string, string[]>>,
) => {
	return useQuery({
		queryKey: [helloKeys.read],
		queryFn: getHello,
		...options,
	});
};
