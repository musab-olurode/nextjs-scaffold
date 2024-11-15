import '~/styles/globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '~/lib/utils';
import Providers from '~/app/providers';
import { Toaster } from '~/components/ui/toaster';

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
		<html lang='en' suppressHydrationWarning>
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
