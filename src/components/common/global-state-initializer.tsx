import { useLoadingState } from '~/lib/api/state/loading';

export const GlobalStateInitializer = () => {
	useLoadingState();

	return null;
};
