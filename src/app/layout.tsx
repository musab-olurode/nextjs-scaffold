import '@/styles/globals.css';
import Providers from '@/app/providers';
import { cn } from '@/lib/utils';

import TailwindBreakpointIndicator from '@/components/common/tailwind-breakpoint-indicator';
import { Toaster } from '@/components/ui/sonner';

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
				suppressHydrationWarning
				className={cn(
					'bg-background min-h-screen font-sans antialiased',
					fontSans.variable,
				)}
			>
				<TailwindBreakpointIndicator />
				<Providers>{children}</Providers>
				<Toaster />
			</body>
		</html>
	);
}
