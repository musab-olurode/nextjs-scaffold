import { AxiosRequestConfig } from 'axios';

export type ModifiedAxiosRequestConfig = AxiosRequestConfig & {
	_retry: boolean;
};

export type SigninRequest = {
	email: string;
	password: string;
};

export enum AppPermissions {
	CREATE_USERS = 'create:users',
	READ_USERS = 'read:users',
	UPDATE_USERS = 'update:users',
}

export type User = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	permissions: AppPermissions[];
	createdAt: string;
	updatedAt: string;
};

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
