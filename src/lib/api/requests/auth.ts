import { SigninRequest, SignupRequest } from '@/lib/api/types';
import { authClient } from '@/lib/auth';

export const signin = async (payload: SigninRequest) => {
	const data = await authClient.signIn.email(payload);

	return data;
};

export const signup = async (payload: SignupRequest) => {
	const data = await authClient.signUp.email({
		...payload,
		name: payload.firstName,
	});

	return data;
};

export const getSession = async () => {
	const data = await authClient.getSession();

	return data;
};

export const signout = async () => {
	const data = await authClient.signOut();

	return data;
};
