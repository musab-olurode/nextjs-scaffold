'use client';

import {
	isServer,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ThemeProvider } from '~/components/common/theme-provider';
import { useToast } from '~/hooks/use-toast';
import { FailureResponse, SuccessResponse } from '~/lib/api/types';

function makeQueryClient() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { toast } = useToast();

	function handleOnRequestError(error: AxiosError<FailureResponse> | Error) {
		const errorTitle =
			(error as AxiosError<FailureResponse>).response?.data.error ||
			'Uh oh! Something went wrong.';
		const errorMessage =
			(error as AxiosError<FailureResponse>).response?.data.message ||
			error.message ||
			'There was a problem with your request.';
		toast({
			variant: 'destructive',
			title: errorTitle,
			description: errorMessage,
		});
	}

	function handleOnRequestSuccess(data: unknown) {
		toast({
			description: (data as SuccessResponse<unknown>).message,
		});
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
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			enableSystem
			disableTransitionOnChange
		>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ThemeProvider>
	);
}
