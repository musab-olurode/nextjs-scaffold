'use client';

import { BetterAuthError, FailureResponse } from '@/lib/api/types';
import { AppStoreProvider } from '@/store/store-provider';

import { ThemeProvider } from '@/components/common/theme-provider';

import {
	isServer,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

function makeQueryClient() {
	function handleOnRequestError(
		error: BetterAuthError | AxiosError<FailureResponse> | Error,
	) {
		let errorTitle = 'Uh oh! Something went wrong.';
		let errorMessage =
			error.message || 'There was a problem with your request.';

		if (error instanceof AxiosError) {
			errorTitle = error.response?.data.error ?? errorTitle;
			errorMessage = error.response?.data.message ?? errorMessage;
		} else if ('error' in error) {
			errorTitle = error.error.error;
			errorMessage = error.error.message;
		}

		toast.error(errorTitle, {
			description: errorMessage,
		});
	}

	function handleOnRequestSuccess(data: unknown) {
		toast.success(
			(data as { message: string | undefined }).message ?? 'Success',
		);
	}

	return new QueryClient({
		defaultOptions: {
			mutations: {
				onError: handleOnRequestError,
				onSuccess: handleOnRequestSuccess,
			},
		},
		queryCache: new QueryCache({
			onError: (error) => {
				handleOnRequestError(error);
			},
		}),
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (isServer) {
		return makeQueryClient();
	}
	browserQueryClient ??= makeQueryClient();

	return browserQueryClient;
}

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<ThemeProvider
			disableTransitionOnChange
			enableSystem
			attribute='class'
			defaultTheme='system'
		>
			<AppStoreProvider>
				<QueryClientProvider client={queryClient}>
					{children}
					{process.env.NODE_ENV !== 'production' && <ReactQueryDevtools />}
				</QueryClientProvider>
			</AppStoreProvider>
		</ThemeProvider>
	);
}
