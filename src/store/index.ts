import { defaultState, StoreState } from '@/store/default-state';
import { createLoadingSlice, LoadingSlice } from '@/store/slices/loading-slice';

import { createStore } from 'zustand/vanilla';

export type Store = LoadingSlice;

export const initStore = (): StoreState => {
	return defaultState;
};

export const createAppStore = (initState: StoreState = defaultState) => {
	return createStore<Store>()((...a) => ({
		...initState,
		...createLoadingSlice(...a),
	}));
};
