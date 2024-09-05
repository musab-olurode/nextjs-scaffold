import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import HelloWord from '~/components/pages/home/hello-word';
import { helloKeys } from '~/lib/api/queryKeys';
import { getHello } from '~/lib/api/requests/hello';

export default async function Home() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: [helloKeys.read],
		queryFn: getHello,
	});

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