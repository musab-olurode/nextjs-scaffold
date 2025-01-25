import React, { SVGAttributes } from 'react';

export type SideNavLink = {
	icon: (props: SVGAttributes<SVGSVGElement>) => React.JSX.Element;
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
