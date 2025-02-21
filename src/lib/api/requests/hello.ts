import { axiosInstance } from '@/lib/api';

export const getHello = async () => {
	const { data } = await axiosInstance.get('/');

	return data;
};
