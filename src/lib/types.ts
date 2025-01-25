import { SVGAttributes } from 'react';

export type SideNavLink = {
	icon: (props: SVGAttributes<SVGSVGElement>) => JSX.Element;
	title: string;
	href: string;
};

export type Breakpoints = {
	sm: boolean;
	md: boolean;
	lg: boolean;
	xl: boolean;
	'2xl': boolean;
};
