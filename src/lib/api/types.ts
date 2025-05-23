import { User } from '@/lib/types/user';

import { AxiosRequestConfig } from 'axios';

export type ModifiedAxiosRequestConfig = AxiosRequestConfig & {
	_retry: boolean;
};

export type SigninRequest = {
	email: string;
	password: string;
	callbackURL?: string;
};

export type SignupRequest = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: string;
	callbackURL?: string;
};

export enum AppPermissions {
	CREATE_USERS = 'create:users',
	READ_USERS = 'read:users',
	UPDATE_USERS = 'update:users',
}

export type AuthData = {
	user: User;
	accessToken: string;
	refreshToken: string;
};

export type SuccessResponse<T> = {
	statusCode: number;
	message: string;
	data: T;
};

export type FailureResponse = {
	statusCode: number;
	message: string;
	error: string;
};

export interface BetterAuthError extends Error {
	status: number;
	statusText: string;
	error: FailureResponse;
}
