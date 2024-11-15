import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { loadingKeys } from '~/lib/api/queryKeys';
import { STATE_QUERY_OPTIONS } from '~/lib/constants';

export const useLoadingState = (
	options?: Partial<
		UseQueryOptions<unknown, unknown, { loading: boolean }, string[]>
	>,
) => {
	return useQuery({
		queryKey: [loadingKeys.state],
		queryFn: () => ({ loading: false }),
		...options,
		...STATE_QUERY_OPTIONS,
	});
};
