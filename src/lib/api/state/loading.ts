import { loadingKeys } from '~/lib/api/queryKeys';
import { STATE_QUERY_OPTIONS } from '~/lib/constants';
import { DEFAULT_LOADING_STATE } from '~/lib/constants/state';

import { useQuery } from '@tanstack/react-query';

export const useLoadingState = () => {
	const query = useQuery({
		queryKey: [loadingKeys.state],
		initialData: DEFAULT_LOADING_STATE,
		...STATE_QUERY_OPTIONS,
	});

	return query.data;
};
