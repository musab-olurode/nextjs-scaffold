import {
	initialLoadingState,
	LoadingState,
} from '@/store/slices/loading-slice';

export type StoreState = LoadingState;

export const defaultState: StoreState = {
	...initialLoadingState,
};
