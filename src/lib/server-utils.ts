import { axiosInstance } from '@/lib/api';

import { AxiosHeaders } from 'axios';
import { headers } from 'next/headers';

export const getServerSession = async () => {
	const { data } = await axiosInstance.get('/auth/get-session', {
		headers: (await headers()) as unknown as AxiosHeaders,
	});

	return data;
};
