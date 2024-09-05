import { axiosInstance } from '~/lib/api';
import { SigninRequest } from '~/lib/api/types';

export const signin = async (payload: SigninRequest) => {
	const { data } = await axiosInstance.post('/auth/signin', payload);
	return data;
};

export const getAuthUser = async () => {
	const { data } = await axiosInstance.get('/auth/me');
	return data;
};

export const signout = async () => {
	const { data } = await axiosInstance.post('/auth/signout');
	return data;
};
