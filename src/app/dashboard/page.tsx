import { authKeys, helloKeys } from '@/lib/api/queryKeys';
import { getHello } from '@/lib/api/requests/hello';
import { getServerSession } from '@/lib/server-utils';

import HelloWord from '@/components/features/homepage/hello-word';

import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';

export default async function Dashboard() {
	const queryClient = new QueryClient();

	await Promise.all([
		queryClient.prefetchQuery({
			queryKey: [helloKeys.read],
			queryFn: getHello,
		}),
		queryClient.prefetchQuery({
			queryKey: [authKeys.read],
			queryFn: getServerSession,
		}),
	]);

	return (
		<>
			<main className='flex min-h-screen items-center justify-center'>
				<HydrationBoundary state={dehydrate(queryClient)}>
					<HelloWord />
				</HydrationBoundary>
			</main>
		</>
	);
}
