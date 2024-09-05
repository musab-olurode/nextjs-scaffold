const authNamespace = 'auth';
export const authKeys = {
	create: `${authNamespace}/create`,
	read: `${authNamespace}/read`,
	patch: `${authNamespace}/patch`,
	delete: `${authNamespace}/delete`,
	state: `${authNamespace}/state`,
};

const helloNamespace = 'hello';
export const helloKeys = {
	create: `${helloNamespace}/create`,
	read: `${helloNamespace}/read`,
	patch: `${helloNamespace}/patch`,
	delete: `${helloNamespace}/delete`,
	state: `${helloNamespace}/state`,
};

const loadingNamespace = 'loading';
export const loadingKeys = {
	state: `${loadingNamespace}/state`,
};
