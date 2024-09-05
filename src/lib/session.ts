import jwt from 'jsonwebtoken';

export const decrypt = async (cookie = '') => {
	try {
		const decoded = jwt.decode(cookie);
		return decoded;
	} catch (error) {
		console.error('Failed to decode JWT:', error);
		throw new Error('Invalid token');
	}
};
