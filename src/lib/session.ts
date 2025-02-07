import { decodeJwt } from 'jose';

export const decrypt = (accessToken = '') => {
	try {
		const decoded = decodeJwt(accessToken);

		return decoded;
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			// eslint-disable-next-line no-console
			console.error('Failed to decode JWT:', error);
		}
		throw new Error('Invalid token');
	}
};
