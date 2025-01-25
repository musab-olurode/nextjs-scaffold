'use client';

import { useGetHello } from '~/lib/api/queries/hello';

import { Button } from '~/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Skeleton } from '~/components/ui/skeleton';

import { Moon, Sun } from 'lucide-react';
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
		<div className='flex items-center gap-x-2'>
			{data} <DarkModeToggle />
		</div>
	);
};

export default HelloWord;
