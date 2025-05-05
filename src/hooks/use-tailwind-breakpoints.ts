'use client';

import { useEffect, useState } from 'react';

import { TailwindBreakpoints } from '@/lib/types';

const useTailwindBreakpoints = (): TailwindBreakpoints => {
	const [breakpoints, setBreakpoints] = useState<TailwindBreakpoints>({
		sm: false,
		md: false,
		lg: false,
		xl: false,
		'2xl': false,
		width: 0,
	});

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;

			setBreakpoints({
				sm: width >= 640,
				md: width >= 768,
				lg: width >= 1024,
				xl: width >= 1280,
				'2xl': width >= 1536,
				width,
			});
		};

		// Initial call to set the breakpoints
		handleResize();

		// Add event listener for window resize
		window.addEventListener('resize', handleResize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return breakpoints;
};

export default useTailwindBreakpoints;
