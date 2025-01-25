import { ModifiedAxiosRequestConfig } from '~/lib/api/types';

import axios from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/v1`;

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true,
});

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		const statusCode = error.response?.status;

		// eslint-disable-next-line no-underscore-dangle
		if (
			statusCode === 401 &&
			!(originalRequest as ModifiedAxiosRequestConfig)._retry
		) {
			// eslint-disable-next-line no-underscore-dangle
			(originalRequest as ModifiedAxiosRequestConfig)._retry = true;

			try {
				await axios.post(`${baseURL}/auth/refresh`, null, {
					withCredentials: true,
				});

				return axiosInstance.request(originalRequest);
			} catch {
				await axios.post(`${baseURL}/auth/signout`, null, {
					withCredentials: true,
				});
			}
		}

		return Promise.reject(error);
	},
);

export { axiosInstance };
