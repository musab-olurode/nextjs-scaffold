import '~/styles/globals.css';
import Providers from '~/app/providers';
import { cn } from '~/lib/utils';

import { Toaster } from '~/components/ui/toaster';

import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'Nextjs and Nestjs scaffold',
	description: 'Nextjs and Nestjs fullstack scaffold',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning lang='en'>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable,
				)}
			>
				<Providers>{children}</Providers>
				<Toaster />
			</body>
		</html>
	);
}
