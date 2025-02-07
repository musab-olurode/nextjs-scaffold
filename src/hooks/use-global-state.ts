import { STATE_QUERY_OPTIONS } from '~/lib/constants';

import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useGlobalState = <T>(queryKey: string) => {
	const queryClient = useQueryClient();
	const { data: state } = useQuery({
		queryKey: [queryKey],
		initialData: () => {
			return queryClient.getQueryData([queryKey]) as T;
		},
		...STATE_QUERY_OPTIONS,
	});

	const updateState = (update: Partial<T>) => {
		queryClient.setQueryData([queryKey], (prev: T) => ({
			...prev,
			...update,
		}));
	};

	return {
		state: state as T,
		updateState,
	};
};
