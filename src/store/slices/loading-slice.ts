import { StateCreator } from 'zustand';

export type LoadingState = {
	isLoading: boolean;
};

export type LoadingActions = {
	setIsLoading: (isLoading: boolean) => void;
};

export type LoadingSlice = LoadingState & LoadingActions;

export const initialLoadingState: LoadingState = {
	isLoading: false,
};

export const createLoadingSlice: StateCreator<
	LoadingSlice,
	[],
	[],
	LoadingSlice
> = (set) => ({
	...initialLoadingState,
	setIsLoading: (isLoading: boolean) => {
		set({ isLoading });
	},
});
