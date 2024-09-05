import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authKeys } from '~/lib/api/queryKeys';
import { signin, signout } from '~/lib/api/requests/auth';
import { AuthData, SuccessResponse, SigninRequest } from '~/lib/api/types';

export const useSignin = (
	options?: Partial<
		UseMutationOptions<
			SuccessResponse<AuthData>,
			AxiosError,
			SigninRequest,
			unknown
		>
	>,
) => {
	return useMutation({
		mutationKey: [authKeys.patch],
		mutationFn: signin,
		...options,
	});
};

export const useSignout = (
	options?: Partial<
		UseMutationOptions<SuccessResponse<undefined>, AxiosError, void, unknown>
	>,
) => {
	return useMutation({
		mutationKey: [authKeys.delete],
		mutationFn: signout,
		...options,
	});
};
