'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';

import { createAppStore, initStore, Store } from '@/store';

import { type StoreApi, useStore as useZustandStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

export const AppStoreContext = createContext<StoreApi<Store> | null>(null);

export interface AppStoreProviderProps {
	children: ReactNode;
}

export const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
	const storeRef = useRef<StoreApi<Store>>(null);

	storeRef.current ??= createAppStore(initStore());

	return (
		<AppStoreContext.Provider value={storeRef.current}>
			{children}
		</AppStoreContext.Provider>
	);
};

export const useStoreSelector = <T,>(selector: (store: Store) => T): T => {
	const appStoreContext = useContext(AppStoreContext);

	if (!appStoreContext) {
		throw new Error('useStoreSelector must be use within AppStoreProvider');
	}

	return useZustandStore(appStoreContext, useShallow(selector));
};
