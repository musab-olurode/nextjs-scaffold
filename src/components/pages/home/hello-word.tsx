'use client';

import { useTheme } from 'next-themes';
import { useGetHello } from '~/lib/api/queries/hello';
import { Skeleton } from '~/components/ui/skeleton';
import { Moon, Sun } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

const DarkModeToggle = () => {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const HelloWord = () => {
	const { data, isPending, isError, error } = useGetHello();

	if (isPending)
		return (
			<div className='flex items-center gap-x-2'>
				<Skeleton className='w-[5.76rem] h-6' />
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
		<div className='flex items-center gap-x-2'>
			{data} <DarkModeToggle />
		</div>
	);
};

export default HelloWord;
