import { authKeys } from '@/lib/api/queryKeys';
import { signin, signout, signup } from '@/lib/api/requests/auth';
import { BetterAuthError, SigninRequest, SignupRequest } from '@/lib/api/types';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useSignin = (
	options?: Partial<
		UseMutationOptions<
			Awaited<ReturnType<typeof signin>>,
			BetterAuthError,
			SigninRequest
		>
	>,
) => {
	return useMutation({
		mutationKey: [authKeys.patch],
		mutationFn: signin,
		...options,
	});
};

export const useSignup = (
	options?: Partial<
		UseMutationOptions<
			Awaited<ReturnType<typeof signup>>,
			BetterAuthError,
			SignupRequest
		>
	>,
) => {
	return useMutation({
		mutationKey: [authKeys.create],
		mutationFn: signup,
		...options,
	});
};

export const useSignout = (
	options?: Partial<
		UseMutationOptions<Awaited<ReturnType<typeof signout>>, BetterAuthError>
	>,
) => {
	return useMutation({
		mutationKey: [authKeys.delete],
		mutationFn: signout,
		...options,
	});
};
