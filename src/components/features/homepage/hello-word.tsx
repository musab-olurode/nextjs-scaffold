'use client';

import { useSignin, useSignout, useSignup } from '@/lib/api/mutations/auth';
import { useSession } from '@/lib/api/queries/auth';
import { useHello } from '@/lib/api/queries/hello';
import { authKeys } from '@/lib/api/queryKeys';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';

import { useQueryClient } from '@tanstack/react-query';
import { Moon, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

const DarkModeToggle = () => {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size='icon' variant='outline'>
					<Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
					<Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem
					onClick={() => {
						setTheme('light');
					}}
				>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						setTheme('dark');
					}}
				>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						setTheme('system');
					}}
				>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const HelloWord = () => {
	const queryClient = useQueryClient();
	const { data, isPending, isError, error } = useHello();
	const { data: session } = useSession();
	const { mutate: signup } = useSignup();
	const { mutate: signin } = useSignin({
		onSuccess: handleSessionChange,
	});
	const { mutate: signout } = useSignout({
		onSuccess: handleSessionChange,
	});
	const router = useRouter();

	function handleSessionChange() {
		void queryClient.invalidateQueries({ queryKey: [authKeys.read] });
		router.push('/dashboard');
	}

	if (isPending)
		return (
			<div className='flex items-center gap-x-2'>
				<Skeleton className='h-6 w-[5.76rem]' />
				<DarkModeToggle />
			</div>
		);

	if (isError)
		return (
			<div className='flex items-center gap-x-2'>
				{error.message} <DarkModeToggle />
			</div>
		);

	return (
		<div className='flex flex-col items-center justify-center gap-y-2'>
			<div className='flex items-center gap-x-2'>
				{data} <DarkModeToggle />
			</div>
			<div className='flex items-center gap-x-2'>
				<Button
					onClick={() => {
						signup({
							email: 'test@test.com',
							password: 'testlongpassword',
							firstName: 'Test',
							lastName: 'Test',
							role: 'user',
						});
					}}
				>
					Signup
				</Button>
				<Button
					onClick={() => {
						signin({
							email: 'test@test.com',
							password: 'testlongpassword',
						});
					}}
				>
					Login
				</Button>
				<Button
					onClick={() => {
						signout();
					}}
				>
					Logout
				</Button>
			</div>
			<div className='flex items-center gap-x-2'>
				{session ? 'Authenticated' : 'Not Authenticated'}
			</div>
		</div>
	);
};

export default HelloWord;
