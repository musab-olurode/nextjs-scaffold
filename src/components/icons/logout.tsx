import { SVGAttributes } from 'react';

const LogoutIcon = (props: SVGAttributes<SVGSVGElement>) => {
	return (
		<svg
			fill='none'
			focusable={false}
			height='17'
			viewBox='0 0 16 17'
			width='16'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M9.33333 5.83366V4.50033C9.33333 4.1467 9.19286 3.80756 8.94281 3.55752C8.69276 3.30747 8.35362 3.16699 8 3.16699H3.33333C2.97971 3.16699 2.64057 3.30747 2.39052 3.55752C2.14048 3.80756 2 4.1467 2 4.50033V12.5003C2 12.8539 2.14048 13.1931 2.39052 13.4431C2.64057 13.6932 2.97971 13.8337 3.33333 13.8337H8C8.35362 13.8337 8.69276 13.6932 8.94281 13.4431C9.19286 13.1931 9.33333 12.8539 9.33333 12.5003V11.167'
				stroke='white'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeOpacity='0.5'
			/>
			<path
				d='M6 8.5H14M14 8.5L12 6.5M14 8.5L12 10.5'
				stroke='white'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeOpacity='0.5'
			/>
		</svg>
	);
};

export default LogoutIcon;
