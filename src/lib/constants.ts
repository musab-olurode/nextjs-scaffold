export const STATE_QUERY_OPTIONS = {
	refetchOnMount: false,
	refetchOnReconnect: false,
	refetchOnWindowFocus: false,
};
export const QUERY_CACHE_TIME = 1000 * 60 * 5; // 5 minutes
export const CACHED_QUERY_OPTIONS = {
	staleTime: QUERY_CACHE_TIME,
	// override to fail silently
	throwOnError() {
		return false;
	},
};
