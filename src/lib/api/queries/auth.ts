import { authKeys } from '@/lib/api/queryKeys';
import { getAuthUser } from '@/lib/api/requests/auth';
import { AuthData, SuccessResponse } from '@/lib/api/types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetAuthUser = (
	options?: Partial<
		UseQueryOptions<unknown, AxiosError, SuccessResponse<AuthData>, string[]>
	>,
) => {
	return useQuery({
		queryKey: [authKeys.read],
		queryFn: getAuthUser,
		...options,
	});
};
