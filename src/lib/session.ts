import jwt from 'jsonwebtoken';

export const decrypt = (cookie = '') => {
	try {
		const decoded = jwt.decode(cookie);

		return decoded;
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			// eslint-disable-next-line no-console
			console.error('Failed to decode JWT:', error);
		}
		throw new Error('Invalid token');
	}
};
