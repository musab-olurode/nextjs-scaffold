import { authKeys } from '@/lib/api/queryKeys';
import { getSession } from '@/lib/api/requests/auth';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useSession = (
	options?: Partial<
		UseQueryOptions<
			unknown,
			AxiosError,
			Awaited<ReturnType<typeof getSession>>,
			string[]
		>
	>,
) => {
	return useQuery({
		queryKey: [authKeys.read],
		queryFn: getSession,
		...options,
	});
};
