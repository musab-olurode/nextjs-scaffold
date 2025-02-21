'use client';

import { ThemeProvider } from '@/components/common/theme-provider';
import { FailureResponse, SuccessResponse } from '@/lib/api/types';
import { AppStoreProvider } from '@/store/store-provider';

import {
	isServer,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

function makeQueryClient() {
	function handleOnRequestError(error: AxiosError<FailureResponse> | Error) {
		const errorTitle =
			(error as AxiosError<FailureResponse>).response?.data.error ||
			'Uh oh! Something went wrong.';
		const errorMessage =
			(error as AxiosError<FailureResponse>).response?.data.message ||
			error.message ||
			'There was a problem with your request.';

		toast.error(errorTitle, {
			description: errorMessage,
		});
	}

	function handleOnRequestSuccess(data: unknown) {
		toast.success((data as SuccessResponse<unknown>).message);
	}

	return new QueryClient({
		defaultOptions: {
			mutations: {
				onError: handleOnRequestError,
				onSuccess: handleOnRequestSuccess,
			},
		},
		queryCache: new QueryCache({
			onError: (error) => handleOnRequestError(error),
		}),
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (isServer) {
		return makeQueryClient();
	}
	if (!browserQueryClient) browserQueryClient = makeQueryClient();

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
				</QueryClientProvider>
			</AppStoreProvider>
		</ThemeProvider>
	);
}
