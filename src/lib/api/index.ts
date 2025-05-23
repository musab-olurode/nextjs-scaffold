import axios from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL ?? ''}/v1`;

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true,
});

export { axiosInstance };
