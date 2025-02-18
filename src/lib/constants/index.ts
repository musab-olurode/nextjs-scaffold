export const QUERY_CACHE_TIME = 1000 * 60 * 5; // 5 minutes
export const CACHED_QUERY_OPTIONS = {
	staleTime: QUERY_CACHE_TIME,
	// Override to fail silently
	throwOnError() {
		return false;
	},
};

export const INFINITE_QUERY_PAGER_OPTIONS = {
	initialPageParam: 0,
	getNextPageParam: (
		lastPage: object[],
		allPages: object[][],
		lastPageParam: number,
	) => {
		if (lastPage.length === 0) {
			return undefined;
		}

		return lastPageParam + 1;
	},
	getPreviousPageParam: (
		firstPage: object[],
		allPages: object[][],
		firstPageParam: number,
	) => {
		if (firstPageParam <= 1) {
			return undefined;
		}

		return firstPageParam - 1;
	},
};
